---
title: "Hugo paginate 에러 해결 — Cloudflare Pages 배포 실패 트러블슈팅"
date: 2026-03-26
categories: [logs]
---

Cloudflare 배포 중에 빌드가 터졌다.

Hugo 버전이 올라가면서 `paginate` 키가 사라진 건데, 로컬에서는 구버전으로 잘 돌아가고 있으니 모르고 있었다. Cloudflare 빌드 환경은 v0.147.7이었고 거기서 에러가 터졌다.

`hugo.toml`에서 `paginate`를 `pagination.pagerSize`로 바꾸고 해결됐다.

Hugo는 버전 간 breaking change가 종종 있으니 로컬이랑 배포 환경 버전을 맞춰두는 게 맞는 것 같다.
