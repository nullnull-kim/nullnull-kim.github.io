#!/usr/bin/env node
/**
 * Jekyll → Hugo 포스트 변환 스크립트
 * - daily/_posts/  → content/daily/
 * - study/_posts/  → content/study/
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// 파일명에서 날짜와 slug 추출: YYYY-MM-DD-slug-text.md
function parseFilename(filename) {
  const name = path.basename(filename, '.md');
  const match = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (!match) return null;
  const [, date, rawSlug] = match;
  // slug: 특수문자 제거, 소문자, 공백→하이픈
  const slug = rawSlug
    .replace(/[\[\]()]/g, '')
    .replace(/[.#]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return { date, slug };
}

// study 포스트: front matter 없음, H1에서 title 추출
function convertStudyPost(content, filename) {
  const parsed = parseFilename(filename);
  if (!parsed) {
    console.warn(`  SKIP (파일명 파싱 실패): ${filename}`);
    return null;
  }
  const { date, slug } = parsed;

  // H1 제목 추출
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match
    ? h1Match[1].trim().replace(/"/g, '\\"')
    : path.basename(filename, '.md');

  // H1 줄 제거 (titles_from_headings strip_title 동작 재현)
  const body = content.replace(/^#\s+.+\n?/, '');

  const frontMatter = `---
title: "${title}"
date: ${date}
categories: [study]
---
`;
  return frontMatter + body;
}

// daily 포스트: Jekyll front matter → Hugo front matter 변환
function convertDailyPost(content, filename) {
  const parsed = parseFilename(filename);
  if (!parsed) {
    console.warn(`  SKIP (파일명 파싱 실패): ${filename}`);
    return null;
  }
  const { date } = parsed;

  // Jekyll front matter 블록 추출
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) {
    // front matter 없는 daily 포스트 처리
    const title = path.basename(filename, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return `---\ntitle: "${title}"\ndate: ${date}\ncategories: [daily]\n---\n${content}`;
  }

  const [, fm, body] = fmMatch;

  // title 추출
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const title = titleMatch
    ? titleMatch[1].trim().replace(/"/g, '\\"')
    : path.basename(filename, '.md');

  // description 추출 (멀티라인 > 블록)
  let description = '';
  const descMatch = fm.match(/^description:\s*>\n([\s\S]*?)(?=\n\S|$)/m);
  if (descMatch) {
    description = descMatch[1].replace(/^\s+/gm, '').trim().replace(/"/g, '\\"');
  }

  let newFm = `title: "${title}"\ndate: ${date}\ncategories: [daily]`;
  if (description) newFm += `\ndescription: "${description}"`;

  return `---\n${newFm}\n---\n${body}`;
}

function migrateSection(srcDir, destDir, converter) {
  if (!fs.existsSync(srcDir)) {
    console.log(`  소스 없음: ${srcDir}`);
    return;
  }
  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
  let ok = 0, skip = 0;

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const content = fs.readFileSync(srcPath, 'utf8');
    const converted = converter(content, file);

    if (!converted) { skip++; continue; }

    // 출력 파일명: 원본 파일명 유지 (Hugo는 파일명에서 date/slug 인식)
    const destPath = path.join(destDir, file);
    fs.writeFileSync(destPath, converted, 'utf8');
    console.log(`  OK: ${file}`);
    ok++;
  }
  console.log(`  → 완료: ${ok}개 변환, ${skip}개 스킵\n`);
}

// about.md 변환
function migrateAbout() {
  const src = path.join(BASE, 'about.md');
  const destDir = path.join(BASE, 'content');
  const dest = path.join(destDir, 'about.md');
  if (!fs.existsSync(src)) return;

  const content = fs.readFileSync(src, 'utf8');
  // Jekyll front matter 제거 후 Hugo 형식으로
  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const newContent = `---
title: "About"
layout: "about"
url: "/about/"
summary: "about"
---
${body}`;
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(dest, newContent, 'utf8');
  console.log('  OK: about.md');
}

// archives 페이지 생성
function createArchives() {
  const dest = path.join(BASE, 'content', 'archives.md');
  fs.writeFileSync(dest, `---
title: "Archive"
layout: "archives"
url: "/archives/"
summary: "archive"
---
`);
  console.log('  OK: archives.md');
}

console.log('=== Jekyll → Hugo 포스트 변환 시작 ===\n');

console.log('[1/4] study 포스트 변환...');
migrateSection(
  path.join(BASE, 'study', '_posts'),
  path.join(BASE, 'content', 'study'),
  convertStudyPost
);

console.log('[2/4] daily 포스트 변환...');
migrateSection(
  path.join(BASE, 'daily', '_posts'),
  path.join(BASE, 'content', 'daily'),
  convertDailyPost
);

console.log('[3/4] about 페이지 변환...');
migrateAbout();

console.log('[4/4] archives 페이지 생성...');
createArchives();

console.log('\n=== 변환 완료 ===');
console.log(`결과 확인: content/study/, content/daily/`);
