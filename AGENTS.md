# AGENTS.md

## Project Context & Operations

### Business Goal
이 저장소의 목적은 백엔드·인프라 엔지니어 경력을 전달하는 정적 포트폴리오 랜딩페이지를 유지·개선하는 것이다. 핵심 산출물은 `index.html`, `styles.css`, `script.js`이며, 가독성 높은 정보 전달과 안정적인 클라이언트 동작을 보장해야 한다.

### Tech Stack Summary
- 정적 프론트엔드: HTML5, CSS3, Vanilla JavaScript
- 런타임/로컬 검증: Python `http.server`
- 시각 검증: Playwright 스크린샷 캡처
- 버전 관리: Git

### Operational Commands
- 로컬 실행: `python3 -m http.server 4173`
- 기본 상태 확인: `git status --short`
- 변경 파일 확인: `git diff -- index.html styles.css script.js AGENTS.md`
- 빠른 구문 점검(JS): `node --check script.js`
- 변경 반영 커밋: `git add <files> && git commit -m "<message>"`

## Golden Rules

### Immutable
- 민감정보(실제 이메일 계정 비밀번호, API 키, 토큰, 내부망 주소)를 코드나 문서에 기록하지 않는다.
- 사용자 제공 이력 정보는 요청 범위를 넘는 추정으로 확장하지 않는다.
- 외부 레퍼런스 스타일을 참고하되 저작물의 구조/문구를 그대로 복제하지 않는다.
- UI 변경 시 기존 기능(모달, 메뉴 토글, 키보드 접근성, 스크롤/카운터 인터랙션)을 임의로 제거하지 않는다.

### Do's
- HTML은 의미론적 태그를 우선 사용한다.
- JS는 데이터 영역과 DOM 조작 로직을 분리해 읽기 쉽게 유지한다.
- 인터랙션 요소는 키보드 접근성과 포커스 흐름을 확인한다.
- 반응형 수정 시 760px 이하 모바일 동작을 반드시 확인한다.
- 시각 변경이 있으면 스크린샷을 생성해 결과를 검증한다.

### Don'ts
- 인라인 스크립트/인라인 스타일을 추가하지 않는다.
- 전역 네임스페이스를 불필요하게 오염시키는 유틸 함수를 추가하지 않는다.
- 사용하지 않는 라이브러리/빌드 도구를 도입하지 않는다.
- 임시 디버그 코드(`console.log`, 테스트용 하드코딩)를 커밋하지 않는다.

## Standards & References

### Coding Conventions
- 파일 역할 고정:
  - `index.html`: 구조와 접근성 마크업
  - `styles.css`: 시각 스타일, 반응형, 애니메이션
  - `script.js`: 데이터 모델, 렌더링, 이벤트/상태 제어
- 네이밍 규칙:
  - CSS 클래스: 소문자-하이픈(kebab-case)
  - JS 식별자: camelCase
- 함수 설계:
  - 렌더링 함수는 DOM 문자열 생성 책임만 가진다.
  - 이벤트 핸들러는 단일 행동(열기/닫기/토글)으로 유지한다.

### Git Strategy
- 브랜치에서 작업 후 의미 단위로 커밋한다.
- 커밋 메시지는 한국어 또는 영어 한 가지로 일관성 있게 작성한다.
- 권장 포맷: `<영역>: <변경 요약>`
  - 예: `ui: 히어로 타이포그래피 간격 조정`
  - 예: `script: 프로젝트 모달 키보드 접근성 개선`

### Maintenance Policy
- 규칙 문서와 코드 동작이 충돌하면 코드 기준으로 원인 분석 후 `AGENTS.md`를 즉시 갱신 제안 또는 반영한다.
- 새로운 하위 모듈(예: `api/`, `infra/`, `backend/`, `app/`)이 생기면 해당 경계에 별도 `AGENTS.md`를 추가해 규칙을 위임한다.
- 본 파일은 500라인 미만을 유지한다.

## Context Map (Action-Based Routing)
- **[정적 페이지 구조/섹션 수정](./AGENTS.md)** — `index.html`의 레이아웃, 접근성, 섹션 정보 구조를 변경할 때.
- **[스타일/반응형/애니메이션 수정](./AGENTS.md)** — `styles.css`의 테마, 타이포그래피, 레이아웃, 인터랙션 스타일 변경 시.
- **[동적 렌더링/이벤트/상태 수정](./AGENTS.md)** — `script.js`의 데이터, DOM 렌더링, 모달/메뉴/관찰자 로직 수정 시.
- **[운영/검증 절차 갱신](./AGENTS.md)** — 실행 명령, 검증 절차, 커밋 정책을 조정할 때.

## Nested Rules Generation Policy
현재 저장소는 단일 모듈(루트 정적 사이트) 구조이며, 별도 dependency/framework boundary가 없다. 아래 조건 중 하나가 발생하면 즉시 하위 `AGENTS.md`를 생성한다.
- 별도 패키지 매니저 파일이 추가되는 경우 (`package.json`, `requirements.txt`, `Cargo.toml` 등)
- 프레임워크 경계가 생기는 경우 (`app/`, `server/`, `infra/`, `terraform/` 등)
- 고밀도 비즈니스 로직 폴더가 분리되는 경우 (`features/*`, `core/*` 등)
