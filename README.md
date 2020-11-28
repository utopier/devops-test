# utopier-todoapp-frontend

---

## Frontend Workflow

1. github, jira, slack, confluence
   - [O]github
        - git remove -v
   - []github + jira
        - https://utopier.atlassian.net/jira/software/projects/UTOPIER/boards/1
   - []github + slack
   - []jira + slack
2. UIUX
   - []Figma
3. CrossBrowser + WebStandard
   - []브라우저 대상 목록
   - []요구사항 목록
   - []테스트 랩 구성
   - []개발환경 구성
        - TaskRunner : 폴리필, 트랜스파일, babel, Autoprepixer, jshint, css-lint, htmltidy
        - Linter
        - Validator
        - DevTools
    - []코드에서 크로스브라우저 이슈 처리
        - HTML
        - CSS
        - JavaScript
    - []Cypress Setting
4. Accessibility + WAI-ARIA
    - []레진 WAI-ARIA Giude
        - https://github.com/lezhin/accessibility/blob/master/aria/README.md
    - []WAI-ARIA 디자인패턴과 위젯
        - https://www.w3.org/TR/wai-aria-practices/#aria_ex
    - []Form
        - 라벨링, 오류 안내
    - []Focus
        - 포커스 윤곽선, Skip Navigation, 접근가능한 랜드마크
        - DOM order
        - tabindex
        - modal
    - []기타 설정
        - 문서 언어, 문서 제목, 색 대비, 
    - []코드 레벨 접근성
        - HTML : Semantic, DOM order, aria
        - CSS : img alt
    - []Accessible Style
        - tap targets, 색상 및 색 대비, 반응형, 콘텐츠 재정렬
    - []Tools Settings
        - 색 채도 검사기
        - 키보드
            - Tab, Shift+Tab, Enter, 방향키
        - eslint-plugin-jsx-a11y
        - 브라우저 접근성 테스트 
            - https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane
        - 스크린 리더 : ChromeVox

5. React + Nextjs + TypeScript + Linting + Testing
   - []React + Nextjs Setting
   - []TypeScript Setting
   - []Nextjs Routing
   - []Nextjs Envitonment Variables
   - []ESLint + Prettier
   - []Jest + react-testing-library + cypress
6. State Management
   - []State Management + React + Nextjs(SSR,Static)
   - []State Architecture
7. Design System
   - []Storybook Setting
   - []Color Pallete
   - []Design Guide
        - Responsive
        - Accessibility
        - CrossBrowser
        - Performance
        - UIUX
   - []Component Dev with emotion
8. Responsive Design & Markup Policy

   - []pulic content(icon,img,video...)
   - []GlobalStyle
   - []Theme
   - []Responsive Setting
        - meta viewport
        - images : max-width
        - layout : grid & flex & multicol
        - media query
        - breakpoint
        - text reading
   - []WebFont
   - []Responsive Images
   - []Multi-Device Content

9. React Component(UIUX,Responsive,WebStandard,Accessibility,CrossBrowser) + Nextjs with TDD

   - react-testing-library -> immutable state & props, state Management, useRef & DOM -> Nextjs Data Fetching(getStaticProps, getStaticPaths, getServerSideProps) -> LifeCycle -> useCallback, useMemo
   - DOM(Semantic, aria, CSS Naming) -> Layout(Grid&Flex), Animation, CSS Triggers, Layer, AccessibleStyle
   - []Form(formik, yup)
   - []Cusotm Hook
   - []Error Boundary
   - []Code Splitting(dynamic import(), lazy, suspense, loadable)
   - []Performance, Profiler, Reconciliation

10. PWA

   - []manifest.json
   - []serviceworker setting
   - []caching(servicework, cacheAPI, Browser Store)
   - []installable(servicework)
   - []push message(Notification API, Push API)

11. SEO

    - []title & description
    - []robots.txt & sitemap.xml
    - []https
    - []Open Graph & Twitter Card
    - []Mobile Web
    - []대표주소
    - []키워드 및 콘텐츠 최적화
    - []schema.org

12. AMP

13. Testing

    - []jest
    - []react-testing-library
    - []cypress
    - []Accessibility
    - []CrossBrowser

14. Building

    - []babel & typescript
    - []webpack

15. CICD

- []CircleCI Pipeline
- []CircleCI + Github
- []CircleCI + Slack

16. Deployment(Amplify,Netlify or CircleCI, Route53, freenom, Sentry)

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

17. Performance

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

18. Security

- []OWASP10
- []HTTPS
- []CSP
- []Mixed Content

---
