# GitHub 업로드 가이드

이 프로젝트를 GitHub에 업로드하는 방법을 단계별로 안내합니다.

## 📦 다운로드한 파일 준비

백업 파일을 다운로드하셨다면:

```bash
# 다운로드한 tar.gz 파일 압축 해제
tar -xzf webapp_github_complete_with_readme.tar.gz

# 프로젝트 디렉토리로 이동
cd home/user/webapp
```

## 🔧 방법 1: GitHub Desktop 사용 (가장 쉬움)

### 1단계: GitHub Desktop 설치
- [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
- GitHub 계정으로 로그인

### 2단계: 저장소 생성
1. GitHub Desktop에서 `File` → `New Repository` 클릭
2. 또는 기존 폴더 추가: `File` → `Add Local Repository`
3. 프로젝트 폴더 선택: `webapp` 폴더 선택
4. `Publish repository` 클릭
   - Repository name: `bdsr-crm` (또는 원하는 이름)
   - Description: `피트니스 센터 운영 관리 시스템`
   - ✅ Keep this code private (비공개 원하는 경우 체크)
5. `Publish Repository` 버튼 클릭

### 3단계: 완료!
- GitHub Desktop이 자동으로 모든 파일을 업로드합니다
- GitHub.com에서 저장소 확인

---

## 💻 방법 2: 명령줄 사용 (터미널/CMD)

### 전제 조건
- Git이 설치되어 있어야 합니다
- GitHub 계정이 있어야 합니다

### 1단계: GitHub에서 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 오른쪽 상단 `+` → `New repository` 클릭
3. 저장소 정보 입력:
   - **Repository name**: `bdsr-crm` (또는 원하는 이름)
   - **Description**: `피트니스 센터 운영 관리 시스템`
   - **Public** 또는 **Private** 선택
   - ⚠️ **"Initialize this repository with a README" 체크 해제**
4. `Create repository` 클릭

### 2단계: 로컬 프로젝트와 연결

압축 해제한 프로젝트 폴더에서:

```bash
# 프로젝트 디렉토리로 이동
cd home/user/webapp

# Git 원격 저장소 추가 (YOUR_USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/bdsr-crm.git

# 브랜치 이름 확인 (main이어야 함)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3단계: 인증

터미널에서 인증을 요청하면:

**옵션 A: Personal Access Token (권장)**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. `Generate new token (classic)` 클릭
3. Note: `webapp upload`
4. Expiration: 원하는 기간 선택
5. 권한 선택: `repo` (전체 체크)
6. `Generate token` 클릭
7. **토큰을 복사하여 안전한 곳에 보관** (다시 볼 수 없음)
8. Git 명령 실행 시 비밀번호 대신 토큰 입력

**옵션 B: GitHub CLI**
```bash
# GitHub CLI 설치 (아직 없는 경우)
# macOS: brew install gh
# Windows: winget install GitHub.cli

# 로그인
gh auth login

# 푸시
git push -u origin main
```

---

## 🌐 방법 3: GitHub 웹에서 업로드 (작은 프로젝트용)

⚠️ **주의**: 이 방법은 파일 수가 적을 때만 권장됩니다.

### 1단계: GitHub에서 새 저장소 생성
- 위의 "방법 2 - 1단계"와 동일

### 2단계: 파일 업로드
1. 생성된 저장소 페이지에서 `uploading an existing file` 클릭
2. 프로젝트의 모든 파일과 폴더를 드래그 앤 드롭
3. Commit message: `Initial commit`
4. `Commit changes` 클릭

---

## ✅ 업로드 확인

업로드가 완료되면 GitHub 저장소에서 다음을 확인하세요:

- ✅ `src/` 폴더와 모든 TypeScript 파일
- ✅ `public/static/` 폴더 (app.js, style.css)
- ✅ `package.json`, `tsconfig.json`, `vite.config.ts`
- ✅ `wrangler.jsonc` (Cloudflare 설정)
- ✅ `README.md` (프로젝트 문서)
- ✅ `.gitignore` (node_modules, dist 등 제외)

---

## 🚀 다음 단계: Cloudflare Pages 배포

GitHub 업로드가 완료되면 Cloudflare Pages에 배포할 수 있습니다:

### 자동 배포 (권장)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. `Workers & Pages` → `Create application` → `Pages` → `Connect to Git`
3. GitHub 계정 연결 및 저장소 선택
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. `Save and Deploy` 클릭

### 수동 배포

```bash
# Wrangler 설치
npm install -g wrangler

# Cloudflare 로그인
wrangler login

# 프로젝트 빌드
npm install
npm run build

# Cloudflare Pages 배포
npx wrangler pages deploy dist --project-name bdsr-crm
```

---

## 🔄 코드 업데이트 방법

나중에 코드를 수정하고 GitHub에 업로드하려면:

```bash
# 변경 사항 확인
git status

# 모든 변경 사항 추가
git add .

# 커밋 메시지와 함께 저장
git commit -m "설명: 변경 내용"

# GitHub에 푸시
git push origin main
```

---

## 🆘 문제 해결

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/bdsr-crm.git
```

### "Permission denied (publickey)"
- Personal Access Token 사용 (위 설명 참조)
- 또는 SSH 키 설정: [GitHub SSH 가이드](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### 대용량 파일 경고
- `node_modules/`, `dist/` 폴더는 `.gitignore`에 포함되어 있어 자동으로 제외됩니다
- 만약 업로드되었다면:
  ```bash
  git rm -r --cached node_modules
  git rm -r --cached dist
  git commit -m "Remove unnecessary files"
  git push origin main
  ```

---

## 📞 도움이 필요하신가요?

- GitHub 문서: https://docs.github.com
- Git 튜토리얼: https://git-scm.com/book/ko/v2
- Cloudflare Pages 문서: https://developers.cloudflare.com/pages

---

**축하합니다! 🎉 프로젝트가 성공적으로 GitHub에 업로드되었습니다!**
