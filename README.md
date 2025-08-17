# LABCELLBIO FRONTEND

LabCellBio 연구실의 공식 웹사이트입니다.

## 프로젝트 소개

LABCELLBIO의 Frontend코드 입니다.

## 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: SCSS, Tailwind CSS
- **Editor**: TipTap (Rich Text Editor)
- **Deployment**: Vercel

## 배포 관련

이 프로젝트는 main 브랜치에 코드를 푸시하면 자동으로 배포되는 시스템입니다. 

배포 현황은 다음 링크에서 확인할 수 있습니다:
https://vercel.com/auroraskjys-projects/labcellbio/deployments

## 코드 실행 방법

### 1. Node.js 설치
1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전을 다운로드합니다.
2. 다운로드한 설치 파일을 실행하여 Node.js를 설치합니다.
3. 설치가 완료되면 터미널에서 다음 명령어로 설치를 확인합니다:
   ```bash
   node --version
   npm --version
   ```

### 2. 개발 도구 설치
1. VS Code를 다운로드하여 설치합니다.

### 3. 프로젝트 클론
1. 터미널을 열고 원하는 위치로 이동합니다.
   ```bash
   cd <프로젝트 파일이 위치할 곳>
   ```
2. 다음 명령어를 실행하여 프로젝트를 클론합니다:
   ```bash
   git clone https://github.com/auroraskjy/labcellbio_f.git
   ```

### 4. 의존성 설치
프로젝트 디렉토리로 이동한 후 다음 명령어를 실행하여 필요한 패키지들을 설치합니다:
```bash
npm install
```

### 5. 개발 서버 실행
의존성 설치가 완료되면 다음 명령어로 개발 서버를 실행합니다:
```bash
npm run dev
```

개발 서버가 성공적으로 실행되면 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
labcellbio_f/
├── app/                    # Next.js App Router
├── components/             # 재사용 가능한 컴포넌트
├── services/              # API 서비스
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 함수
└── styles/                # 스타일 파일
```
