---
title: "Claude Code Discord 알림 연동 — 멀티 프로젝트 모니터링 구축기"
date: 2026-03-29
categories: [logs]
tags: [claude, vibe-coding, ai-workflow, discord, webhook, claude-code-hooks, monitoring, automation, heartbeat, multi-project, notification, devops, productivity]
slug: discord-alert
---

프로젝트가 5개가 됐다. shop, blog, code_dungeon, good_game, 그리고 전체를 관리하는 root.(프로젝트명이 root는 아니다) 각 프로젝트마다 Claude 세션이 돌아가는데 문제는 내가 하나밖에 없다는 거다.

shop에서 task를 돌려놓고 blog에서 초안을 수정하고 있으면, shop이 언제 끝났는지 모른다. code_dungeon에서 Phase 1을 시작해놓고 good_game 쪽을 보고 있으면, code_dungeon이 권한 확인을 기다리며 멈춰 있어도 모른다. 터미널 5개를 번갈아 쳐다보는 건 모니터링이 아니다. 그냥 눈이 아픈 거다.

알림이 필요하다.

## Discord 웹훅을 선택한 이유

Slack도 있고 텔레그램도 있지만 Discord를 골랐다. 이유는 단순하다. 채널을 무료로 무한히 만들 수 있다. 프로젝트마다 채널을 분리하면 알림이 섞이지 않는다. root-alerts, shop-alerts, blog-alerts, code_dungeon-alerts, good_game-alerts. 5개 채널에 각각 웹훅 URL을 하나씩 만들었다.

웹훅 URL은 각 프로젝트의 `.claude/.discord-webhook` 파일에 저장했다. 스크립트에 하드코딩하면 프로젝트가 추가될 때마다 스크립트를 고쳐야 하지만, 파일로 분리하면 웹훅 파일만 만들면 된다.

## 첫 번째 hook: 작업 끝나면 알림

[Stop hook](https://docs.anthropic.com/en/docs/claude-code/hooks)에 Discord 알림 스크립트를 연결했다. 세션이 끝나면 프로젝트 이름과 시각을 Discord로 보낸다.

```bash
# stdin을 즉시 변수에 저장 (다른 async 훅과의 stdin 경쟁 방지)
INPUT=$(cat)
```

Stop hook은 async로 실행된다. 그렇기에 다른 hook과 동시에 돌면 stdin이 어느 쪽에 전달될지 보장되지 않는다. `INPUT=$(cat)`을 스크립트 최상단에 놓아서 stdin을 즉시 캡처해야 한다.

## 종료 사유가 전부 "unknown"이었다

알림이 오긴 오는데, 전부 "알수없음"이었다. **[shop] 알수없음 — 03-28 18:01**. 끝난 건 알겠는데, 왜 끝났는지를 모른다. 정상 완료인지, 토큰 초과인지, 거부인지.

Stop hook의 payload를 까봤다. `stop_reason` 필드가 없었다. Claude Code가 hook에 넘기는 JSON에는 세션 종료 사유가 포함되지 않는다.

우회했다. payload에 `transcript_path`가 있었다. 세션의 전체 대화가 기록된 JSONL 파일의 경로다. 이런 구조다:

```jsonl
{"type":"user","message":{"role":"user","content":"프로젝트 경로 변경해줘"},...}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"..."}],"stop_reason":"end_turn",...},...}
```

한 줄이 하나의 이벤트고, assistant 메시지에 `stop_reason` 필드가 들어 있다. 이 파일을 역순으로 탐색해서 마지막 `stop_reason`을 찾아 추출하는 방식으로 바꿨다.

```javascript
const lines = fs.readFileSync(tp, 'utf8').split('\n').filter(l => l.trim());
for (let i = lines.length - 1; i >= 0; i--) {
  const e = JSON.parse(lines[i]);
  if (e.stop_reason) { /* 찾았다 */ }
}
```

종료 사유는 7가지다. 각각 한글로 매핑했다.

| stop_reason | 알림 표시 |
|-------------|----------|
| end_turn | 완료 |
| max_tokens | 토큰초과 |
| model_context_window_exceeded | 컨텍스트초과 |
| stop_sequence | 중단시퀀스 |
| pause_turn | 일시정지 |
| refusal | 거부 |
| tool_use | 도구호출 |

이제 **[shop] 완료 — 03-28 18:01**, **[blog] 토큰초과 — 03-28 15:32** 같은 알림이 온다.

## 서브에이전트 알림 필터링

완료 응답이 와서 터미널을 확인하니 아직 수행중이었다. 디버그를 추가하고 원인을 검토하니, 서브에이전트의 병렬작업 완료가 원인이었다.

예를 들어보겠다. 아래는 내가 구성한 shop 프로젝트의 업무 처리 구성도다.

```
고객 요청
  → task-orchestrator (메인)
      ├─ frontend-developer   → 화면 구현
      ├─ backend-developer    → API 구현
      ├─ code-reviewer        → 코드 리뷰 + 성능 검증
      ├─ security-auditor     → 보안 검증 (조건부)
      └─ quality-gatekeeper   → 최종 검증
```

병렬로 수행되는 서브에이전트들이 종료될 때마다 Stop hook이 실행된다. 메인 세션이 종료되지 않더라도. task 하나에 서브에이전트가 5개 붙으면 알림이 6개 온다. frontend-developer 완료, backend-developer 완료, code-reviewer 완료… 정작 메인 세션은 아직 돌아가고 있는데.

payload에서 `agent_id` 필드가 있으면 서브에이전트다. 서브에이전트일 때는 알림도, 하트비트 삭제도 건너뛰도록 필터를 추가했다.

```bash
IS_SUBAGENT=$(echo "$INPUT" | node -e "..." 2>/dev/null)
[ "$IS_SUBAGENT" = "yes" ] && exit 0
```


## "완료" 알림만으로는 부족하다

Claude가 권한 확인을 요청하거나, 파일 쓰기 권한을 묻거나, 내 입력을 기다리면 Stop hook이 실행되지 않는다. "이번 작업은 오래 걸리는군" 하고 기다리다 확인해보니 응답을 몇십분째 대기중이었다.

## 두 번째 훅: 작업 대기중 알림

발상은 단순하다. Claude가 도구를 실행할 때마다 타임스탬프를 찍는다. 2분 동안 타임스탬프가 갱신되지 않으면 "이 프로젝트가 멈춰 있다"고 판단한다.

PostToolUse hook에 하트비트 스크립트를 연결했다. Claude가 도구를 한 번 실행할 때마다 `.claude/.heartbeat` 파일에 현재 시각을 기록한다.

```bash
date +%s > "$PROJECT_ROOT/.claude/.heartbeat"
```

이게 전부다. 한 줄짜리 hook이다.

그리고 별도의 감시 스크립트(watcher.sh)가 60초마다 5개 프로젝트의 하트비트 파일을 순회한다. 마지막 갱신으로부터 2분이 지났으면 Discord에 "대기 중" 알림을 보낸다. 같은 프로젝트에 대해 10분 내 재알림은 보내지 않는다. 안 그러면 알림이 도배된다.

```bash
STALE_THRESHOLD=120    # 2분
COOLDOWN=600           # 10분 재알림 방지
CHECK_INTERVAL=60      # 60초마다 확인
```

세션이 끝나면 Stop hook이 하트비트 파일을 삭제한다. 종료된 프로젝트에 대해 "대기 중" 알림이 뜨는 걸 방지하기 위해서다.

이걸로 메인 세션 종료 알림만 온다.

## 현재 구성

정리하면 hook 2개와 감시 스크립트 1개로 구성되어 있다.

| 구성 요소 | 트리거 | 역할 |
|-----------|--------|------|
| heartbeat.sh | PostToolUse | 도구 실행마다 타임스탬프 갱신 |
| notify-discord.sh | Stop | 세션 종료 시 Discord 알림 + 하트비트 삭제 |
| watcher.ps1 | 60초 주기 (상시 실행) | 하트비트 2분 미갱신 시 "대기 중" 알림 |
| .discord-webhook | - | 프로젝트별 웹훅 URL 저장 |

프로젝트를 추가할 때는 두 가지만 하면 된다. `.claude/.discord-webhook` 파일에 웹훅 URL을 넣고, watcher.ps1의 PROJECTS 배열에 경로를 추가한다.

5개 프로젝트가 동시에 돌아가고 있다. Discord 알림이 찍히고 있다.

![Discord 알림 스크린샷](/img/blog/2026-03-29-discord-alert-01.png)

## 다 만들고 나서 본 글

[Claude Code 50가지 실전 팁](https://news.hada.io/topic?id=27677)이라는 글에 이런 항목이 있었다.

> 48\. Claude 완료 시 사운드 재생 — Stop Hook으로 시스템 사운드를 재생. 태스크를 시작하고 다른 작업으로 전환한 뒤, 완료 시 핑 소리로 알림.

로컬에서만 작업한다면 이걸로 충분해보인다.

**관련 글**
- [[Claude] (토큰 아끼려고 한 짓들) EP.1 — 세 시간 만에 사용량을 초과한 이야기](/logs/2026-03-27-token-ep1/)
- [[Claude] (토큰 아끼려고 한 짓들) EP.2 — my precious를 지켜야 한다](/logs/2026-03-28-token-ep2/)