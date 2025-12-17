# BDSR CRM - 피트니스 센터 운영 관리 시스템

현대적이고 직관적인 UI를 가진 피트니스 센터 종합 관리 시스템입니다. Hono 프레임워크와 Cloudflare Pages를 기반으로 구축되었습니다.

## 🎯 주요 기능

### 출석 관리
- 실시간 회원 출석 현황 확인
- 체크인 시간 자동 기록
- 서비스 아이콘 표시 (💪 PT, 👕 운동복, 🔒 락커)
- 회원별 상태 모니터링 (정상, 주의 필요, 기간 만료)
- 출석 기간 필터 (오늘, 이번 주, 이번 달, 직접 설정)

### 회원 관리
- 상세한 회원 정보 관리
- 15개 이상의 필터링 옵션:
  - **상태**: 유효, 만료, 미입력
  - **성별**: 남, 여
  - **생일**: 월별(1-12월) + 연령대별(10대-80대)
  - **회원권**: 비디스타 6/12개월, 1회 이용권, 미등록
  - **등록 기간**: 3/6/12개월
  - **만료 기간**: 캘린더 날짜 선택
  - **락커**: 유효, 만료, 번호 미지정, 없음
  - **운동복**: 유효, 만료, 없음
  - **재등록 여부**: O, X
  - **담당자**: 제이슨 매니저, 김트레이너, 이코치, 미지정
  - **홀딩**: O, X
  - **잔여 일수**: 범위 입력 (일)
  - **잔여 횟수**: 범위 입력 (회)
  - **미출석 기간**: 범위 입력 (일)
  - **출입정보**: O, X

### 추가 기능
- 매출 관리 및 정산
- 상품 관리
- 일정 관리
- 공지사항 및 커뮤니티
- 구성원 및 급여 정산
- 락커 관리
- 키오스크 연동
- 출입 기록 및 관리
- 대시보드
- 비용 관리

## 🚀 기술 스택

- **프레임워크**: [Hono](https://hono.dev/) - 초경량 웹 프레임워크
- **런타임**: Cloudflare Workers (Edge Computing)
- **배포**: Cloudflare Pages
- **빌드 도구**: Vite
- **언어**: TypeScript
- **스타일링**: CSS3 (커스텀 디자인 시스템)
- **프로세스 관리**: PM2 (개발 환경)

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Wrangler CLI (Cloudflare 배포용)

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/webapp.git
cd webapp

# 의존성 설치
npm install

# 개발 서버 실행 (Vite)
npm run dev

# 또는 Cloudflare Pages 로컬 환경
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### PM2를 사용한 개발 서버 실행

```bash
# 빌드
npm run build

# PM2로 시작
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs webapp --nostream

# 재시작
pm2 restart webapp

# 중지
pm2 stop webapp
```

## 🌐 Cloudflare Pages 배포

### 1. Cloudflare Pages 프로젝트 생성

```bash
# Wrangler 설치
npm install -g wrangler

# Cloudflare 로그인
wrangler login

# 프로젝트 빌드
npm run build

# Cloudflare Pages 프로젝트 생성
npx wrangler pages project create webapp --production-branch main

# 배포
npm run deploy
```

### 2. 자동 배포 (GitHub Actions)

GitHub 저장소와 Cloudflare Pages를 연동하면 `main` 브랜치에 push할 때마다 자동으로 배포됩니다.

1. Cloudflare Dashboard에서 Pages 프로젝트 생성
2. GitHub 저장소 연결
3. 빌드 설정:
   - **빌드 명령어**: `npm run build`
   - **빌드 출력 디렉토리**: `dist`
   - **프레임워크 프리셋**: None

## 📁 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx              # Hono 애플리케이션 진입점
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── AttendancePage.tsx # 출석 페이지
│   │   ├── MembersPage.tsx    # 회원 관리 페이지
│   │   ├── SalesPage.tsx      # 매출 페이지
│   │   └── ...
│   ├── data/                  # Mock 데이터
│   │   ├── attendance.ts      # 출석 데이터
│   │   └── ...
│   └── types/                 # TypeScript 타입 정의
├── public/
│   └── static/
│       ├── app.js             # 프론트엔드 JavaScript
│       └── style.css          # 스타일시트
├── dist/                      # 빌드 출력 (자동 생성)
├── .git/                      # Git 저장소
├── .gitignore                 # Git 무시 파일
├── ecosystem.config.cjs       # PM2 설정
├── wrangler.jsonc             # Cloudflare 설정
├── vite.config.ts             # Vite 설정
├── tsconfig.json              # TypeScript 설정
├── package.json               # 의존성 및 스크립트
└── README.md                  # 프로젝트 문서
```

## 📜 주요 스크립트

```json
{
  "dev": "vite",                                    // Vite 개발 서버
  "dev:sandbox": "wrangler pages dev dist ...",     // Sandbox 환경
  "build": "vite build",                            // 프로젝트 빌드
  "preview": "wrangler pages dev dist",             // 로컬 프리뷰
  "deploy": "npm run build && wrangler pages deploy dist",  // Cloudflare 배포
  "deploy:prod": "npm run build && wrangler pages deploy dist --project-name webapp",
  "clean-port": "fuser -k 3000/tcp 2>/dev/null || true",    // 포트 정리
  "test": "curl http://localhost:3000",             // 간단한 테스트
  "git:init": "git init && git add . && git commit -m 'Initial commit'",
  "git:commit": "git add . && git commit -m",       // 빠른 커밋
  "git:status": "git status",
  "git:log": "git log --oneline"
}
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary (Purple)**: `#6366f1` - 주요 액션 및 강조
- **Secondary (Blue)**: `#0ea5e9` - 보조 정보
- **Success (Green)**: `#22c55e` - 성공/정상 상태
- **Warning (Orange)**: `#f97316` - 경고/주의
- **Danger (Pink)**: `#ec4899` - 오류/만료

### 타이포그래피
- **Primary Font**: Inter
- **Korean Font**: Noto Sans KR
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

## 🔧 환경 변수

개발 환경에서는 `.dev.vars` 파일을 사용합니다 (git에 커밋되지 않음):

```bash
# .dev.vars 예시
API_KEY=your_api_key_here
DATABASE_URL=your_database_url
```

프로덕션 환경에서는 Cloudflare Dashboard 또는 Wrangler로 시크릿을 설정합니다:

```bash
npx wrangler pages secret put API_KEY --project-name webapp
```

## 🤝 기여 가이드

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🔗 링크

- **Live Demo**: https://webapp.pages.dev (배포 후 업데이트)
- **Documentation**: [Wiki](https://github.com/YOUR_USERNAME/webapp/wiki)
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/webapp/issues)

## 📞 문의

프로젝트 관련 문의사항은 GitHub Issues를 통해 남겨주세요.

---

**Made with ❤️ using Hono + Cloudflare Pages**
..
