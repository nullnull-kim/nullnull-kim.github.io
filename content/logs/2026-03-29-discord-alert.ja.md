---
title: "Claude Code Discord通知連携 — マルチプロジェクトモニタリング構築記"
date: 2026-03-29
categories: [logs]
tags: [claude, vibe-coding, ai-workflow, discord, webhook, claude-code-hooks, monitoring, automation, heartbeat, multi-project, notification, devops, productivity]
slug: discord-alert
---

プロジェクトが5つになった。shop、blog、code_dungeon、good_game、そして全体を管理するroot。（プロジェクト名がrootではない）各プロジェクトごとにClaudeセッションが走っているが、問題は自分が一人しかいないことだ。

shopでtaskを走らせてblogで草稿を修正していると、shopがいつ終わったか分からない。code_dungeonでPhase 1を始めてgood_game側を見ていると、code_dungeonが権限確認を待って止まっていても分からない。ターミナル5つを交互に見るのはモニタリングではない。ただ目が痛いだけだ。

アラートが必要だ。

## Discord Webhookを選んだ理由

Slackもあるしテレグラムもあるが、Discordを選んだ。理由は単純だ。チャンネルを無料で無限に作れる。プロジェクトごとにチャンネルを分離すればアラートが混ざらない。root-alerts、shop-alerts、blog-alerts、code_dungeon-alerts、good_game-alerts。5つのチャンネルにそれぞれWebhook URLを1つずつ作った。

Webhook URLは各プロジェクトの`.claude/.discord-webhook`ファイルに保存した。スクリプトにハードコーディングするとプロジェクトが追加されるたびにスクリプトを修正しなければならないが、ファイルに分離すればWebhookファイルを作るだけでいい。

## 最初のhook：作業完了時にアラート

[Stop hook](https://docs.anthropic.com/en/docs/claude-code/hooks)にDiscord通知スクリプトを接続した。セッションが終わるとプロジェクト名と時刻をDiscordに送る。

```bash
# stdinを即座に変数に保存（他のasync hookとのstdin競合防止）
INPUT=$(cat)
```

Stop hookはasyncで実行される。そのため他のhookと同時に走るとstdinがどちらに渡されるか保証されない。`INPUT=$(cat)`をスクリプト最上部に置いてstdinを即座にキャプチャしなければならない。

## 終了理由が全部「unknown」だった

アラートは来るが、全部「不明」だった。**[shop] 不明 — 03-28 18:01**。終わったのは分かるが、なぜ終わったかが分からない。正常完了か、トークン超過か、拒否か。

Stop hookのpayloadを調べた。`stop_reason`フィールドがなかった。Claude Codeがhookに渡すJSONにはセッション終了理由が含まれていない。

回避した。payloadに`transcript_path`があった。セッションの全会話が記録されたJSONLファイルのパスだ。こういう構造だ：

```jsonl
{"type":"user","message":{"role":"user","content":"プロジェクトパス変更して"},...}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"..."}],"stop_reason":"end_turn",...},...}
```

1行が1つのイベントで、assistantメッセージに`stop_reason`フィールドが入っている。このファイルを逆順に探索して最後の`stop_reason`を抽出する方式に変えた。

```javascript
const lines = fs.readFileSync(tp, 'utf8').split('\n').filter(l => l.trim());
for (let i = lines.length - 1; i >= 0; i--) {
  const e = JSON.parse(lines[i]);
  if (e.stop_reason) { /* 見つけた */ }
}
```

終了理由は7種類だ。それぞれ日本語にマッピングした。

| stop_reason | アラート表示 |
|-------------|------------|
| end_turn | 完了 |
| max_tokens | トークン超過 |
| model_context_window_exceeded | コンテキスト超過 |
| stop_sequence | 中断シーケンス |
| pause_turn | 一時停止 |
| refusal | 拒否 |
| tool_use | ツール呼び出し |

これで**[shop] 完了 — 03-28 18:01**、**[blog] トークン超過 — 03-28 15:32**のようなアラートが来る。

## サブエージェントアラートのフィルタリング

完了応答が来たのでターミナルを確認したら、まだ実行中だった。デバッグを追加して原因を調べたら、サブエージェントの並列タスク完了が原因だった。

例を挙げよう。以下は私が構成したshopプロジェクトの業務処理構成図だ。

```
顧客リクエスト
  → task-orchestrator（メイン）
      ├─ frontend-developer   → 画面実装
      ├─ backend-developer    → API実装
      ├─ code-reviewer        → コードレビュー + 性能検証
      ├─ security-auditor     → セキュリティ検証（条件付き）
      └─ quality-gatekeeper   → 最終検証
```

並列で実行されるサブエージェントが終了するたびにStop hookが実行される。メインセッションが終了しなくても。taskに5つのサブエージェントが付けばアラートが6つ来る。frontend-developer完了、backend-developer完了、code-reviewer完了… 本来のメインセッションはまだ動いているのに。

payloadで`agent_id`フィールドがあればサブエージェントだ。サブエージェントの時はアラートもハートビート削除もスキップするフィルターを追加した。

```bash
IS_SUBAGENT=$(echo "$INPUT" | node -e "..." 2>/dev/null)
[ "$IS_SUBAGENT" = "yes" ] && exit 0
```

## 「完了」アラートだけでは足りない

Claudeが権限確認を要求したり、ファイル書き込み権限を聞いたり、入力を待っている時はStop hookが実行されない。「今回の作業は時間がかかるな」と待っていて確認したら、何十分も応答待ちだった。

## 2つ目のhook：作業待機中アラート

発想は単純だ。Claudeがツールを実行するたびにタイムスタンプを記録する。2分間タイムスタンプが更新されなければ「このプロジェクトが止まっている」と判断する。

PostToolUse hookにハートビートスクリプトを接続した。Claudeがツールを1回実行するたびに`.claude/.heartbeat`ファイルに現在時刻を記録する。

```bash
date +%s > "$PROJECT_ROOT/.claude/.heartbeat"
```

これだけだ。1行のhookだ。

そして別の監視スクリプト（watcher.sh）が60秒ごとに5つのプロジェクトのハートビートファイルを巡回する。最後の更新から2分が過ぎたらDiscordに「待機中」アラートを送る。同じプロジェクトに対して10分以内の再アラートは送らない。そうしないとアラートが溢れる。

```bash
STALE_THRESHOLD=120    # 2分
COOLDOWN=600           # 10分再アラート防止
CHECK_INTERVAL=60      # 60秒ごとに確認
```

セッションが終わるとStop hookがハートビートファイルを削除する。終了したプロジェクトに対して「待機中」アラートが出るのを防ぐためだ。

これでメインセッション終了アラートだけが来る。

## 現在の構成

まとめるとhook2つと監視スクリプト1つで構成されている。

| 構成要素 | トリガー | 役割 |
|-----------|--------|------|
| heartbeat.sh | PostToolUse | ツール実行ごとにタイムスタンプ更新 |
| notify-discord.sh | Stop | セッション終了時Discord通知 + ハートビート削除 |
| watcher.ps1 | 60秒周期（常時実行） | ハートビート2分未更新時「待機中」通知 |
| .discord-webhook | - | プロジェクト別Webhook URL保存 |

プロジェクトを追加する時は2つだけすればいい。`.claude/.discord-webhook`ファイルにWebhook URLを入れて、watcher.ps1のPROJECTS配列にパスを追加する。

5つのプロジェクトが同時に走っている。Discordアラートが記録されている。

![Discordアラートスクリーンショット](/img/blog/2026-03-29-discord-alert-01.png)

## 全部作ってから見た記事

[Claude Code 50の実践テクニック](https://news.hada.io/topic?id=27677)という記事にこういう項目があった。

> 48\. Claude完了時にサウンド再生 — Stop Hookでシステムサウンドを再生。タスクを始めて他の作業に切り替え、完了時にピング音で通知。

ローカルだけで作業するならこれで十分そうだ。

**関連記事**
- [[Claude]（トークン節約のためにやったこと）EP.1 — 3時間で使用量を超過した話](/logs/2026-03-27-token-ep1/)
- [[Claude]（トークン節約のためにやったこと）EP.2 — my preciousを守らねばならない](/logs/2026-03-28-token-ep2/)
