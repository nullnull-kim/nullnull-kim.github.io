# 블로그 프로젝트 규칙

## 프로젝트 개요

- Hugo 기반 개인 블로그 (PaperMod 테마)
- 배포: Cloudflare Pages (`nullnull-kim.pages.dev`)
- 소스: GitHub (`nullnull-kim/nullnull-kim.github.io`)

## 디렉토리 구조

```
nullnull-kim.github.io/
├── hugo.toml              # Hugo 설정
├── content/
│   ├── daily/             # 일상 포스트 (Jekyll daily/_posts 이전)
│   ├── study/             # LeetCode 풀이 (Jekyll study/_posts 이전)
│   ├── about.md           # 소개 페이지
│   └── archives.md        # 전체 포스트 목록
├── themes/PaperMod/       # PaperMod 테마 (git submodule)
├── static/img/            # 이미지 파일
├── assets/css/extended/   # 커스텀 CSS
│   └── custom.scss
├── layouts/partials/      # 커스텀 partial
│   ├── extend_head.html
│   └── extend_footer.html
├── public/                # 빌드 결과물 (git 제외)
└── migrate.js             # Jekyll→Hugo 변환 스크립트 (보관용)
```

## 포스트 작성 규칙

### 파일 위치
- 일상 포스트: `content/daily/YYYY-MM-DD-제목.md`
- 학습 포스트: `content/study/YYYY-MM-DD-제목.md`

### Front Matter

```yaml
---
title: "제목"
date: YYYY-MM-DD
categories: [daily]   # 또는 [study]
---
```

### 퍼머링크 형식
- `/daily/YYYY-MM-DD-slug/`
- `/study/YYYY-MM-DD-slug/`

## 빌드 및 배포

```bash
# 로컬 미리보기
hugo server -D

# 프로덕션 빌드
hugo --minify

# 배포 (git push → Cloudflare Pages 자동 빌드)
git push origin main
```

## Hugo PATH (Windows)

bash 터미널에서 hugo 명령 안 될 때:
```bash
export PATH="$PATH:/c/Users/kimty/AppData/Local/Microsoft/WinGet/Packages/Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe"
```

## 테마

- PaperMod (git submodule: `themes/PaperMod`)
- 테마 업데이트: `git submodule update --remote themes/PaperMod`
- 커스텀 스타일: `assets/css/extended/custom.scss`

## Jekyll 원본 파일

마이그레이션 완료 후 아래 파일/폴더는 삭제 가능:
- `_config.yml`, `Gemfile`, `Gemfile.lock`
- `_sass/`, `_includes/`, `_data/`, `_featured_categories/`
- `daily/_posts/`, `study/_posts/`
- `docs/`, `licenses/`
