# utopier-todoapp-frontend

---

## Frontend Workflow

1. github, jira, slack, confluence, gitflow
   - [O]gitflow policy
      - master, develop, features, release, hotfix
   - [O]github
        - git remove -v
   - [O]github + jira
        - Jira Issue 발행 
        - git add -> git commit -m '[UTOPIER-10] smart commit test' -> git push
        - jira 에서 연동확인
   - [O]github + slack
   - [O]jira + slack
2. UIUX(with Figma)
   - [O]디자인 프로세스 정의
      - 서비스 정의 -> 문제 해결 전략(이해관계자, 사용자, 현장 연구) -> 와이어프레이밍, 스토리보딩 -> 프로토타입 생성 -> 사용성 테스트
   - [O]Figma
3. CrossBrowser + WebStandard
   - [O]브라우저 대상 목록
      - Netmarketshare, Statcounter에서 지원 통계 확인
      - 사이트에 Google Analytics 지원 고려
      - 최종 지원 차트 생성
   - [O]요구사항 목록(with caniuse)
      - 사용해야할 기술 목록 작성 -> 브라우저 대상 목록에서 지원 여부 확인 -> 브라우저 대상 목록, 요구사항 목록 수정
   - [O]테스트 랩 구성
      - 실제장치, 애뮬레이터, 가상머신, 자동화 및 사용앱, 사용자 테스트 계획 고려
      - 프로그래밍적으로 Cypress를 사용할 것임 
   - [O]개발환경 구성(자동화)
        - TaskRunner : 폴리필, 트랜스파일, babel, Autoprepixer, jshint, css-lint, htmltidy
        - Linter : dirty markup, css lint, eslint
        - Validator : W3C Markup Validation Service(HTML) 
        - DevTools : Chrome Devtool CSS 검사기(적용되지 않은 CSS 오류 표시)
        - Cypress
    - [O]코드 가이드 라인
        - HTML
          - 대체 동작, IE 조건부 주석
        - CSS
          - 대체 동작, 접두사 처리, @supports, 반응형 디자인, 새로운 레이아웃 기능 지원 여부, Modernizr 기능감지
        - JavaScript
          - 기능 감지, 폴리필(Modernizr HTML5 Cross Browser Polyfill), 트랜스파일링, 잘못된 브라우저 스니핑 코드 사용, 접두사 처리, Modernizr 기능감지
    - [O]Cypress setting
        - npm i cypress -D
        - npx cypress open

4. Accessibility + WAI-ARIA
    - [O]레진 WAI-ARIA Giude
        - https://github.com/lezhin/accessibility/blob/master/aria/README.md
    - [O]WAI-ARIA 디자인패턴과 위젯
        - https://www.w3.org/TR/wai-aria-practices/#aria_ex
    - [O]Form
        - 라벨링, 오류 안내
    - [O]Focus
        - 포커스 윤곽선, Skip Navigation, 접근가능한 랜드마크
        - DOM order
        - tabindex
        - modal
    - [O]기타 설정
        - 문서 언어, 문서 제목, 색 대비, 
    - [O]코드 레벨 접근성
        - HTML : Semantic, DOM order, aria
        - CSS : img alt
    - [O]Accessible Style
        - tap targets, 색상 및 색 대비, 반응형, 콘텐츠 재정렬
    - [O]Tools Settings
        - 색 채도 검사기 : Accessibility Insights, Lighthouse, Chrome DevTool( Emulate vision deficiencies), Chrome Extension(high-contrast)
        - 키보드
            - Tab, Shift+Tab, Enter, 방향키
        - eslint-plugin-jsx-a11y
        - 브라우저 접근성 테스트 
            - https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane
        - 스크린 리더 : ChromeVox

5. Responsive Design & Markup Policy
   - []Responsive Design Guide
      - semantic html, Accessibility, aria 
      - Layout, Animation, Crossbrowser, CSS Triggers, Layer
      - font
      - performance, security
   - [O]Color Pallete
   - []pulic content(icon,img,video...)
   - [O]GlobalStyle
      - 공통 디자인
      - /styles/GlobalStyle.tsx
      - _app.tsx에서 적용
   - [O]Theme
      - 공통 컬러, 공통 변수들..
      - /styles/theme.ts
   - [O]Responsive Setting
        - meta viewport
        - images : max-width
        - layout : grid & flex & multicol
        - media query
        - breakpoint
        - text reading
   - []WebFont
   - [o]Responsive Images
      - alt 속성, 상대크기 사용, max-width
      - srcset, sizes, picture, source
      - 확대가능한 이미지
      - background-image: image-set
      - media query
   - [O]Multi-Device Content
      - 불필요한 컨텐츠 제거, 중복 페이지 요소 제거, 텍스트 단순화, 중복 이미지 제거
      - 반응형 레이아웃
      - 데이터 비용 이해 ( 페이지 크기 계산(WebPagetest,ChromeDevTool), 페이지 비용 계산(https://whatdoesmysitecost.com/))
   - []Animation

6. Performance

- []측정 항목 및 목표 설정
- []측정 도구 선정
- []콘텐츠 별 성능 최적화 자동화 & 테스트
  - []Text
  - []Image
  - []Animation
  - []Javascript
  - []Webpack
  - []Font
  - []PRPL
  - []Resource 제공 최적화
- []HTTP Caching
  - []HTTP Cache
  - []Client Hint
  - []Save-Data
  - []Servicework
- []Browser Storage
  - PWA, CacheAPI, IndexedDB
- []신중하게 로드
  - []중요한 렌더링 경로
  - []HTTP/2
- []Rendering Performance
- []audit site

7. Security

- []OWASP10
- []HTTPS
- []CSP
- []Mixed Content

8. PWA

   - [O]manifest.json
      - /public
      - _app.tsx
   - []serviceworker setting
   - []caching(servicework, cacheAPI, Browser Store)
   - []installable(servicework)
   - []push message(Notification API, Push API)

9. SEO

    - [O]title & description
      - _app.tsx : 전체
      - next/head로 각 페이지 설정
      - 각각 영문, 한글 글자 길이제한을 가지고 있음.
    - [O]robots.txt & sitemap.xml
      - /public
      - https://www.twinword.co.kr/blog/basic-technical-seo/
    - []https
    - [O]Open Graph & Twitter Card
      - _app.tsx, next/head로 각 페이지 설정
    - [O]이미지 태그 최적화
      - 이미지에 적절한 alt 설정
    - []Mobile Web
      - 구글 모바일 친화성 테스트 : https://search.google.com/test/mobile-friendly
      - Responsive Web or Canonical & Alternate 
    - []대표주소
      - 하나의 대표주소 사용, 나머지는 리다이렉션
      - https://www.twinword.co.kr/blog/how-to-set-your-preferred-domain/
    - []키워드 및 콘텐츠 최적화
      - 구글 키워드 플래너, 트윈워드 아이디어즈 
    - []schema.org

10. AMP

---

11. Design System
   - []Storybook Setting
   - []Color Pallete
   - []Design Guide
        - Responsive
        - Accessibility
        - CrossBrowser
        - Performance
        - UIUX
   - []Component Dev with emotion

12. React + Nextjs + TypeScript + Linting + Testing + Folder Architecture
   - []React + Nextjs Setting
   - []TypeScript Setting
   - []Nextjs Routing
   - []Nextjs Envitonment Variables
   - []ESLint + Prettier
   - []Jest + react-testing-library + cypress
   - []Folder Architecture

13. State Management
   - []State Management + React + Nextjs(SSR,Static)
   - []State Architecture  

14. React Component(UIUX,Responsive,WebStandard,Accessibility,CrossBrowser,Performance,Security) + Nextjs with TDD
   - Code GuideLine
   - react-testing-library -> immutable state & props, state Management, useRef & DOM -> Nextjs Data Fetching(getStaticProps, getStaticPaths, getServerSideProps) -> LifeCycle -> useCallback, useMemo
   - DOM(Semantic, aria, CSS Naming) -> Layout(Grid&Flex), Animation, CSS Triggers, Layer, AccessibleStyle
   - []Form(formik, yup)
   - []Cusotm Hook
   - []Error Boundary
   - []Code Splitting(dynamic import(), lazy, suspense, loadable)
   - []Performance, Profiler, Reconciliation

15. Testing

    - []jest
    - []react-testing-library
    - []cypress
    - []Accessibility
    - []CrossBrowser
    - []Performance
    - []Security

16. Building

    - []babel & typescript
    - []webpack

17. CICD

- []CircleCI Pipeline
- []CircleCI + Github
- []CircleCI + Slack

18. Deployment(Amplify,Netlify or CircleCI, Route53, freenom, Sentry)

- []AWS Amplify 구성
  - 설치, 구성
  - AWS Amplify 추가
- []S3에 파일 업로드
- []도메인 및 호스팅
  - Netlify 프로젝트 설정
  - Route 53으로 도메인 구매
  - Netlify 사용자 지정 도메인
- []배포자동화(circleCI)
  - 환경 관리
  - Netlify 빌드 스크립트 추가
- []모니터링
  - Sentry
  - React Error Boundary

---
