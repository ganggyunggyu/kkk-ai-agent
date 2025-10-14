# KKK AI Agent

Clean 모델만 사용하는 개인용 AI 에이전트 프로젝트입니다.

## 기술 스택

- **Vue 3** - Composition API
- **TypeScript** - 타입 안정성
- **Pinia** - 상태 관리 (localStorage persist)
- **Naive UI** - UI 컴포넌트 라이브러리
- **Markdown-it** - 마크다운 렌더링
- **Vite** - 빌드 도구

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

프로젝트는 `http://localhost:5174`에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 타입 체크

```bash
pnpm typecheck
```

## 환경 변수

`.env` 파일에서 다음 환경 변수를 설정하세요:

```
VITE_API_URL=http://localhost:8000
```

## 프로젝트 구조

```
src/
├── app/              # 앱 설정 (axios, env)
├── components/
│   ├── ui/          # 재사용 UI 컴포넌트 (Button, Input, MessageBubble)
│   └── widgets/     # 비즈니스 로직 위젯 (ChatHeader, ChatMain, ChatFooter)
├── constants/        # 상수 정의 (모델, 정규식, 텍스트)
├── router/           # Vue Router 및 페이지
├── service/          # API 서비스 레이어
├── stores/           # Pinia 상태 관리
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수 (마크다운 렌더링 등)
```

## 주요 기능

✅ **Clean 모델 기반 AI 채팅**
✅ **마크다운 렌더링** - 모든 메시지를 markdown-it로 렌더링
✅ **메시지 히스토리 관리** - Pinia + localStorage
✅ **참조 문서 입력 지원** - 컨텍스트 제공
✅ **채팅 내보내기** - JSON 형식으로 다운로드
✅ **채팅 초기화** - 모달 확인
✅ **메시지 액션** - 복사, 저장, 재생성, 삭제
✅ **로딩 상태 관리** - AbortController 기반
✅ **에러 핸들링** - 사용자 친화적 에러 메시지

## 위젯 아키텍처

프로젝트는 **위젯 기반 아키텍처**를 사용합니다:

- `ChatHeader`: 타이틀, 모델 선택, 내보내기, 초기화
- `ChatMain`: 메시지 목록, 스크롤 관리
- `ChatFooter`: 입력 필드, 전송 버튼, 참조 문서 입력

## 상태 관리

Pinia를 사용하여 다음 상태를 관리합니다:

- `messages`: 채팅 메시지 배열
- `keyword`: 현재 입력 키워드
- `refMsg`: 참조 문서
- `service`: 선택된 AI 모델 ('clean')
- `isLoading`: 로딩 상태
- `pendingMessages`: 대기 중인 메시지 Set
- `activeRequests`: 진행 중인 요청 Map

## 개발 참고사항

- 포트는 **5174**로 고정
- API 서버는 `http://localhost:8000` 사용
- 모든 메시지는 **마크다운으로 렌더링**
- Store는 자동으로 localStorage에 persist
