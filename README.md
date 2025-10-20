# KKK AI Agent

<div align="center">

**다양한 AI 서비스를 하나의 채팅 인터페이스로 통합한 개인용 에이전트**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646cff?logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-ffd859)](https://pinia.vuejs.org/)

</div>

---

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [AI 서비스](#ai-서비스)
- [아키텍처](#아키텍처)
- [개발 가이드](#개발-가이드)

---

## 프로젝트 소개

KKK AI Agent는 텍스트 정리, 유사어 분석, 독후감 작성, 실시간 검색 등 10가지 AI 기반 서비스를 하나의 통합된 채팅 인터페이스로 제공하는 웹 애플리케이션입니다.

기존에 여러 AI 도구를 오가며 작업해야 했던 불편함을 해소하고자 시작한 프로젝트로, 각 서비스별로 최적화된 프롬프트와 컨텍스트를 제공하여 더 정확하고 빠른 결과를 얻을 수 있도록 설계했습니다.

### 왜 만들었나

여러 AI 서비스를 사용하다 보면 각각의 프롬프트를 매번 입력하고, 컨텍스트를 다시 설명하는 과정이 반복됩니다. 이 프로젝트는 자주 사용하는 작업 패턴들을 서비스로 만들어 두고, 필요할 때 즉시 사용할 수 있도록 만든 개인용 도구입니다.

빈티지 서적 스타일의 UI는 AI와 대화하는 경험을 좀 더 차분하고 집중할 수 있게 만들고 싶어서 선택했습니다. 화려한 현대적 디자인보다는 오래된 책을 읽는 듯한 느낌이 오히려 텍스트 작업에 더 어울린다고 생각했습니다.

### 핵심 특징

**통합 인터페이스**
10가지 AI 서비스를 하나의 채팅창에서 전환하며 사용할 수 있습니다. 서비스마다 최적화된 placeholder와 인트로 메시지를 제공하여, 각 서비스가 어떤 역할을 하는지 직관적으로 알 수 있습니다.

**마크다운 기반 렌더링**
모든 메시지는 마크다운으로 렌더링됩니다. AI가 생성한 코드 블록, 표, 리스트 등을 가독성 높게 표시하며, 사용자 입력도 마크다운으로 작성할 수 있어 구조화된 질문이 가능합니다.

**참조 문서 시스템**
단순히 키워드만 입력하는 것이 아니라, 추가 컨텍스트를 제공할 수 있는 참조 문서 입력 필드를 별도로 두었습니다. 긴 원문을 분석하거나 특정 맥락 안에서 답변을 받아야 할 때 유용합니다.

**상태 관리와 지속성**
Pinia와 localStorage를 결합하여 채팅 히스토리를 자동으로 저장합니다. 브라우저를 닫았다가 다시 열어도 이전 대화를 그대로 이어갈 수 있으며, JSON 형식으로 내보내기도 가능합니다.

**요청 제어**
AbortController를 활용해 진행 중인 요청을 취소할 수 있습니다. 긴 응답을 기다리다가 방향을 바꾸고 싶을 때, 불필요한 대기 시간 없이 즉시 새로운 질문을 던질 수 있습니다.

---

## 주요 기능

### 채팅 인터페이스

이 프로젝트의 핵심은 대화형 인터페이스입니다. 사용자가 입력한 메시지와 AI의 응답이 번갈아 표시되며, 각 메시지는 독립적으로 관리됩니다.

- **AI 대화**: 선택한 서비스에 따라 다른 AI 모델과 대화
- **마크다운 렌더링**: 코드 블록, 표, 링크, 리스트 등 풀 마크다운 지원
- **참고 문서**: 질문과 별도로 참조할 원문이나 컨텍스트를 첨부
- **메시지 히스토리**: localStorage에 자동 저장되어 새로고침 후에도 유지
- **동적 Placeholder**: 서비스마다 다른 입력 가이드 제공

### 메시지 관리

각 메시지에는 호버 시 나타나는 액션 버튼이 있습니다.

- **복사**: 메시지 내용을 클립보드에 복사
- **저장**: 메시지를 `.txt` 파일로 다운로드
- **재생성**: 동일한 입력으로 새로운 응답 요청
- **삭제**: 특정 메시지를 대화에서 제거

### 채팅 관리

헤더 영역에서 전체 채팅을 관리할 수 있습니다.

- **서비스 전환**: 드롭다운으로 10가지 AI 서비스 선택
- **내보내기**: 전체 채팅을 JSON 파일로 다운로드
- **초기화**: 확인 모달 후 모든 메시지 삭제

---

## 기술 스택

### Core

Vue 3의 Composition API를 기반으로 구성했습니다. TypeScript를 전면 도입하여 타입 안정성을 확보했고, Vite를 통해 빠른 개발 서버와 빌드 환경을 구축했습니다.

| 기술           | 버전   | 선택 이유                                                        |
| -------------- | ------ | ---------------------------------------------------------------- |
| **Vue 3**      | 3.5.17 | Composition API로 로직 재사용성 증대, Reactivity 시스템 활용     |
| **TypeScript** | 5.8.3  | 런타임 에러 최소화, IDE 자동완성과 리팩토링 지원                 |
| **Vite**       | 7.0.4  | HMR 속도가 빠르고 번들 크기 최적화, ES 모듈 기반 개발 경험 제공 |

### 상태 관리 & HTTP

Pinia를 전역 상태 관리 도구로 사용하며, pinia-plugin-persistedstate로 localStorage 동기화를 자동화했습니다. HTTP 요청은 Axios를 통해 처리하고, TanStack Vue Query는 향후 서버 상태 관리 확장을 위해 도입했습니다.

| 기술                   | 버전   | 역할                                              |
| ---------------------- | ------ | ------------------------------------------------- |
| **Pinia**              | 3.0.3  | Vue 3 공식 상태 관리 라이브러리, Vuex 대체        |
| **Pinia Persist**      | 4.5.0  | Store를 localStorage에 자동 저장 및 복구          |
| **TanStack Vue Query** | 5.90.3 | 서버 상태 캐싱, 재시도, 낙관적 업데이트 지원      |
| **Axios**              | 1.11.0 | HTTP 클라이언트, 인터셉터와 타임아웃 설정 활용    |

### UI & Utilities

Naive UI는 Vue 3 전용 컴포넌트 라이브러리로, 충분한 커스터마이징 옵션과 TypeScript 지원이 우수해 선택했습니다. Markdown-it은 가볍고 확장 가능한 마크다운 파서입니다.

| 기술            | 버전   | 역할                                        |
| --------------- | ------ | ------------------------------------------- |
| **Naive UI**    | 2.42.0 | Modal, Scrollbar, Spin 등 UI 컴포넌트 제공  |
| **Markdown-it** | 14.1.0 | 마크다운을 HTML로 변환, 플러그인 확장 가능  |
| **Vue Router**  | 4.x    | SPA 라우팅, 현재는 단일 페이지지만 확장 대비 |

---

## 시작하기

### 사전 요구사항

- **Node.js** 18 이상
- **pnpm** 8 이상 (npm이나 yarn도 사용 가능하지만 pnpm 권장)

### 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone <repository-url>
cd kkk-ai-agent

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 VITE_API_URL을 설정하세요
```

### 환경 변수

개발 환경과 프로덕션 환경에 따라 다른 API 서버를 사용합니다.

**개발 환경** (`.env`)

```env
VITE_API_URL=http://localhost:8000
```

**프로덕션 환경** (`.env.production`)

```env
VITE_API_URL=http://43.201.97.68:8000
```

### 개발 서버 실행

```bash
pnpm dev
```

애플리케이션이 `http://localhost:5174`에서 실행됩니다.

### 빌드 및 배포

```bash
# 타입 체크 후 프로덕션 빌드
pnpm build

# 타입 체크만 실행
pnpm typecheck

# 빌드 결과를 로컬에서 미리보기
pnpm preview
```

---

## 프로젝트 구조

프로젝트는 기능별로 명확하게 분리된 디렉토리 구조를 따릅니다. 각 폴더는 단일 책임을 가지며, 파일명 앞의 언더스코어(`_`)는 private 모듈 관례를 따릅니다.

```
kkk-ai-agent/
├── src/
│   ├── app/                      # 앱 전역 설정
│   │   └── config/
│   │       ├── _axios.instance.ts    # Axios 인스턴스 및 인터셉터 설정
│   │       └── _env.ts               # 환경 변수 상수
│   │
│   ├── components/               # Vue 컴포넌트
│   │   ├── ui/                   # 재사용 가능한 UI 컴포넌트
│   │   │   ├── ModernButton.vue      # 4가지 variant, 로딩 상태 지원
│   │   │   ├── ModernInput.vue       # IME 조합 문자 처리, Enter 이벤트
│   │   │   └── MessageBubble.vue     # 메시지 표시, 액션 버튼
│   │   │
│   │   └── widgets/              # 비즈니스 로직 위젯
│   │       ├── ChatHeader.vue        # 서비스 선택, 내보내기, 초기화
│   │       ├── ChatMain.vue          # 메시지 목록, 자동 스크롤
│   │       └── ChatFooter.vue        # 입력 필드, 참조 문서 토글
│   │
│   ├── constants/                # 상수 정의
│   │   ├── _models.ts                # AI 모델 옵션 배열
│   │   ├── _texts.ts                 # Placeholder, 인트로 마크다운
│   │   ├── _markdown.ts              # Markdown-it 설정
│   │   ├── _regex.ts                 # 정규식 패턴
│   │   └── _timings.ts               # 디바운스, 애니메이션 타이밍
│   │
│   ├── router/                   # Vue Router 설정
│   │   ├── index.ts                  # 라우터 인스턴스, beforeEach 가드
│   │   └── ChatPage.vue              # 메인 채팅 페이지 (유일한 라우트)
│   │
│   ├── service/                  # API 서비스 레이어
│   │   └── _chat.service.ts          # generateText() 함수, 에러 핸들링
│   │
│   ├── stores/                   # Pinia 스토어
│   │   └── _chat.ts                  # 채팅 상태, Actions, Computed
│   │
│   ├── types/                    # TypeScript 타입 정의
│   │   └── _chat.ts                  # Message, ChatService, 요청/응답 인터페이스
│   │
│   ├── utils/                    # 유틸리티 함수
│   │   └── _markdown.ts              # renderMarkdown() 함수
│   │
│   ├── App.vue                   # 루트 컴포넌트, Naive UI 테마 설정
│   ├── main.ts                   # 앱 진입점, 플러그인 등록
│   └── style.css                 # 전역 스타일, CSS 변수, 폰트 로딩
│
├── .env                          # 개발 환경 변수
├── .env.production               # 프로덕션 환경 변수
├── vite.config.ts                # Vite 설정, alias, 포트
├── tsconfig.json                 # TypeScript 설정, path alias
└── package.json                  # 프로젝트 메타데이터, 스크립트
```

### 디렉토리 설명

**app/**
Axios 인스턴스나 환경 변수 같은 전역 설정을 관리합니다. 여기서 설정한 Axios 인스턴스는 모든 API 호출에서 재사용됩니다.

**components/ui/**
프로젝트 전반에서 재사용되는 순수 UI 컴포넌트들입니다. 비즈니스 로직 없이 props와 events만으로 동작하도록 설계했습니다.

**components/widgets/**
실제 비즈니스 로직을 담고 있는 컴포넌트들입니다. Pinia store와 직접 연결되어 있으며, 각 위젯은 독립적으로 동작합니다.

**constants/**
하드코딩을 피하고 한곳에서 상수를 관리합니다. AI 모델 목록이나 placeholder 텍스트를 수정할 때 이 폴더만 건드리면 됩니다.

**service/**
백엔드 API와 통신하는 순수 함수들을 모아둡니다. 컴포넌트에서 직접 Axios를 호출하지 않고, 이 레이어를 거쳐 API를 호출하도록 강제합니다.

**stores/**
Pinia store가 위치합니다. 현재는 chat store 하나만 있지만, 향후 user나 settings 같은 스토어를 추가할 수 있습니다.

**types/**
프로젝트 전반에서 사용하는 TypeScript 타입과 인터페이스를 정의합니다. 컴포넌트 간 props 타입을 공유할 때도 이곳을 참조합니다.

**utils/**
범용 유틸리티 함수들입니다. 현재는 마크다운 렌더링 함수만 있지만, 날짜 포맷팅이나 텍스트 처리 함수를 추가할 수 있습니다.

---

## AI 서비스

총 10가지 AI 서비스를 제공합니다. 각 서비스는 특정 작업에 최적화된 프롬프트와 컨텍스트를 갖고 있습니다.

| 서비스                       | 설명                                                       | 사용 예시                              |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| **깨끗이**                   | 텍스트를 문법적으로 정리하고 오타를 수정합니다             | 급하게 쓴 메모를 정돈된 문장으로 변환  |
| **유사어 분석**              | 단어의 유사어를 찾고 뉘앙스 차이를 설명합니다              | 번역 시 적절한 단어 선택, 글쓰기 보조 |
| **독후감 비평**              | 책에 대한 리뷰나 독후감을 작성하거나 비평합니다            | 독서 기록, 책 추천 글 작성             |
| **실시간 소식**              | 최신 뉴스나 트렌드를 검색하고 요약합니다                   | 시사 정보 조사, 트렌드 파악            |
| **딥 서치**                  | 주제에 대한 심층 정보를 검색하고 구조화합니다              | 학술 조사, 기술 리서치                 |
| **XAI 프롬프트 엔지니어**    | Grok(XAI) 모델에 최적화된 프롬프트를 생성합니다            | Grok API 활용 시 프롬프트 작성         |
| **OpenAI 프롬프트 엔지니어** | ChatGPT(OpenAI) 모델에 최적화된 프롬프트를 생성합니다      | GPT-4 API 활용 시 프롬프트 작성        |
| **작품 스토리 분석**         | 소설, 영화 등의 스토리 구조와 캐릭터를 분석합니다          | 창작 피드백, 시나리오 리뷰             |
| **업체 요구사항 분석**       | 클라이언트 요구사항을 정리하고 개발 스펙으로 변환합니다    | 프로젝트 기획, 요구사항 명세서 작성    |
| **번역본 비교**              | 동일 원문의 여러 번역본을 비교하고 차이점을 분석합니다     | 번역 품질 검토, 최적 번역 선택         |

### 서비스 전환 방법

[ChatHeader.vue](src/components/widgets/ChatHeader.vue)의 드롭다운 메뉴에서 서비스를 선택할 수 있습니다. 서비스를 전환하면 입력 필드의 placeholder가 자동으로 변경되며, 현재 선택된 서비스에 맞는 가이드 메시지가 표시됩니다.

---

## 아키텍처

### 위젯 기반 구조

전체 애플리케이션은 3개의 주요 위젯으로 구성됩니다. 각 위젯은 독립적으로 동작하며, Pinia store를 통해 상태를 공유합니다.

```
┌─────────────────────────────────────┐
│          ChatHeader                 │  ← 서비스 선택, 내보내기, 초기화
├─────────────────────────────────────┤
│                                     │
│          ChatMain                   │  ← 메시지 목록, 자동 스크롤
│          (flex: 1)                  │
│                                     │
├─────────────────────────────────────┤
│          ChatFooter                 │  ← 입력 필드, 참조 문서
└─────────────────────────────────────┘
```

**ChatHeader**
상단에 고정되어 서비스 전환, 채팅 내보내기, 초기화 기능을 제공합니다. 드롭다운으로 서비스를 선택하면 store의 `updateService()` 액션을 호출합니다.

**ChatMain**
메시지 목록을 스크롤 가능한 영역에 표시합니다. 새 메시지가 추가되면 자동으로 하단으로 스크롤되며, Naive UI의 Scrollbar 컴포넌트를 사용해 커스텀 스크롤바를 구현했습니다.

**ChatFooter**
사용자 입력을 받는 영역입니다. 메인 입력 필드와 참조 문서 입력 필드로 나뉘며, Enter 키로 전송, Shift+Enter로 줄바꿈을 지원합니다.

### 상태 관리 (Pinia Store)

useChatStore는 전체 채팅 상태를 관리합니다. [stores/_chat.ts](src/stores/_chat.ts)

```typescript
// State
messages: Message[]              // 전체 메시지 배열 (사용자 + 봇)
service: ChatService             // 현재 선택된 AI 서비스
keyword: string                  // 현재 입력 중인 텍스트
refMsg: string                   // 참조 문서 내용
showRefInput: boolean            // 참조 문서 입력창 표시 여부
pendingMessages: Set<string>     // 로딩 중인 메시지 ID Set
activeRequests: Map<string, AbortController>  // 진행 중인 요청 Map

// Computed
displayMessages: Message[]       // 화면에 표시할 메시지 (인트로 메시지 제외)
isLoading: boolean               // 현재 로딩 중인지 여부
hasMessages: boolean             // 사용자가 작성한 메시지가 있는지 여부

// Actions
handleGenerate()                 // 사용자 입력을 서버로 전송
handleRegenerate(msg: Message)   // 특정 메시지 재생성
updateService(service)           // 서비스 전환 및 인트로 메시지 추가
deleteMessage(index: number)     // 메시지 삭제
clearChat()                      // 전체 채팅 초기화
exportChat()                     // JSON 형식으로 내보내기
cancelCurrentRequest()           // 진행 중인 요청 취소
```

### 통신 흐름

사용자가 메시지를 전송하면 다음과 같은 과정을 거칩니다:

```
1. 사용자가 입력 필드에 텍스트 입력 후 전송 버튼 클릭 (또는 Enter)
   ↓
2. ChatFooter에서 store.handleGenerate() 호출
   ↓
3. useChatStore.handleGenerate() 실행
   - messages 배열에 사용자 메시지 추가 (role: 'user')
   - 고유 ID를 가진 로딩 메시지 추가 (role: 'bot', 임시 content)
   - pendingMessages Set에 ID 추가
   ↓
4. generateText() API 호출 (service/_chat.service.ts)
   - POST /generate/{service}
   - AbortController 생성 및 activeRequests Map에 저장
   ↓
5. 서버 응답 대기
   - 성공: 로딩 메시지를 실제 응답으로 교체
   - 실패: 에러 메시지 표시
   ↓
6. pendingMessages와 activeRequests 정리
   ↓
7. ChatMain에서 자동 스크롤 (100ms delay)
   ↓
8. Pinia Persist 플러그인이 localStorage에 자동 저장
```

### API 엔드포인트

**POST** `/generate/{service}`

백엔드 API는 RESTful 구조를 따릅니다. service 파라미터는 URL path에 포함되며, 요청 본문에는 사용자 입력과 참조 문서를 담습니다.

**Request Body**

```json
{
  "keyword": "사용자가 입력한 텍스트",
  "ref": "참조 문서 (선택 사항)"
}
```

**Response**

```json
{
  "content": "AI가 생성한 응답 텍스트 (마크다운 형식)"
}
```

**에러 응답**

- `429 Too Many Requests` - Rate limit 초과, 잠시 후 재시도 안내
- `500 Internal Server Error` - 서버 에러, 사용자에게 재시도 요청
- 기타 에러 - 일반 에러 메시지 표시

에러 핸들링은 [service/_chat.service.ts](src/service/_chat.service.ts)에서 처리하며, 사용자에게 친화적인 메시지로 변환하여 표시합니다.

---

## 개발 가이드

### 새로운 AI 서비스 추가하기

새 서비스를 추가하려면 프론트엔드와 백엔드를 모두 수정해야 합니다. 프론트엔드는 4개 파일만 수정하면 됩니다.

**1. 타입 정의 추가** ([types/_chat.ts](src/types/_chat.ts))

```typescript
export type ChatService =
  | 'clean'
  | 'synonym'
  // ...existing services
  | 'new-service'; // 새 서비스 추가
```

**2. 모델 옵션 추가** ([constants/_models.ts](src/constants/_models.ts))

```typescript
export const MODEL_OPTIONS: ModelOption[] = [
  // ...existing options
  { value: 'new-service', label: '새 서비스 이름' },
];
```

**3. Placeholder 텍스트 추가** ([constants/_texts.ts](src/constants/_texts.ts))

```typescript
export const PLACEHOLDER_TEXT: Record<ChatService, string> = {
  // ...
  'new-service': '새 서비스에 맞는 입력 가이드 메시지...',
};
```

**4. 인트로 마크다운 추가 (선택)** ([constants/_texts.ts](src/constants/_texts.ts))

```typescript
export const INTRO_MARKDOWN: Record<ChatService, string> = {
  // ...
  'new-service': '# 새 서비스\n서비스 설명과 사용법...',
};
```

**5. 백엔드 API 구현**

백엔드 서버에 `POST /generate/new-service` 엔드포인트를 구현합니다. 요청 본문에서 `keyword`와 `ref`를 받아 처리한 후, `content` 필드에 마크다운 형식의 응답을 반환합니다.

### 스타일 커스터마이징

전역 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다. [style.css](src/style.css)

```css
:root {
  --antique-cream: #faf8f3; /* 메인 배경색 */
  --parchment: #f0ead6; /* 카드, 입력 필드 배경 */
  --aged-paper: #e8dfc7; /* 호버 상태 배경 */
  --vintage-brown: #6b5d4f; /* 주요 텍스트 색상 */
  --deep-burgundy: #4a3428; /* 헤더, 강조 색상 */
  --ink-black: #2c2419; /* 다크 모드 텍스트 */
  --sepia: #8b6f47; /* 보조 텍스트, 설명 */
  --gold-accent: #b8965d; /* 버튼 액센트, 하이라이트 */
}
```

빈티지 스타일을 유지하면서 색상만 바꾸고 싶다면 위 변수들만 수정하면 됩니다. 현대적인 디자인으로 바꾸려면 폰트도 함께 변경해야 합니다.

```css
body {
  font-family: 'Crimson Text', serif; /* 본문 폰트 */
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'EB Garamond', serif; /* 제목 폰트 */
}
```

### 컴포넌트 재사용

#### ModernButton

4가지 variant와 3가지 크기를 지원하는 버튼 컴포넌트입니다.

```vue
<ModernButton
  variant="primary"
  <!-- primary: 주요 액션, secondary: 보조 액션, ghost: 경량 액션, danger: 삭제 등 -->
  size="md"
  <!-- sm: 작은 버튼, md: 기본 크기, lg: 큰 버튼 -->
  :loading="isSubmitting"
  :disabled="!isValid"
  :icon="SendIcon"
  :icon-only="false"
  @click="handleSubmit"
>
  전송
</ModernButton>
```

**loading prop**: 버튼 내부에 스피너가 표시되며, 클릭이 비활성화됩니다.
**icon-only prop**: 텍스트 없이 아이콘만 표시합니다. 툴바 버튼에 유용합니다.

#### ModernInput

IME 조합 문자를 완벽하게 지원하는 입력 필드 컴포넌트입니다.

```vue
<ModernInput
  v-model="message"
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 8 }"
  placeholder="메시지를 입력하세요..."
  @on-enter="handleSend"
  @on-shift-enter="handleNewLine"
/>
```

**type prop**: `text`, `textarea`, `password` 중 선택
**autosize prop**: textarea 타입일 때 자동으로 높이 조절
**on-enter event**: Enter 키 입력 시 발생 (IME 조합 중이 아닐 때만)
**on-shift-enter event**: Shift+Enter 입력 시 발생

### 마크다운 렌더링

모든 메시지는 마크다운으로 렌더링됩니다. [utils/_markdown.ts](src/utils/_markdown.ts)

```typescript
import { renderMarkdown } from '@/utils';

const markdown = '# 제목\n\n**굵은 글씨**와 *기울임*\n\n```js\nconsole.log("코드 블록")\n```';
const html = renderMarkdown(markdown);

// 결과:
// <h1>제목</h1>
// <p><strong>굵은 글씨</strong>와 <em>기울임</em></p>
// <pre><code class="language-js">console.log("코드 블록")</code></pre>
```

markdown-it 인스턴스는 다음 옵션으로 설정되어 있습니다:

- `html: true` - HTML 태그 허용
- `linkify: true` - URL을 자동으로 링크로 변환
- `typographer: true` - 따옴표, 대시 등을 타이포그래피 기호로 변환
- `breaks: true` - 줄바꿈을 `<br>`로 변환

추가 플러그인을 설치하려면 [constants/_markdown.ts](src/constants/_markdown.ts)에서 markdown-it 인스턴스를 수정하면 됩니다.

### 메시지 구조

모든 메시지는 다음 인터페이스를 따릅니다. [types/_chat.ts](src/types/_chat.ts)

```typescript
interface Message {
  role: 'user' | 'bot'; // 메시지 작성자
  content: string; // 메시지 내용 (마크다운)
  keyword?: string; // 사용자가 입력한 원본 텍스트
  timestamp?: number; // Unix timestamp (ms)
  id?: string; // 고유 ID (로딩 메시지 추적용)
  ref?: string; // 참조 문서
  service?: string; // 사용된 AI 서비스
}
```

**role**: 메시지 버블의 스타일과 위치를 결정합니다.
**content**: 마크다운으로 렌더링됩니다.
**id**: 로딩 중인 메시지를 추적하고 교체할 때 사용합니다.
**keyword와 ref**: 재생성 기능에서 동일한 입력으로 다시 요청할 때 사용됩니다.

---

## 개발 명령어

```bash
# 개발 서버 실행 (포트 5174)
pnpm dev

# TypeScript 타입 체크
pnpm typecheck

# 프로덕션 빌드 (타입 체크 포함)
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

---

## 디자인 시스템

### 컬러 팔레트

빈티지 서적 느낌을 위해 세피아 톤과 중성 베이지 계열을 중심으로 구성했습니다.

| 색상명        | HEX       | 사용 위치                   |
| ------------- | --------- | --------------------------- |
| Antique Cream | `#faf8f3` | 메인 배경                   |
| Parchment     | `#f0ead6` | 카드 배경, 입력 필드        |
| Aged Paper    | `#e8dfc7` | 호버 상태, 선택된 항목      |
| Vintage Brown | `#6b5d4f` | 주요 텍스트, 아이콘         |
| Deep Burgundy | `#4a3428` | 헤더, 버튼 (primary)        |
| Ink Black     | `#2c2419` | 코드 블록, 다크 모드 텍스트 |
| Sepia         | `#8b6f47` | 설명 텍스트, placeholder    |
| Gold Accent   | `#b8965d` | 강조, 하이라이트, 호버      |

### 타이포그래피

구글 폰트에서 제공하는 고전적인 세리프 폰트를 사용합니다.

- **헤드라인**: EB Garamond - 18세기 프랑스 활자를 디지털화한 폰트, 우아하고 가독성 좋음
- **본문**: Crimson Text - 영국 스타일 세리프, 긴 글을 읽기 편함

### 스타일 특징

**빈티지 서적 느낌**
전체적으로 종이와 잉크의 느낌을 살리기 위해 베이지와 갈색 계열을 사용했습니다. 현대적인 흰색 배경 대신 약간 누런 Antique Cream을 사용해 눈의 피로를 줄였습니다.

**3D 그림자 효과**
버튼과 카드에 box-shadow를 사용해 입체감을 부여했습니다. 클릭 시 그림자가 작아지며 눌리는 느낌을 표현합니다.

**선형 질감 오버레이**
배경에 linear-gradient로 미세한 선을 추가해 종이 질감을 표현했습니다. 너무 강하지 않게 opacity를 낮춰 은은하게 적용했습니다.

**부드러운 전환**
모든 상호작용에 transition을 적용해 자연스러운 애니메이션을 제공합니다. 호버, 클릭, 포커스 상태 전환이 부드럽게 이루어집니다.

---

## 최적화

### 성능 최적화

**Set/Map 자료구조 활용: 왜 배열 대신 사용했나**

초기 버전에서는 로딩 중인 메시지를 배열로 관리했습니다. 하지만 사용자가 여러 메시지를 빠르게 전송하면 배열의 `includes()` 메서드가 O(n) 시간복잡도로 동작하면서 성능 저하가 발생했습니다.

```typescript
// 배열 사용 시 (비효율적)
const pendingMessages: string[] = []
if (pendingMessages.includes(messageId)) { ... } // O(n)

// Set 사용 (효율적)
const pendingMessages: Set<string> = new Set()
if (pendingMessages.has(messageId)) { ... } // O(1)
```

Set과 Map을 사용하면서 얻은 이점:

1. **조회 성능**: 메시지 ID로 로딩 상태를 확인할 때 배열은 모든 요소를 순회하지만, Set은 해시 테이블 기반이라 즉시 조회됩니다.
2. **중복 방지**: Set은 자동으로 중복을 제거하므로 같은 메시지 ID가 여러 번 추가되는 버그를 원천 차단합니다.
3. **메모리 효율**: Map은 key-value 쌍을 효율적으로 저장하며, 삭제 시 메모리를 즉시 해제합니다.

실제 사용 시나리오를 보면, 사용자가 5개 메시지를 연속으로 보낼 때:
- 배열: 5 + 4 + 3 + 2 + 1 = 15번 비교 (최악의 경우)
- Set: 5번 조회 (상수 시간)

메시지가 많아질수록 성능 차이는 더 벌어집니다.

**AbortController로 요청 취소: 어떤 상황에서 유용한가**

AI 응답은 몇 초에서 수십 초까지 걸릴 수 있습니다. 사용자가 응답을 기다리다가 질문을 바꾸고 싶거나, 오타를 발견했을 때 기존 요청을 취소할 수 있어야 합니다.

AbortController가 없으면 생기는 문제들:

1. **불필요한 네트워크 사용**: 더 이상 필요 없는 응답을 계속 받아옵니다.
2. **서버 부하**: 백엔드는 이미 불필요한 계산을 계속 수행합니다.
3. **UI 혼란**: 이전 요청의 응답이 늦게 도착하면 잘못된 메시지가 표시될 수 있습니다.
4. **메모리 누수**: 완료되지 않은 요청의 콜백이 메모리에 남아있습니다.

실제 구현:

```typescript
// 새 요청 시작 시 이전 요청 취소
const abortController = new AbortController()
activeRequests.set(messageId, abortController)

axios.post('/generate', data, {
  signal: abortController.signal
})

// 사용자가 취소 버튼 클릭 시
abortController.abort()
activeRequests.delete(messageId)
```

실제 유용한 시나리오:

- **오타 발견**: "파이썬의 장접은?" → 전송 후 즉시 취소하고 "파이썬의 장점은?"으로 재전송
- **질문 변경**: 긴 분석을 요청했는데 간단한 요약이 필요하다는 걸 깨달음
- **페이지 이탈**: 사용자가 다른 탭으로 이동하거나 브라우저를 닫을 때 진행 중인 요청 정리
- **네트워크 절약**: 모바일 환경에서 불필요한 데이터 사용 방지

초기 버전에서 AbortController 없이 개발했을 때, 사용자가 여러 메시지를 빠르게 보내면 이전 응답들이 나중에 도착해서 엉뚱한 메시지가 표시되는 버그가 있었습니다. AbortController 도입 후 이 문제가 완전히 해결되었습니다.

**localStorage Persist: 서버 부하 감소와 오프라인 지원**

많은 채팅 애플리케이션은 모든 메시지를 서버 데이터베이스에 저장합니다. 하지만 개인용 도구인 이 프로젝트는 다른 접근을 선택했습니다.

서버 저장 방식의 문제점:

1. **추가 API 필요**: 메시지 저장, 조회, 삭제 엔드포인트 구현 필요
2. **네트워크 오버헤드**: 매 메시지마다 저장 요청 발생
3. **서버 부하**: 데이터베이스 읽기/쓰기 부담
4. **개인정보 우려**: 민감한 대화 내용이 서버에 저장됨
5. **의존성**: 서버가 다운되면 히스토리 접근 불가

localStorage를 선택한 이유:

1. **즉시 저장**: Pinia Persist 플러그인이 상태 변경을 자동 감지하고 localStorage에 저장합니다. 별도 API 호출 없이 동기적으로 처리됩니다.
2. **오프라인 지원**: 인터넷 연결 없이도 이전 대화를 볼 수 있습니다. 지하철이나 비행기에서도 히스토리 확인 가능합니다.
3. **서버 무상태**: 백엔드는 요청만 처리하고 상태를 유지하지 않아 수평 확장이 쉽습니다.
4. **프라이버시**: 대화 내용이 사용자 브라우저에만 저장되어 개인정보 유출 위험이 없습니다.
5. **비용 절감**: 데이터베이스 비용과 스토리지 비용이 발생하지 않습니다.

실제 동작 방식:

```typescript
// Pinia Store 설정
export const useChatStore = defineStore('chat', {
  state: () => ({ messages: [] }),
  persist: {
    key: 'chat-store',
    storage: localStorage
  }
})

// 메시지 추가 시 자동으로 localStorage에 저장됨
chatStore.messages.push(newMessage) // 별도 저장 코드 불필요
```

한계와 trade-off:

- **브라우저 제한**: localStorage는 약 5-10MB 제한이 있습니다. 하지만 텍스트 기반 채팅은 수천 개 메시지를 저장해도 1MB 미만입니다.
- **기기 간 동기화 불가**: 다른 기기나 브라우저에서는 히스토리를 볼 수 없습니다. 하지만 개인용 도구라 큰 문제가 되지 않습니다.
- **브라우저 캐시 삭제 시 손실**: 사용자가 브라우저 데이터를 삭제하면 히스토리가 사라집니다. 이를 대비해 JSON 내보내기 기능을 제공합니다.

이 접근 방식은 개인용 도구의 특성에 완벽히 맞아떨어집니다. 서버는 순수하게 AI 추론만 담당하고, 클라이언트가 모든 상태를 관리하는 깔끔한 아키텍처를 만들 수 있었습니다.

**부드러운 스크롤**
새 메시지가 추가되면 100ms 후에 스크롤합니다. 메시지가 렌더링되고 레이아웃이 안정화된 후 스크롤되므로, 스크롤 위치가 튀는 현상을 방지합니다.

초기 버전에서는 메시지 추가 직후 즉시 스크롤했는데, Vue의 DOM 업데이트가 비동기로 일어나면서 스크롤이 잘못된 위치로 이동하는 문제가 있었습니다. `nextTick()`도 시도했지만, 브라우저 레이아웃 계산까지 고려하면 100ms의 여유가 가장 안정적이었습니다.

### 메모리 관리

**컴포넌트 언마운트 시 정리**
onBeforeUnmount 훅에서 모든 진행 중인 요청을 취소하고, 타이머를 정리합니다.

**요청 취소 시 리소스 해제**
AbortController를 통해 요청을 취소하면, activeRequests Map에서 해당 항목을 제거해 메모리 누수를 방지합니다.

**로딩 상태 Set 자동 cleanup**
메시지가 완료되면 pendingMessages Set에서 ID를 즉시 제거합니다. 오래된 로딩 상태가 남아있지 않도록 관리합니다.

---

## 라이선스

이 프로젝트는 개인 프로젝트로, 특정 라이선스를 명시하지 않습니다.

---

## 문의

프로젝트 관련 문의사항이나 버그 리포트는 이슈를 생성해주세요.

---

Made with Vue 3 + TypeScript
