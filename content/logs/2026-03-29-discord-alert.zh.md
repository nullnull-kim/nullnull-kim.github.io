---
title: "[Claude] 同时跑5个项目会发生什么 — Discord通知系统搭建记"
date: 2026-03-29
categories: [logs]
tags: [claude, vibe-coding, ai-workflow, discord, webhook, claude-code-hooks, monitoring, automation, heartbeat, multi-project, notification, devops, productivity]
slug: discord-alert
---

项目变成5个了。shop、blog、code_dungeon、good_game，还有管理全部的root。（项目名不是root）每个项目都跑着Claude session，问题是我只有一个人。

在shop跑任务，切到blog改草稿，不知道shop什么时候结束。在code_dungeon启动Phase 1，去看good_game那边，code_dungeon可能等权限确认卡住了也不知道。盯着5个终端轮流看不是监控。只是眼睛疼。

需要告警。

## 为什么选Discord Webhook

Slack也有，Telegram也有，但选了Discord。原因很简单：频道可以免费无限创建。每个项目分一个频道，告警就不会混在一起。root-alerts、shop-alerts、blog-alerts、code_dungeon-alerts、good_game-alerts。5个频道各建一个Webhook URL。

Webhook URL存在各项目的`.claude/.discord-webhook`文件里。硬编码在脚本里的话每加一个项目就要改脚本，分离到文件里只需要创建webhook文件就行。

## 第一个hook：任务完成时告警

把Discord通知脚本接到[Stop hook](https://docs.anthropic.com/en/docs/claude-code/hooks)上。session结束时把项目名和时间发到Discord。

```bash
# 立即将stdin存入变量（防止与其他async hook的stdin竞争）
INPUT=$(cat)
```

Stop hook是异步执行的。所以和其他hook同时运行时，stdin传给谁没有保证。`INPUT=$(cat)`放在脚本最前面立即捕获stdin。

## 终止原因全是"unknown"

告警倒是来了，但全是"未知"。**[shop] 未知 — 03-28 18:01**。知道结束了，但不知道为什么结束。正常完成？token超额？拒绝？

查了Stop hook的payload。没有`stop_reason`字段。Claude Code传给hook的JSON不包含session终止原因。

找到了变通方法。payload里有`transcript_path`。是记录session全部对话的JSONL文件路径。结构是这样的：

```jsonl
{"type":"user","message":{"role":"user","content":"改一下项目路径"},...}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"..."}],"stop_reason":"end_turn",...},...}
```

一行一个事件，assistant消息里有`stop_reason`字段。改成逆序遍历这个文件提取最后一个`stop_reason`。

```javascript
const lines = fs.readFileSync(tp, 'utf8').split('\n').filter(l => l.trim());
for (let i = lines.length - 1; i >= 0; i--) {
  const e = JSON.parse(lines[i]);
  if (e.stop_reason) { /* 找到了 */ }
}
```

终止原因有7种。各自映射了中文标签。

| stop_reason | 告警显示 |
|-------------|---------|
| end_turn | 完成 |
| max_tokens | token超额 |
| model_context_window_exceeded | 上下文超额 |
| stop_sequence | 停止序列 |
| pause_turn | 暂停 |
| refusal | 拒绝 |
| tool_use | 工具调用 |

现在收到的是**[shop] 完成 — 03-28 18:01**、**[blog] token超额 — 03-28 15:32**这样的告警。

## 子agent告警过滤

收到完成告警去看终端，还在跑。加了debug查原因，是子agent并行任务完成导致的。

举个例子。下面是我给shop项目搭的任务处理架构：

```
客户请求
  → task-orchestrator（主）
      ├─ frontend-developer   → 界面实现
      ├─ backend-developer    → API实现
      ├─ code-reviewer        → 代码审查 + 性能验证
      ├─ security-auditor     → 安全验证（条件触发）
      └─ quality-gatekeeper   → 最终验证
```

并行运行的子agent每次结束都会触发Stop hook。即使主session没有结束。一个task挂5个子agent就来6条告警。frontend-developer完成、backend-developer完成、code-reviewer完成……主session还在跑呢。

payload里有`agent_id`字段的就是子agent。子agent时跳过告警和心跳删除的过滤器加上了。

```bash
IS_SUBAGENT=$(echo "$INPUT" | node -e "..." 2>/dev/null)
[ "$IS_SUBAGENT" = "yes" ] && exit 0
```

## 光"完成"告警不够

Claude请求权限确认、问文件写入权限、等待用户输入时，Stop hook不会触发。"这次任务应该要跑一阵"——等着等着去看，已经等了几十分钟的回复了。

## 第二个hook：任务等待中告警

思路很简单。Claude每执行一次工具就记一个时间戳。2分钟没更新时间戳就判断"这个项目卡住了"。

PostToolUse hook接上心跳脚本。Claude每执行一次工具就往`.claude/.heartbeat`文件写入当前时间。

```bash
date +%s > "$PROJECT_ROOT/.claude/.heartbeat"
```

就这些。一行的hook。

另外一个监控脚本（watcher.sh）每60秒巡查5个项目的心跳文件。距上次更新超过2分钟就发Discord"等待中"告警。同一项目10分钟内不重复告警。不然告警会刷屏。

```bash
STALE_THRESHOLD=120    # 2分钟
COOLDOWN=600           # 10分钟防重复告警
CHECK_INTERVAL=60      # 每60秒检查
```

session结束时Stop hook删除心跳文件。防止已结束的项目出现"等待中"告警。

这样就只收到主session结束告警了。

## 当前配置

总结一下，2个hook加1个监控脚本。

| 组件 | 触发器 | 作用 |
|------|--------|------|
| heartbeat.sh | PostToolUse | 每次工具执行更新时间戳 |
| notify-discord.sh | Stop | session结束时Discord通知 + 删除心跳 |
| watcher.ps1 | 60秒周期（常驻） | 心跳2分钟未更新时"等待中"通知 |
| .discord-webhook | - | 各项目Webhook URL存储 |

新增项目只需两步。`.claude/.discord-webhook`文件放入Webhook URL，watcher.ps1的PROJECTS数组加上路径。

5个项目同时在跑。Discord告警在记录。

![Discord告警截图](/img/blog/2026-03-29-discord-alert-01.png)

## 做完之后看到的文章

有一篇叫[Claude Code 50个实战技巧](https://news.hada.io/topic?id=27677)的文章里有这么一条：

> 48\. Claude完成时播放声音 — 用Stop Hook播放系统音效。启动任务后切换到其他工作，完成时用提示音通知。

如果只在本地工作，这样似乎就够了。
