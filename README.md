## 1. React + Nextjs + Ts + Emotion(or SASS)

## 2. Linting(ESlint + Prettier)

1. ESLint 설치 및 설정
   - npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
   - .eslintrc
     ```json
     {
       "parser": "@typescript-eslint/parser",
       "plugins": ["@typescript-eslint"],
       "extends": ["plugin:@typescript-eslint/recommended"]
     }
     ```
   - package.json
     ```json
     {
       //...
       "scripts": {
         "lint": "eslint './src/**/*.{ts,tsx,js,jsx}'",
         "lint:fix": "eslint --fix './src/**/*.{ts,tsx,js,jsx}'"
       }
       //...
     }
     ```
2. eslint-config-airbnb
   - eslint-config-airbnb는 리액트 관련 규칙이 있고 eslint-config-airbnb-base는 리액트를 제외한 규칙이 있음
     - 서버에서는 eslint-config-airbnb-base 사용
   - npm info "eslint-config-airbnb@latest" peerDependencies or npx install-peerdeps -D eslint-config-airbnb
   - .eslintrc
     ```json
     {
       "parser": "@typescript-eslint/parser",
       "plugins": ["@typescript-eslint"],
       "extends": [
         "airbnb",
         "airbnb/hooks",
         "plugin:@typescript-eslint/recommended"
       ]
     }
     ```
3. Prettier 설정
   - npm i - D prettier eslint-config-prettier eslint-plugin-prettier
   - .prettierrc
     ```json
     {
       "singleQuote": true,
       "parser": "typescript",
       "semi": true,
       "useTabs": true,
       "printWidth": 120
     }
     ```
   - package.json
     ```json
     "scripts": {
     //...
         "prettier": "prettier --write --config ./.prettierrc './src/**/*.{ts,tsx}'",
     //...
     }
     ```
   - .eslintrc
     ```json
     {
       "parser": "@typescript-eslint/parser",
       "plugins": ["@typescript-eslint"],
       "extends": [
         "prettier",
         "airbnb",
         "airbnb/hooks",
         "prettier/react",
         "plugin:@typescript-eslint/recommended",
         "prettier/@typescript-eslint",
         "plugin:prettier/recommended"
       ]
     }
     ```
4. eslint ignore 설정

   - .eslintignore
     - /node_modules

5. 실행

   - 코드입력 -> prettier -> eslint -> 코드수정
   - npm run prettier 코드스타일 변경
   - npm run lint 코드규칙 검사

6. VSC 코드 저장시 자동화

## 3. Testing(jest, react-testing-library, cypress, storybook)

- 정적 분석 : eslint, prettier, typescript
- 단위 테스트 : jest
- 통합 테스트 : jest, react-testing-library
- 엔드투엔드 테스트 : cypress

1. jest
2. react-testing-library + jest
   - npm i -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event node-fetch
     - 추가고려사항 : babel은 babel-jest, Typescript는 ts-jest
   - src/setupTests.js
     ```javascript
     import '@testing-library/jest-dom/extend-expect';
     import fetch from 'node-fetch';
     global.fetch = fetch;
     ```
   - package.json
   ```json
   "scripts":{
       //...
       "test":"jest",
       "test:watch":"jest --watch",
       "test:coverage":"jest --coverage"
       //...
   },
   "jest":{
       "setupFilesAfterEnv": [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/setupTests.js"
    ]
   }
   ```
3. cypress
   - npm i -D cypress @testing-library/cypress start-server-and-test
   - package.json
     ```json
     "scripts": {
         //...
         "cypress": "cypress open",
         "cypress:headless": "cypress run --browser chrome --headless",
         "test:e2e": "start-server-and-test start 3000 cypress",
         "test:e2e:ci": "start-server-and-test start 300 cypress:headless"
         //...
     }
     ```
   - cypress.json
      ```json
      {
        "baseUrl": "http://localhost:3000",
        "video": false
      }
      ```
    - cypress/support/index.js
      ```javascript
      import '@testing-library/cypress/add-commands';
      ```
    - npm i -D msw

---

## 4. AWS Architecture
- CloudFront, Route53, API Gateway, Lambda, S3
- serverless-next.js
  - @serverless/aws-s3
  - @serverless/aws-cloudfront
  - @serverless/aws-lambda
  - @serverless/domain
- serverless.yml
  ```yml
  myApp:
    component: serverless-next.js
    inputs:
      domain: ["www", "example.com"] # [ sub-domain, domain ]
  ```
1. CloudFront 에서 세가지 캐시 동작이 생성됨
  - Build assets (_next/*)
  - User assets (static/*)
  - Page & API Routes 
2. S3 Bucket (람다 함수와 연결됨)
  - /_next (서버 측 렌더링 페이지)
  - /static  (정적으로 최적화 된 페이지)
  - /public & /static-pages
3. 맞춤 돔메인
  - 도메인을 CloudFront 배포와 연결하고 Route53에서 하위 도메인을 생성하며 AWS ACM을 사용해 SSL 인증서를 설정함
## 5. nextjs serverless(with aws-cli)
- https://www.serverless.com/blog/serverless-nextjs
- https://www.serverless.com/plugins/serverless-nextjs-plugin
- https://falsy.me/serverless-framework-nextjs-aws-lambda/
---

## 6. github repo + jira, slack, circleci

## 7. circleci
- https://www.serverless.com/blog/ci-cd-workflow-serverless-apps-with-circleci
1. CICD Process Flow
  1. continuous integration
    - commit code -> build -> unit testing -> integration testing
  2. continuous delivery
    - deploy to QA -> acceptance testing
  3. continuous development
    - deploy to PRO

2. CircleCI 계정 설정
  - 가입후 github repository와 연결

3. AWS IAM 사용자 생성
  - https://serverless.com/blog/abcs-of-iam-permissions/
  - AWS 자격 증명으로 CircleCI 구성

4. .circleci/config.yml
  ```yml
  jobs:
    build:
      ...

      steps:
        - checkout

        # Download and cache dependencies
        - restore_cache:
            keys:
              - dependencies-cache-{{ checksum "package.json" }}
              # fallback to using the latest cache if no exact match is found
              - dependencies-cache

        - run:
            name: Install Serverless CLI and dependencies
            command: |
              sudo npm i -g serverless
              npm install

        - run:
            name: Run tests with code coverage
            command: npm test --coverage

        - run:
            name: Deploy application
            command: sls deploy

        - save_cache:
            paths:
              - node_modules
            key: dependencies-cache-{{ checksum "package.json" }}
  ```

5. 고급 배포 패턴 고려
  1. 다중 지역 배포
  2. 패키징 및 배포 분리
  3. 카나리아 배포
  4. 블루/그린 배포

## 8. Git
1. 초기 설정(.gitconfig)
  - git config --global user.name "username"
  - git config --global user.email "mailaddress"
  - git config --local user.name "username"
  - git config --local user.email "mailaddress"
  - git config --global color.ui auto
  - git config --global alias."aliasname" "commandname"
  - git config --global --list
2. 기본 명령어
  - git init
  - git add
    - -u 
  - git commit 
    - -m
    - -am
    - --amend
  - git status
    - -sb
  - git diff
  - git log
    - --oneline
    - --graph
    - --grep 'pattern'
  - git show "commit"
  - git checkout
    - -t
    - .
      - working directory에서 수정한 모든 파일(git add 이전)을 현재 버전으로 되돌리기
    - -- {file}
      - working directory에서 수정한 특정 파일(git add 이전)을 현재 버전으로 되돌리기
    - -b {branch 이름}
      - mater branch에서 새로운 branch를 만들고 갈아탐
  - git reset HEAD -- "file"
    - 특정 버전으로 돌아가기, 버전 이후의 커밋은 사라짐
      - .
        - 현재 버전으로 되돌리기 (add 무효화하기)
      - {commit번호}
        - 특정 버전으로 되돌리나 커밋 이력 삭제, 파일 내용은 유지
      - --hard
        - 파일 내용까지 되돌림
      - --soft
        - 파일 내용을 그대로 유지하면서 staging area에 올림(add 상태)
      - -merge ORIG_HEAD
        - 바로 이전 병합 취소
  - git mv "oldfilename" "newfilename"
  - git rm "file"
  - git clean
3. 원격 조작
  - git clone 'url'
  - git remote add 'name' 'url'
  - git remote
    - update
    - -v
    - show origin
    - set-url
    - update --prune
    - add upstream
  - git checkout 'branch'
  - git fetch 'repo' 'refspec'
    - origin --prune
    - upstream
  - git pull 'repo' 'refspec'
    - 'remote' 'branch'
  - git push 'repo' 'refspec'
  - git push 
    - -u
  - git push --delete 'repo' 'branchname'
  - git push 'repo' 'tagname'
    - -tags
  - git push --delete 'repo' 'tagname'
  - git remote set-url 'name' 'newurl'
  - git remote rename 'old' 'new' 
4. 커밋 조작
  - git commit --amend
  - git rebase -i 'commit' -> git commit --amend -> git rebase --continue
  - git rebase --abort
  - git reflog
  - git reflog 'ref'
  - git reset --hard HEAD~
  - git reset --hard 'commit'
  - git reset --hard ORIG_HEAD
  - git revert 'commit'
    - 특정 버전으로 순서대로 되돌아가기, 커밋 그대로 유지
    - {commit번호}
    - --mainline 숫자
      - 과거 병합 취소, 숫자로 명시된 브랜치 라인을 기준으로 되돌아감
  
  - git cherry-pick 'commit'
5. 브랜치 조작
  - git branch
    - 'branchname'
    - -r
    - -a
    - -d 'branchname'
    - -m 'old' 'new'
  - git checkout 'branch'
  - git checkout -b 'branch' '특정branch'
  - git checkout -t '특정branch'
  - git merge 'branch'
6. 합병
  - git merge
    - --abort
  - git cherry-pick
  - git rebase
7. 태그
  - git tag
    - 'tagname'
    - -a 'tagname'
    - -d 'tagname'
  - git push origin 'tag_version'
8. Stash
  - git stash save
  - git stash list
  - git stash pop
  - git stash drop
  - git stash clear
9. 기타 명령어

## 9. GitFlow
- master, develop, feature, release, hotfix
1. master
  - **정의**
    - master 브랜치에 변경 내역이 생기면 최종 버전인 Tag를 통해 Production에 배포
    - master 브랜치에서 커밋시 자동 빌드, 테스트, deploy
  - **시작 브랜치**
  - **merge 대상**
  - **브랜치 이름 규칙**
    - Jira SmarCommit 연동
      - origin/master/{issue-number}-{production-version}
2. develop
  - **정의**
    - hotfix를 제외한 모든 변경 내역이 출발하는 지점
    - develop 브랜치 코드가 안정화되고 배포할 준비가 되면 master를 통해 배포 버전의 태그를 단다
  - **시작 브랜치**
  - **merge 대상**
  - **브랜치 이름 규칙**
    - Jira SmartCommit 연동
      - develop/{issue-number}-{develop-version}
3. feature
  - **정의**
    - 기능을 개발하는 브랜치
    - 기능이 완성되면 develop 브랜치로 병합
      - git merge --no-ff
      - git merge
  - **시작 브랜치**
    - develop
  - **merge 대상**
    - develop
  - **브랜치 이름 규칙**
    - master, develop, release-, hotfix- 제외
    - Jira SmartCommit 연동
      - feture/{issue-number}-{feature-name}
4. release
  - **정의**
    - 실제 배포할 상태가 된 경우에 생성하는 브랜치
    - QA 하는 곳
  - **시작 브랜치**
    - develop
  - **merge 대상**
    - develop, master
  - **브랜치 이름 규칙**
    - release-*
5. hotfix
  - **정의**
    - 미리 계획되지 않은 브랜치, release 브랜치와 동작방식이 비슷함
    - 배포 이후에 생긴 버그는 즉시 해결해야하기 때문에 문제가 생기면 master 브랜치에 만들어둔 tag로부터 긴급 수정을 위한 브랜치를 생성한다.
  - **시작 브랜치**
    - master
  - **merge 대상**
    - develop, master
  - **브랜치 이름 규칙**
    - hotfix-*
## 10. Jira (with Agile, Scrum)
1. Agile, Scrum
  - **애자일이란?**
    - 전통적 프로젝트 관리 방법인 폭포수 모델, 순차적 개발방법을 대체하는 방법으로 반복적인 일과 경험에 의거한 피드백을 통해 예측 불가능한 일에 대응함.
  - **스크럼이란?**
    - 애자일 개발 과정의 하나로 단순함, 융통성 때문에 가장 인기있는 방법론
    - 경험에 의거한 피드백, 팀의 자가적 관리, 짧은 반복을 통해 적합한 제품 테스트에 중점을 두는 개발방법론
  - **애자일 개발방법론을 써야하는 이유**
    - 반복적인 주기(스프린트)를 거쳐서 마지막에 실행가능한 제품을 발표함
    - 단축된 일의 반복과 제품 기능에 중점을 두기 때문에 애자일 개발방법론은 반복적이고 증가적이라고 표현됨. 
    - 폭포수 모델에서 개발자들은 한번의 기회만으로 프로젝트의 모든 측면을 검토해야함. 반면에 애자일에서는 일정한 주기를 통해 계속적으로 모든 측면을 재검토할 수 있음
    - 이러한 inspect and adapt는 개발 비용과 시간을 크게 줄여줌. 개발자들은 소프트웨어를 개발하는 동시에 필요한 부분을 수집하기 때문에 초반에 정보 과다로 인해 분석하지 못하는 일은 생기지 않음
2. Jira
  - 이슈 트래킹, 프로젝트 관리, 버그 추적을 하는 이슈 관리 소프트웨어
  - Github, Slack, Confluence 등 기타 개발자 도구와 연동 가능
  - **이슈 트래커 장점**
    - 프로젝트 작업 현황 확인 및 스케줄, 우선순위 관리
    - 이슈에 대한 역할과 임무 설정으로 불필요한 커뮤니케이션 비용 감소
    - 히스토리가 남아있어 비슷한 이슈는 나중에 추적 가능함
  - **Issue 단위 작업 절차**
    1. PM이 요구사항을 User Story로 작성
    2. User Story아래에 실제 Task 생성
    3. 각 Task들을 개발자에게 지정하거나 스스로 가지고 가서 작업 진행
  - **Jira - Github 연동 (smart commit)**
    - Jira -> 앱 -> Github for jira 다운 -> Add an Organization -> 원하는 Organization 연동
    - Jira 앱의 Github configuration에서 연동된 organization 확인
    - github에서 organization -> settings -> installed github apps -> jira configure 에서 어떤 repo가 Jira에 연동되었는지 확인 및 관리 가능
    - Jira와 Github 연동시 Smart commits 기능으로 Issue 카드에 자도으로 개발 내용 기록 됨.
    - Jira 프로젝트 생성 -> commit시 Jira Issue Number를 포함해서 commit -> Jira에서 해당 repo 연동 확인 가능
## 11. Slack
  - **Jira 연동**
    - Jira Cloud 추가
      - Apps 에서 Jira Cloud 추가
      - /jira help
    - Jira project 연결
      - /jira connect 
    - Jira Issue 등록
      - /jira create
      - 이슈 등록 후 알림 확인
      - 연결된 링크로 Jira 대시보드 확인
    - Jira Issue 할당
      - 해당 Issue 옵션에서 Assign으로 담당자 할당
    - Jira Issue 상태 변경
      - 해당 Issue 옵션에서 Transition으로 상태 변경
    - Jira Issue 코멘트 
      - 해당 Isuue 옵션에서 Comment으로 댓글 달기
    - Jira에서 Slack 채널별 알림 설정
      - /jira manage
  - **Github 연동**
    - Github App 추가
      - Apps 에서 Github 추가
    - /github help
      - /github subscribe owener/repo commits:all

## 12. CircleCI ( with docker )
1. CICD란
  - 애플리케이션 개발단계를 자동화해서 짧은 주기로 고객에게 제공하는 방법
  - 지속적인 통합(Continuous Integration)
    - 새로운 코드 변경에 대한 지속적인 빌드, 테스트가 되어 공유 리포지토리에 통합
    - Build -> Test -> Merge
  - 지속적인 서비스 제공(Continuous Delivery)
    - 버그 테스트를 거쳐 리포지토리에 자동으로 업로드되어 애플리케이션을 프로덕션 환경으로 배포할 수 있음
  - 지속적인 배포(Continuous Deployment)
    - 리포지토리에서 고객이 사용 가능한 프로덕션 환경까지 자동으로 릴리즈
  - 개발 및 운영팀의 인테그레이션 헬을 해결하기 위한 방법
2. CircleCI 기본 사용법
  - circleci 공식사이트에서 github ID로 로그인 
  - 관리할 프로젝트의 Github repo 선택
  - 루트 위치에 .circleci/config.yml 생성
3. config.yml
  - version
  - orbs
  - jobs
    - docker
    - executor
    - steps
      - checkout
      - run
        - name
        - command
      - restore_cache
      - save_cache
  - workflow
    - version
      - jobs
        - filter
        - requires

## 13. Build ( babel, webpack, next.config.js )
1. babel
  - **Babel이란**
    - Javascript 컴파일러
    1. ES2015+
      - ECMAScript 2015+ 코드를 이전 버전과 호환되는 Javascript 버전으로 변환하는데 사용됨.
    2. JSX
      - @babel/preset-react로 JSX구문을 변환함
    3. TypeScript, Flow
      - Type Annotations를 제거해줌
      - @babel/preset-typescript
    4. 다양한 Plugin
    5. 디버깅
      - 소스맵으로 컴파일 된 코드를 디버깅
  - **기본 사용법**
    - ES2015+ 코드 컴파일
    1. Install Package
      - npm i -D @babel/core @babel/cli @babel-preset-env
      - npm i @babel/polyfill
    2. babel.config.json
      ```json
      {
        "presets": [
          [
            "@babel/env",
            {
              "targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "67",
                "safari": "11.1",
              },
              "useBuiltIns": "usage",
              "corejs": "3.6.4",
            }
          ]
        ]
      }
      ```
    3. cli 명령 실행
      - ./node_modules/.bin/babel src --out-dir lib
      - npx babel src --out-dir lib
  - **babel configure**
    - babel.config.json
    ```json
    {
      "presets": [...],
      "plugins": [...]
    }
    ```
    - .babelrc.json
    - package.json
    - javascript file
  - **plugins**
    - 플러그인을 사용해 코드를 변환함
    1. 다양한 플러그인
      - ES3
      - ES5
      - ES2015
      - ES2016
      - ES2017
      - ES2018
      - Module
      - Experimental
      - Minify
      - React
      - Others
    2. 구문 플러그인
      - 특정 유형의 구문만 분석하도록 허용함
      - .babelrc
      ```json
      {
        "parserOpts": {
          "plugins": ["jsx", "flow"]
        }
      }
      ```
    3. 플러그인 / 사전 설정 경로
      - .babelrc
      ```json
      {
        "plugins": ["babel-plugin-myPlugin"]
      }
      ```
    4. 플러그인 ordering
      - 플러그인은 사전 설정보다 먼저 실행됨
      - 플러그인 순서는 처음부터 끝까지
      - presets 순서는 끝에서 처음
    5. 플러그인 옵션
      - plugins, presets 모두 option을 지정할 수 있음
    6. Custom Plugin
  - **presets**
    1. presets 만들기
    2. preset path
    3. preset shorthand
    4. preset ordering
    5. preset options
2. webpack
  - Javascript 애플리케이션을 위한 정적 모듈 번들러
  - **Entry**
    - 번들할 파일
    - webpack.config.js
    ```javascript
      module.exports = {
        entry: {
          main: './src/app.js',
          vender: './src/vendor.js'
        }
      }
    ```
    - webpack.prod.js
    ```javascript
      module.exports = {
        output: {
          filename: '[name].[contentHash].bundle.js'
        }
      }
    ```
    - webpack.dev.js
    ```javascript
      module.exports = {
        output: {
          filename: '[name].bundle.js'
        }
      }
    ```
  - **Output**
    - 번들된 파일이 저장되는 곳
    - 여러 entry 포인트가 있을수 있으나 output은 하나
    - webpack.config.js
    ```javascript
      module.exports = {
        entry: {
          app: './src/app.js',
          search: './src/search.js'
        },
        output: {
          filename: '[name].js',
          path: __dirname + '/dist',
        }
      }
      // ./dist/app.js, ./dist/search.js
    ```
  - **Loaders**
    - 기본적으로 webpack은 Javascript, JSON 파일만 이해함
    - 로더를 사용해 webpack이 다른 유형의 파일들을 처리할 수 있게 함
    - test 속성 : 변환해야 하는 파일 식별
    - use 속성 : 변환을 수행하는데 사용할 로더
    - webpack-config.js
    ```javascript
      module.exports = {
        module: {
          rules: [
            { test: /\\.css$/, 
              use: [
                //  sass -> css -> style 순으로  
                // [style-loader](/loaders/style-loader)
                { loader: 'style-loader' },
                // [css-loader](/loaders/css-loader)
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                },
                // [sass-loader](/loaders/sass-loader)
                { loader: 'sass-loader' }
              ] 
              { test: /\\.ts$/, use: 'ts-loader' }
          ]
        },
      }
    ```
  - **Plugins**
    - 로더는 특정 유형의 모듈을 변환하는데 사용
    - 플러그인은 번들 최적화, 자산 관리 및 환경 변수 삽입과 같은 광범위한 작업 수행
    - webpack.config.js
    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
    const webpack = require('webpack'); //to access built-in plugins
    const path = require('path');

    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        filename: 'my-first-webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
          }
        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };
    ```
  - **Mode**
    - mode 값을 development, production, none으로 설정해 각 환경에 해당하는 웹팩의 내장 최적화를 활성화
    - 기본값은 production
  - **Browser Compatibility**
    - ES5 준수
    - IE8이하는 지원하지 않음
    - 이전 브라우저를 지원하려면 폴리필 사용
  - **Environment**
    - nodejs 8.x 이상
  - **Module**
    - 웹팩 모듈
      - ES2015의 import
      - CommonJS의 require
      - AMD의 define, require
      - css/sass/less 파일 내부의 @import
      - 스타일시트의 url()
      - HTML의 img 태그의 src 속성
    - 지원되는 모듈 유형
      - ECMAScript 모듈
      - CommomJS 모듈
      - AMD 모듈
      - asset 모듈
      - WebAssembly 모듈
      - 이외에 로더를 통해 다양한 언어와 전처리기로 작성된 모듈을 지원함
        - CoffeScript, TypeScript, ESNext(Babel), Sass, Less ...
  - **Target**
    - Javascript는 서버, 브라우저에 작성될 수 있으므로 여러 배포 대상을 제공함.
    - webpack.config.js
    ```javascript
    const path = require('path');
    const serverConfig = {
      target: 'node',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
      }
      //…
    };

    const clientConfig = {
      target: 'web', // <=== can be omitted as default is 'web'
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.js'
      }
      //…
    };

    module.exports = [ serverConfig, clientConfig ];
    ```
  - **webpack bundle analyzer**
    - 번들링되는 모듈을 분석해 차지하는 용량을 시각적으로 표현해줌.
    - npm i -D webpack-bundle-analyzer
    - webpack.config.js
    ```javascript
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
    module.exports = {
      plugins: [
        new BundleAnalyzerPlugin()
      ]
    }
    ```
3. next.config.js
  - 루트 디렉토리에 위치
  - Nextjs 서버 및 빌드 단계에서 사용되며 브라우저 빌드에는 포함되지 않음
  - **환경 변수**
  - **기본 경로**
  - **재작성**
  - **리디렉션**
  - **Custom Headers**
  - **Custom Page Extensions**
  - **Asset Prefix로 CDN 지원**
  - **Build Target**
  - **Custom Webpack Config**
  - **Compression**
  - **정적 최적화 Indicator**
  - **Runtime 구성**
  - **x-powered-by 비활성화**
  - **ETag 생성 비활성화**
  - **사용자 지정 빌드 디렉터리 설정**
  - **빌드 ID 구성**
  - **onDemandEntries 구성**
  - **TypeScript 오류 무시**
  - **exportPathMap**
  - **Trailing Slash**
  - **React-Strict-Mode**

--- 

## 14. Testing(eslint , jest, react-testing-library, cypress)
1. ESLint
  - **ESLint란**
    - JavaScript, JSX의 정적 분석 도구로 오픈 소스 프로젝트
    - 코드를 분석해 문법 오류, 안티 패턴을 찾아 일관된 코드 스타일로 작성하도록 도와줌
    - Airbnb, Google Style Guide를 주로 사용함
    - Espree를 사용해 자바스크립트 구문 분석
    - AST를 사용해 코드의 패턴을 평가함
  - **기본 사용법**
    1. 설치 및 사용
      - npm i -D eslint
      - npx eslint file.js
    2. 구성
      - eslint --init 으로 .eslintrc.{js,yml,json} 파일 생성
      ```json
      {
          "rules": {
              "semi": ["error", "always"],
              "quotes": ["error", "double"]
          }
      }
      ```
      - semi, quotes는 규칙 이름
      - 첫번째 값은 규칙의 오류 수준
        - off or 0 : 해제
        - warn or 1 : 경고
        - error or 2 : 오류
  - **ESLint Configuration**
    1. parser options
      - 지원하려는 Javascript 언어 옵션 지정
      - 기본적으로 ECMAScript5 이며, 옵션을 사용해 JSX, 다른 ECMAScript 버전에 대한 지원을 활성화할 수 있음.
      - .eslintrc.json
      ```json
      {
        "parserOptions": {
          "ecmaVersion": 6,
          "sourceType": "module",
          "ecmaFeatures": {
              "jsx": true
          }
        },
      }
      ```
    2. parser 지정
      - 기본적으로 Espress를 파서로 사용
      - .eslintrc.json
      ```json
      {
        "parser":"esprima",
      }
      ```
    3. processor
      - .eslintrc.json
      ```json
      {
          "plugins": ["a-plugin"],
          "overrides": [
              {
                  "files": ["*.md"],
                  "processor": "a-plugin/markdown"
              },
              {
                  "files": ["**/*.md/*.js"],
                  "rules": {
                      "strict": "off"
                  }
              }
          ]
      }
      ```
    4. env
      - 미리 정의된 전역변수 정의
      - 한번에 둘 이상의 환경을 정의할 수 있음
      - 구성파일이나 Javascript 파일 내 주석을 사용해 환경 지정
      - .eslintrc.json
      ```json
      {
        "env":{
          "browser": true,
          "node": true
        }
      }
      ```
    5. globals
      - 전역 변수 지정
      - Javascript 파일 내 주석 이나 구성 파일에 지정
      - .eslintrc.json
      ```json
      {
          "globals": {
              "var1": "writable",
              "var2": "readonly"
          }
      }
      ```
    6. plugins
      - 타사 플러그인 사용
      - eslint-plugin- 생략가능
      - .eslintrc.json
      ```json
      {
          "plugins": [
        "jquery",   // eslint-plugin-jquery
        "@foo/foo", // @foo/eslint-plugin-foo
        "@bar"      // @bar/eslint-plugin
        ],
        "extends": [
            "plugin:@foo/foo/recommended",
            "plugin:@bar/recommended"
        ],
        "rules": {
            "jquery/a-rule": "error",
            "@foo/foo/some-rule": "error",
            "@bar/another-rule": "error"
        },
        "env": {
            "jquery/jquery": true,
            "@foo/foo/env-foo": true,
            "@bar/env-bar": true,
        }
      }
      ```
    7. rules
    8. 인라인 주석으로 규칙 비활성화
    9. 파일 그룹에 규칙 비활성화
    10. extends
    11. Glob 패턴
    12. .eslintignore
  - **Rules**
    1. Possible Errors
    2. Best Practices
    3. Strict Mode
    4. Variables
    5. Stylistic Isuues
    6. ECMAScript6
  - **Formatters**
    - Linting 결과를 제어하기 위해 여러 내장 포맷터와 타사 포맷터를 지원함
    - --format or -f 플래그를 사용해 포맷터 지정
    1. 내장 포맷터 옵션
  - **Integrations(with VSC, Webpack, Typescript, React)**
  - **Sharealbe Configs**
    - https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/
2. jest
  - **Matchers**
    1. Common
      - expect
      - toBe
      - toEqual
    2. Truthiness
      - toBeNull
      - toBeUndefined
      - toBeDefined
      - toBeTruthy
      - toBeFalsy
    3. Numbers
      - toBeGreaterThan
      - toBeGreaterThanOrEqual
      - toBeLessThan
      - toBeLessThanOrEqual
      - toBe
      - toEqual
      - toBeCloseTo
    4. String
      - toMatch
    5. Arrays and iterables
      - toContain
    6. Exceptions
      - toThrow
  - **Async**
    1. Callbacks
    2. Promises
    3. Async/Await
  - **Setup and Teardown**
    1. 반복 설정
      - beforeEach
      - afterEach
    2. 일회성 설정
      - beforeAll
      - afterAll
    3. 범위 지정  
      - 기본적으로 before, after는 파일의 모든 테스트에 적용
      - describe를 사용해 테스트를 그룹화 할 수 있으며 내부에서 before, after를 사용해 해당 블록 내의 테스트에만 적용되게 할 수 있음.
      ```javascript
      beforeAll(() => console.log('1 - beforeAll'));
      afterAll(() => console.log('1 - afterAll'));
      beforeEach(() => console.log('1 - beforeEach'));
      afterEach(() => console.log('1 - afterEach'));
      test('', () => console.log('1 - test'));
      describe('Scoped / Nested block', () => {
        beforeAll(() => console.log('2 - beforeAll'));
        afterAll(() => console.log('2 - afterAll'));
        beforeEach(() => console.log('2 - beforeEach'));
        afterEach(() => console.log('2 - afterEach'));
        test('', () => console.log('2 - test'));
      });
      ```
    4. test.only
      - 하나의 테스트만 실행하려면 test 대신 test.only 사용
  - **Mock Functions**
    1. mock function 사용
      - jest.fn
    2. .mock 속성
    3. mock return value
      - .mockReturnValueOnce
      - .mockReturnValue
    4. mock module
    5. mock implement
      - .mockImplementation
    6. mock name
      - .mockName
    7. Custom Matchers
  - **snapshot**
3. react-testing-library
  - **Queries**
    1. Variants
      - getBy
      - getAllBy
      - queryBy
      - queryAllBy
      - findBy
      - findAllBy
    2. Queries
      - ByLabelText
      - ByPlaceholderText
      - ByText
      - ByAltText
      - ByTitle
      - ByDisplayValue
      - ByRole
      - ByTestId
      - TextMatch
    3. Options
      - screen
      - screen.debug
  - **Firing Events**
    - fireEvent
    - fireEvent.eventName
    - createEvent.eventName
  - **Async Utilities**
    - waitFor
    - waitForElementToBeRemoved
  - **Helpers**
  - **API**
    1. render
      - **render function**
      ```javascript
      function render(ui, options?): RenderResult
      ```
      - **render options**
        - container
        - baseElement
        - hydrate
        - wrapper
        - queries
      - **render result**
        - ...queries
        - container
        - baseElement
        - debug
        - rerender
        - unmount
        - asFragment
    2. cleanup
      - render로 마운트된 React트리 마운트 해제
    3. act
4. cypress
  - **Getting Started**
    1. 설치 및 실행
      - 설치
        - npm i -D cypress
      - 실행
        - ./node_modules/.bin/cypress open
        - npx cypress open
        - package.json
          ```json
          {
            "scripts": {
              "cypress:open": "cypress open"
            }
          }
          ```
        - npm run cypress:open
    2. 첫번째 테스트
      - test 파일 생성
        - /cypress/integration/1.sample_test.js
      - 디버깅  
        - 시간 여행
        - 스냅샷
        - 에러
        - 페이지 이벤트
        - 콘솔
    3. App 테스팅
      - /cypress/integration/2.home_page_spec.js
        - Home Page
        - Login Page
        - TodoApp Page
      - cypress.json에 baseUrl 추가하기
        - cy.visit, cy.request에 사용됨.
      - cy.exec() : 시스템 명령 실행
      - cy.task() : Node에서 코드를 실행하려면 pluginsFile
      - cy.request() : HTTP 요청을 하기 위해
  - **Core Concepts**
    1. Introduction
      - /cypress/integration/3.introduction.js
        - create a new todo
      - **Querying Elements**
        1. Cypress는 jQuery를 번들로 제공하고 많은 DOM 탐색 방법을 제공
        2. DOM을 찾지 못했을때는 작동 방식이 Cypress와 Jquery는 서로 다름
          - Cypress에서 DOM을 찾지 못할 경우 요소를 발견하거나 설정된 시간 초과에 도달할때까지 쿼리를 자동으로 재시도함
          ```javascript
          cy
            .get('#element')
            .then(($myElement) => {
              doSomething($myElement)
            })
          ```
        3. cy.contains()로 텍스트 컨텐츠로 DOM 찾기
          ```javascript
          cy.contains('New Todo')
          cy.get('.main').contains('New Todo')
          ```
        4. Element가 누락된 경우
          - Cypress는 웹의 비동기 특성을 고려해 요소가 처음 발견 될때 즉시 실패하지 않음
          - Cypress는 timeout 옵션으로 앱이 수행중인 작업을 완료할 수 있는 시간을 제공
          - 기본 시간 초과는 4초
          ```javascript
          cy.get('.my-slow-selector', {timeout: 10000})
          ```
          - defaultCommandTimeout으로 전역적으로 시간제한 설정 가능
      - **Chains of Commands**
        - Cypress는 Chain이 종료되거나 오류가 발생할때까지 Promise 체인을 관리함
        1. Element와 상호작용
          - blur, focus, clear, check, uncheck, select, dblclick, rightclick
        2. Element에 대한 Asserting
          - assertion을 사용해 요소가 표시되거나 특정 속성, CSS 클래스 또는 상태가 있는지 확인
          - Cypress는 요소가 상태에 도달할 때까지 자동으로 기다리거나 어설션이 통과되지 않으면 테스트에 실패함
          ```javascript
          cy.get(':checkbox').should('be.disabled')
          cy.get('form').should('have.class', 'form-horizontal')
          cy.get('input').should('not.have.value', 'US')
          ```
        3. Subject 관리
          - promise chain이 없는 것도 있음
          ```javascript
          cy.clearCookies()
          ```
          - chain에 .then을 추가해서 조작할 수 있음.
          ```javascript
          cy.get('#some-link')
            .then(($myElement) => {
              const href = $myElement.prop('href')
              return href.replace(/(#.*)/, '')
            })
            .then((href) => {
              //
            })
          ```
          - aliases로 이전 subject 참조
          ```javascript
          cy
            .get('.my-selector')
            .as('myElement')
            .click()

          cy
            .get('@myElement')
            .click()
          ```
        4. Cypress는 비동기적
        5. 직렬 실행 Commands
        6. Promise Command
        7. Promise가 아닌 Command
      - **Assertions**
        1. Asserting in English
        2. When To Assert?
        3. 기본 Assertions
          - visit, request, contains, get, find, type, click, its
        4. Assertions 목록
        5. Assertions 작성 방법
        6. Implicit Subjects
          - should, and
        7. Explicit Subjects
          - expect
      - **Timeouts**
        1. 제한 시간 적용
          ```javascript
          cy
            .get('.mobile-nav', {timeout: 10000})
            .should('be.visible')
            .and('contain', 'Home')
          ```
        2. 기본값
          - visit : 60000ms
          - exec : 60000ms
          - wait : 30000ms
          - DOM 기반 명령을 포함한 대부분의 다른 명령은 기본값으로 4000ms
    2. Test 구성
      - **폴더구조**
        1. 폴더 구조
          ```json
          /cypress
            /fixtures
              - example.json
            /integration
              /examples
                - actions.spec.js
                ...
            /plugins
              - index.js
            /support
              - commands.js
              - index.js
          ```
        2. Fixture Files
          - cypress/fixtures
          - cy.fixture()로 사용하고 네트워크 요청을 stubbing 할때 자주 사용
        3. Test Files
          - cypress/integration
          - .js, .jsx, .coffee, .cjsx
        4. Plugin Files
          - cypress/plugins/index.js
        5. Support File
          - cypress/support/index.js
      - **테스트 작성**
        - cypress는 Mocha, Chai를 기반으로 함
        1. 테스트 구조
          - mocha에서 사용하는 describe, context, it, specify 사용
        2. Hooks
          - mocha에서 사용하는 beforeEach, before, beforeEach, afterEach, after
        3. 테스트 제외 및 포함
          - .only
          - .sip
        4. 테스트 구성
        5. 동적으로 테스트 생성
        6. 어설션 스타일
      - **테스트 실행**
        1. 단일 사양 파일 실행
        2. 모든 사양 실행
        3. 필터링 된 사양 실행
      - **테스트 보기**
        1. 보이는 것
          - cypress.json
          - cypress.env.json
          - cypress/integration/default
          - cypress/support/default
          - cypress/plugins/default
        2. 보지 않는 것
          - application code
          - node_modules
          - cypress/fixtures/
        3. 구성
          - 파일 감시 비활성화
            - watchForFileChanges를 false로 설정
          - Cypress에서 파일 감시 동작은 cypress-webpack-preprocessor에서 담당
    3. 재시도 기능
      - **Commands vs Assertions**
        ```javascript
        it('creates 2 items', () => {
          cy.visit('/')                       // command
          cy.focused()                        // command
            .should('have.class', 'new-todo') // assertion

          cy.get('.new-todo')                 // command
            .type('todo A{enter}')            // command
            .type('todo B{enter}')            // command

          cy.get('.todo-list li')             // command
            .should('have.length', 2)         // assertion
        })
        ```
      - **Multiple Assertions**
        ```javascript
        cy.get('.todo-list li')     // command
          .should('have.length', 2) // assertion
          .and(($li) => {
            // 2 more assertions
            expect($li.get(0).textContent, 'first item').to.equal('todo a')
            expect($li.get(1).textContent, 'second item').to.equal('todo B')
        })
        ```
      - **모든 Command가 재시도 되는 것은 아님**
        1. 일부 명령이 재시도되지 않는 이유
          - 테스트중인 애플리케이션의 상태를 잠재적으로 변경할 수 있는 경우 명령이 재시도 되지 않음
          - Cypress는 .click() 명령을 재시도 하지 않음. 응용프로그램에서 무언가를 변경할 수 있기 때문
      - **내장 Assertions**
        - .eq() 명령은 이전에 생성된 요소 목록에서 주어진 인덱스를 가진 요소를 찾을때까지 첨부된 어설션없이도 재시도됨
        ```javascript
        cy.get('.todo-list li')
          .should('have.length', 2)
          .eq(3)
        ```
      - **Timeout**
        - 기본적으로 재시도는 최대 4초
        - defaultCommandTimeout 설정으로 바꿀수 있음
        1. 재시도 시간 늘리기
          - cypress run --config defaultCommandTimeout=10000
            - 명령시간을 전역으로 변경하는 것은 좋지 않음
          - 개별 명령의 옵션에 timeout을 추가하는 것이 좋음
            ```javascript
            cy.get('.mobile-nav', {timeout: 10000})
              .should('be.visible')
              .and('contain', 'Home')
            ```
        2. 재시도 비활성화
          - timeout을 0으로 설정
      - **마지막 명령만 재시도됨**
        1. 쿼리 병합
        2. 대체 명령 및 어설션
        3. 콜백과 함께 .should() 사용
        4. 별칭 사용
    4. 요소와 상호 작용
      - **실행 가능성**
        - click, dblclick, rightclick, type, clear, check, uncheck, select, trigger
        1. Visibility
        2. Disability
        3. Detached
        4. Readonly
        5. Animations
        6. Covering
        7. Scrolling
        8. Coordinates
      - **디버깅**
      - **Forcing**
    5. 변수 및 Aliases
      - **Return Values**
        1. Closures
        2. Debugging
        3. Variables
      - **Aliases**
        1. Sharing Context
        2. Elements
        3. Routes
        4. Requests
    6. 조건부 테스트
      - **정의**
      - **문제**
        1. DOM이 불안정함
      - **상황**
        1. 서버측 렌더링
        2. 클라이언트 측 렌더링
      - **전략**
        1. A/B campaign
        2. Welcome wizard
        3. Element existence
        4. Dynamic text
      - **오류 복구**
    7. 테스트 러너
      - **Overview**
      - **Command Log**
        1. IDE에서 파일 열기
        2. 명령에 마우스 오버
        3. 명령 클릭
      - **Errors**
      - **Instrument Panel**
        1. Routes
        2. Stubs
        3. Spies
      - **테스트중인 애플리케이션**
      - **Selector Playground**
        1. 고유성
        2. 모범 사례
        3. 선택기 찾기
        4. 실험 실행
      - **Keyboard Shortcuts**
  - **Guides**
    1. Command Line
      - **명령 실행 방법**
        - $(npm bin)/cypress run
        - ./node_modules/.bin/cypress run
        - npx cypress run
        - package.json
          ```json
          {
            "scripts": {
              "cy:run": "cypress run"
            }
          }
          ```
        - 단일 파일에서 테스트를 실행하고 대시보드에 결과를 기록
          - npm run cy:run -- --record --spec "cypress/integration/my-spec.js"
          - npx cypress run --record --spec "cypress/integration/my-spec.js"
      - **명령**
        1. run
          - 기본적으로 Electron 브라우저에서 모든 테스트를 헤드리스로 실행
          - cypress run options
            - cypress run --browser chrome
              - chrome, chromium, dege, electron, firefox
          - 종료코드
            - Cypress가 테스트 실행을 마치면 종료됨
            - 실패한 테스트가 없는 경우 종료코드는 0
            - 실패한 테스트가 있는 경우 종료코드는 실패한 테스트 수와 일치
            - 어떤 이유로 Cypress를 실행할 수 없는 경우 종료 코드는 1
        2. open
          - Cypress Test Runner를 염
          - cypress open options
        3. info
          - Cypress 및 현재 환경에 대한 정보
          - cypress info
        4. verify
          - Cypress 설치 확인 및 실행 가능 확인
          - cypress verify
        5. version
          - cypress version
        6. cache command
          - 전역 Cypress 캐시 관리, Cypress 캐시는 전역 여부에 관계없이 컴퓨터 전체의 모든 Cypress 설치에 적용
      - **디버깅 명령**
        1. 디버그 로그 활성화
          - windows
            - set DEBUG=cypress:*
            - cypress run
    2. Module API
      - Node.js를 통해 Cypress 실행
        - 포함된 스크린샷 이미지와 함께 실패한 테스트에 대한 알림 보내기
        - 실패한 단일 사양 파일 다시 실행
        - 다른 빌드 또는 스크립트 시작
      - **cypress.run()**
        1. Options
        2. Example
        3. Results
        4. Handling errors
      - **cypress.open()**
        1. Options
        2. Example
      - **cypress.cli**
        1. parseRunArguments()
    3. Debugging
      - **debugger 사용하기**
      - **테스트 명령을 통한 단계**
      - **개발자 도구 사용**
      - **오류**
      - **flake 디버깅**
      - **Log Cypress events**
      - **테스트 외부에서 Cypress 명령 실행**
      - **Cypress fiddle**
      - **Cypress 문제해결**
    4. Network Requests
      - **Testing 전략**
        1. server responses
        2. stub responses
      - **Stubbing**
      - **Requests**
      - **Routing**
      - **Fixtures**
        1. Organizing
      - **Waiting**
        1. Flake
        2. Failures
        3. Assertions
    5. Test Retries
      - **소개**
      - **작동 원리**
      - **Test 재시도 구성**
      - **Screenshots**
      - **Dashboard**
      - **FAQs**
    6. Continuous Integration
    7. Parallelization
      - **Overview**
      - **test suite 분할**
      - **병렬화 켜기**
      - **CI 병렬화 상호 작용**
      - **Balance 전략**
      - **Example**
      - **test runs 그룹화**
      - **Cross Browser Testing**
      - **병렬화 또는 그룹화를 위해 CI 머신 연결**
      - **실행 완료 지연**
      - **대시보드에서 병렬화 및 그룹 시각화**
    8. Environment Variables
    9. Stubs, Spies, Clocks
      - **Capabilities**
      - **Libraries and Tools**
      - **일반적인 시나리오**
        1. Stubs
        2. Spies
        3. Clock
        4. Assertions
      - **통합 및 확장**
    10. Screenshots and Videos
      - **Screenshots**
      - **Videos**
        1. Video encoding
      - **Now What?**
        1. 팀과 공유
        2. 시각적 회귀 테스트/스크린 샷 비교
    11. Launching Browsers
      - **브라우저**
        1. Electron
        2. Chrome
        3. Firefox
        4. path로 시작
        5. 사용 가능한 브라우저 사용자 지정
        6. 지원되지 않는 브라우저
      - **브라우저 환경**
        1. 브라우저 시작
        2. Cypress 프로필
        3. Disabled Barriers
      - **브라우저 아이콘**
    12. Cross Browser Testing
      - **지속적인 통합 전략**
        1. 주기적 기준..
        2. 프로덕션 배포
        3. 테스트의 하위 집합
        4. 브라우저별 병렬화
        5. 브라우저로 특정 테스트 실행
    13. Web Security
      - **한계**
        1. 테스트당 동일한 superdomain
        2. Cross-origin iframes
        3. 안전하지 않은 Content
        4. 테스트당 동일한 port
      - **일반적인 해결 방법**
        1. 외부 탐색
        2. 양식 제출 리디렉션
        3. 자바스크립트 리디렉션
      - **웹 보안 비활성화**
        1. chromeWebSecurity를 false로 설정
  - **Dashboard**


--- 

## 15. Deploy ( serverless, AWS )
1. Nextjs serverless
  - **serverless-next.js 원리**
    - 추가 구성 필요하지 않음
    - next.js 기능 제공
      1. server-side rendered pages
        - serverless-next.js는 페이지를 Lambda@Edge에 배포
      2. API Routes
        - 페이지와 동일하게 API 백엔드도 Lambda@Edge에 배포됨
      3. Dynamic Pages / Route segments
        - 매개변수화된 경로를 위한 내장 라우팅 시스템 도입.
        - serverless-next.js는 동적 경로와 호환되는 경량 라우터를 구현함
      4. Automatic pre-rendering
        - SSR 페이지가 아닌 페이지는 빌드시 HTML로 컴파일됨. 
        - serverless-next.js는 이를 S3에 배포
        - CloudFront의 Lambda@Edge는 S3에 대한 정적 페이지에 대한 요청 전달을 처리하고 캐시화. 
      5. Client assets
        - .webpack chunk, css 파일 등과 같이 next에서 생성된 빌드 파일은 S3에 업로드됨.
        - _next/*에 대한 모든 요청이 S3의 CloudFront에서 제공되므로 Lambda@Edge는 호출할 필요가 없음
      6. User static / public folders
        - 정적 폴더 이미지, 공용 폴더의 루트 수준 리소스 등은 S3에 업로드 됨
        - CloudFront는 S3에서 이러한 assets을 제공
    - 빠른 배포
  - **Architecture**
    - CloudFront에서 세가지 캐시 동작 생성
      1. Build assets(_next/*) -> S3의 /_next
      2. User assets(static/*) -> S3의 /static
      3. Lambda와 연결 된 Page & API Routes -> SSR 페이지, static 페이지, public resources
    - CloudFront는 배포당 25개만 허용하므로 경로당 하나의 캐시동작은 좋지 않음.
  - **serverless nextjs**
    - serverless.yml
      ```yml
      myApp:
        component: serverless-next.js
      ```
    - npx serverless
    - npx serverless remove
  - **serverless domain**
    - serverless-next.js는 도메인을 CloudFront 배포와 연결하고 Route53에서 하위 도메인을 생성해 AWS ACM을 사용해 SSL 인증서를 설정함.
    - serverless.yml
      ```yml
      myApp:
        component: serverless-next.js
        inputs:
          domain: ["www", "example.com"]
      ```
  - **serverless components**
    - serverless-next.js
      - @serverless/aws-s3
      - @serverless/aws-cloudfront
      - @serverless/aws-lambda
      - @serverless/domain

2. serverless best practices
  - **보안**
    1. 올바른 비밀 처리
      - 소스 제어 에서 비밀 유지
      - 비밀에 대한 엑세스 제한(최소 권한 원칙)
      - 서로 다른 애플리케이션 단계에 대해 별도의 비밀 사용
      - 다양한 서비스, AWS 계정 및 애플리케이션 단계에서 암호를 구성할 수 있도록 매개 변수가 추가 됨.
      - Safeguard 정책을 사용해 .NET Framework에서 환경 변수로 설정된 일반 텍스트 비밀이 있을때마다 서비스 배포를 차단할 수 있음 
    2. 허용되는 IAM 정책 제한
      - 애플리케이션에 부여하는 권한의 범위를 제한
      - IAM 정책을 생성할때마다 해당 역할을 운영에 필요한 최소 권한으로 제한. 
      - 정책 정의에서 와일드카드 사용을 줄여야 함
      - Safeguard 정책을 사용해 IAM 권한에 와일드카드가 포함된 배포를 차단할 수도 있음.
    3. 배포 시간 제한
      - 해당 기간 동안 배포를 잠글 수 있음
      - Safeguard 사용
  - **일관된 규칙**
    1. 단계
      - 프로덕션(--stage prod), 개발/테스트(dev)를 위한 별도의 단계를 갖는 것
      - 단계별 구성 항목
        - 배포되는 AWS 계정 또는 리전 단계
        - 배포에 대해 평가되는 보호 장치
        - 사용되는 매개 변수 및 비밀
      - Safeguard를 사용해 dev 단계 배포에서 프로덕션 AWS 계정에 이르기까지 다양한 작업을 수행하거나 프로덕션 API 키가 항상 프로덕션 배포와 함계 번들로 제공되도록 할 수 있음.
    2. 허용 지역
      - 지리적으로 분산된 팀에서 작업할때 각 개발자의 AWS 리전이 동일하지 않을 수 있음
      - 개발자가 필요에 맞는 단일 지역, 지역의 하위 집합을 사용하도록 요구
      - 배포시 서비스가 특정 지역, 지정한 지역 목록에만 배포되도록 함
    3. 함수 이름 및 설명
      - 모든 Lambda 함수 이름에 serviceName-stage-functionName을 포함하는 규칙 사용.
      - Safeguard를 사용해 이름 지정 규칙 적용 가능.
  - https://www.datree.io/resources/serverless-best-practices

3. serverless-stack.com
  1. Introduction
    - **serverless란**
      - 전통적인 서버 문제점
        1. 요청을 처리하지 않는 경우에도 서버 유지에 비용 발생
        2. 서버 및 모든 리소스의 가동 시간 및 유지 관리 담당
        3. 서버에 적절한 보안 업데이트를 적용할 책임
        4. 사용량이 늘어나면 서버 확장도 관리, 사용량이 많지 않은 경우 서버 축소 관리
        5. 개발팀과 인프라팀의 커뮤니케이션 비용
      - serverless computing
        - serverless는 클라우드 공급자가 리소르르 동적으로 할당해 코드를 실행하는 실행 모델, FaaS
        - 코드를 실행하는데 사용된 리소스의 양에 대해서만 비용 청구
        - 코드는 일반적으로 http 요청, db 이벤트, 큐잉 서비스, 모니터링 경고, 파일 업로드, 예약 된 이벤트(cron 작업)등 다양한 이벤트에 의해 트리거 될 수 있는 상태 비 저장 컨테이너 내에서 실행됨 
        - AWS Lambda, Azure function, Cloud function
      - Microservices
        - 서버리스 환경에서는 모노리스 보다 마이크로 서비스 아키텍처를 채택해야 함.
        - 단일 함수 내에서 전체 애플리케이션을 모노리스로 실행하고 라우팅을 직접 처리해 이 문제를 해결할 수 있음
        - 함수의 크기를 줄이는 것이 더 낫기 때문에 권장되지 않음
      - Stateless Functions
        - 일반적으로 상태 비 저장 컨테이너 내에서 실행됨
        - 이벤트가 완료된 후 오랫동안 실행되거나 이전 실행 컨텍스트를 사용해 요청을 처리하는 코드를 애플리케이션 서버에서 실행할 수 없음. 매번 새로운 컨테이너에서 함수가 호출된다고 가정해야 함.
      - Cold start
        - 함수가 이벤트에 응답하기 위해 요청시 실행되는 컨테이너 내에서 실행되기 때문에 이와 관련된 지연시간을 Cold Start라고 함
        - 함수 실행이 완료된 후 컨테이너가 잠시동안 보관될 수 있음. 이 시간 동안 다른 이벤트가 트리거되면 훨씬 더 빠르게 응답하며 이를 일반적으로 Warm Start라고 함.
        - AWS Lambda에서는 수백 밀리 초에서 몇 초 사이의 범위를 가질 수 있음. 사용된 런타임, 함수 크기 및 해당 클라우드 공급자에 따라 달라 질 수 있음
        - 함수 최적화 외에도 별도의 예약된 함수와 같은 트릭을 사용해 몇분 마다 함수를 호출해 Warm하게 유지할 수 있음. 이를 위해 serverless framework에서는 plugin을 제공함.
    - **AWS Lambda란**
      1. Lambda 사양
        - 지원하는 런타임
          - Node.js, Java, Python, .Net Core ...
        - 각 함수는 64비트 Amazon Linux AMI가 있는 컨테이너 내에서 실행됨.
        - 내부 실행 환경
          - 메모리 : 128MB - 3008MB, 64MB씩 증가
          - 임시 디스크 공간 : 512MB
          - 최대 실행 시간 : 900초
          - 압축된 패키지 크기 : 50MB
          - 압축되지 않은 패키지 크기 : 250MB
        - CPU를 직접 제어할 수 없음, 메모리를 늘리면 CPU도 늘어남
        - 임시 디스크 공간은 /tmp 디렉터리 형식으로 사용할 수 있음. 후속 호출에서는 이 공간에 액세스 할 수 없으므로 임시 저장소로만 이 공간을 사용할 수 있음
        - 실행시간은 최대 900초 or 15분 동안 실행됨. Lambda는 장기 실행 프로세스를 위한 것은 아님
        - 패키지 크기는 함수를 실행하는 데 필요한 모든 코드. node_modules/
      2. Lambda 함수
        ```javascript
        export.myHandler = function(event, context, callback) {
          // Do stuff
          callback(Error error, Object result);
        };
        ```
        - myHandler는 Lambda 함수 이름
        - event 객체는 람다를 트리거한 이벤트에 대한 모든 정보가 포함되어 있음, HTTP 요청의 경우 특정 HTTP 요청에 대한 정보가 됨.
        - context는 람다 함수에서 실행되는 런타임에 대한 정보를 포함
        - callback으로 HTTP 응답을 함
      3. Packaging Functions
        - Lambda 함수를 패키징해 AWS로 보내야함
        - 일반적으로 함수 및 모든 종속성을 압축하고 S3 버킷에 업로드하는 프로세스
        - 특정 이벤트가 발생할때 이 패키지를 사용하고 싶다고 AWS에 알림
        - 이 프로세스를 지원하기 위해 serverless framework를 사용
      4. Execution Model
        - 함수를 실행하는 컨테이너는 AWS에서 관리함, 이벤트가 발생하면 표시되고 사용하지 않으면 꺼짐.
      5. Stateless Functions
        - Lambda 함수가 이벤트에 의해 트리거 될 때마다 완전히 새로운 환경에서 호출됨. 이전 이벤트의 실행 컨텍스트에 액세스할 수 없음.
        - 최적화로 인해 실제 Lambda 함수는 컨테이너 인스턴스화 당 한번만 호출됨. 
      6. Pricing
        - 함수를 실행하는데 걸리는 시간에 대해서만 청구됨. 실행을 시작한 시작부터 반환하거나 종료할때까지 계산됨. 가장 가까운 100ms로 반올림됨.
        - Lambda 프리티어에는 매월 1백만개의 무료 요청과 매월 400,000GB 초의 컴퓨팅 시간이 포함됨. GB초는 Lambda 함수의 메모리 사용량을 기반으로 함.
    - **serverless app을 만드는 이유**
      1. 낮은 유지보수
      2. 저렴한 비용
      3. 손쉬운 확장
---
  2. AWS 계정 설정
    - **AWS 계정 생성**
      - AWS 홈페이지에서 무료 계정 생성
    - **IAM 사용자 생성**
      - AWS Console -> IAM -> Users -> Add User -> User name 입력 및 Programmatic access 선택 -> AdministratorAccess 정책 선택 -> Create User
        - Access key ID 및 Secret access key 따로 보관해두기
      1. IAM이란?
        - IAM 사용자란?
        - IAM 정책이란?
        - IAM 역할이란?
        - IAM 그룹이란?
      2. ARN이란?
    - **AWS CLI 구성**
      - AWS CLI 설치
        - npm i -g awscli
      - AWS CLI에 액세스 키 추가
        - aws configure
---
  3. serverless backend 셋업
    - **DynamoDB 테이블 생성**
      1. DynamoDB란
        - NoSQL 데이터베이스
      2. 테이블 생성
        - AWS Console -> DynamoDB -> Create Table -> Table name, Primary key 입력 -> Use default settings 해제 -> Provisioned 대신 On-demand(요청당 지불) 선택 -> Create
        - 프로덕션에서 사용할 경우 백업도 설정 
    - **파일 업로드를 위한 S3 버킷 생성**
      1. 버킷 생성
        - AWS Console -> S3 -> Create bucket -> Bucket name, Region 입력 -> Create bucket
      2. CORS 활성화
        - Permissions -> CORS configuration의 편집기에서 CORS 구성 저장 
    - **Cognito 사용자 poll 생성**
      1. User poll 생성
        - AWS Console -> Cognito -> Manage your User Pools -> Create a User Pool -> Pool name 입력 및 Review defaults -> Username attributes -> Email address or phone number 선택 및 Allow email addresses 선택 -> Create pool
          - Pool Id, Pool ARN 따로 보관
      2. App Client 생성
        - App clients -> Add and app client -> App client name 입력 및 Generate client secret 헤제, 로그인 서버 기반 인증을 위한 API 사용 선택 -> Create app client
          - App client Id 따로 보관
      3. 도메인 이름 생성
        - Domain name -> Save changes
      4. Cognito 테스트 사용자 생성
        - 사용자 생성
          - AWS CLI에서 이메일, 암호로 사용자 등록
        - 사용자 확인
    - **serverless framework 설정**
      1. serverless 설치
        - npm i -g serverless
        - 프로젝트 디렉토리에 handler.js와 serverless.yml 파일 포함
        - tests/에서 단위 테스트
      2. Node.js 패키지 설치
        - npm i
        - npm i -D aws-sdk (aws 서비스와 통신)
        - npm i uuid@7.0.3 (DynamoDB에 항목을 저장하는데 필요)
      3. 서비스 이름 업데이트
        - serverless.yml
          ```yml
          service: notes-api

          # Create an optimized package for our functions
          package:
            individually: true

          plugins:
            - serverless-bundle # Package our functions with Webpack
            - serverless-offline
            - serverless-dotenv-plugin # Load .env as environment variables

          provider:
            name: aws
            runtime: nodejs12.x
            stage: prod
            region: us-east-1
          ```
      4. ES6 및 TypeScript에 대한 지원 추가
        - AWS Lambda는 Node.js v10.x 및 v12.x를 지원함
        - Babel, Typescript, Webpack 으로 해도되나 serverless-bundle 사용
        - serverless-bundle
          - ES6 및 TypeScript 지원
          - 최적화된 패키지 생성
          - ESLint를 사용해 Lambda 함수 Linting
          - babel-jest로 트랜스 파일 단위 테스트 지원
          - 오류 메시지에 대한 소스 맵 지원
        - typescript의 경우 serverless-nodejs-starter 대신 serverless-typescript-starter
        - npm i -D serverless-bundle
        - serverless.yml
          ```yml
          plugins:
            - serverless-bundle
          ```
        - package.json
          ```json
          "scripts" : {
            "test": "serverless-bundle test"
          }
          ```
        - 최적화 된 패키지
          - 기본적으로 serverless framework는 모든 Lambda 함수에 대한 단일 패키지를 생성함. 
          - Lambda 함수가 호출되면 앱의 모든 코드가 로드됨. 앱 크기가 커짐에 따라 성능에 부정적인 영향을 미침. cold start가 길어짐
          - 이 기능을 그고 function을 개별적으로 패키징하도록 설정
          - serverless.yml
            ```yml
            package:
              individually: true
            ```
          - 위의 옵션을 활성화하면 serverless bundle은 webpack을 사용해 트리 쉐이킹 알고리즘을 사용해 최적화된 패키지 생성
    - **github repo**
      - Github 홈페이지 -> New repository
      - git init -> add -> commit -> remote -> push
---
  4. serverless REST API
    - **create note**
      - create.js
      - serverless.yml
      - test
      - refactoring
    - **get note**
      - get.js
      - serverless.yml
    - **get notes**
      - list.js
      - serverless.yml
    - **update note**
      - update.js
      - serverless.yml
    - **delete note**
      - delete.js
      - serverless.yml
    - **3rd party apis**
    - **unit tests in serverless**
      - npm i -D jest
      - package.json
        ```json
        "scripts": {
          "test": "jest"
        }
        ```
      - serverless bundle을 사용하는 경우
      - package.json
        ```json
        "scripts": {
          "test": "serverless-bundle test"
        }
        ```
      - tests/ 디렉터리에 test 코드 추가
    - **API Gateway CORS 오류 처리** 
      1. 리소스 생성
        - resources/api-gateway-errors.yml
      2. 리소스 포함
        - serverless.yml
          ```yml
          resources:
            - ${file(resources/api-gateway-errors.yml)}
          ```
      3. 변경사항 커밋
        - add -> commit -> push
---
  5. deploy backend
    - **API deploy**
      - serverless deploy
      - serverless deploy --aws-profile myProfile
        - API endpoints, API Gateway region, API Gateway ID 따로 보관
      - 단일 function 배포
        - serverless deploy function -f list
    - **Cognito 자격 증명 풀 생성**
      - AWS Console -> Cognito -> Manage Federated Identities 선택 -> pool name 입력 -> Authentication providers의 Cognito 탭의 pool id 및 app client id 입력 -> create pool
      - Hide details -> Hide Policy Document edit -> Allow
      - Dashboard -> Edit identity pool -> pool ID 따로 보관
      1. Cognito 사용자 풀 vs 자격 증명 풀
    - **API Test**
      - npx aws-api-gateway-cli-test
---
  6. react app 셋업
    - **React.js App 생성**
      - github repo 생성 -> init -> add -> commit -> remote -> push
      - favicon 추가
      - font 추가
    - **React Router**
    - **AWS Amplify**
      - React App이 AWS 리소스와 통신하도록 AWS Amplify 사용
      - npm i aws-amplify
      - src/config.js
      1. AWS Amplify 추가
        - src/index.js
      2. 변경사항 커밋
        - add -> commit -> push 
---
  7. react app build
    - **로그인 페이지**
    - **가입 페이지**
    - **note 생성 페이지**
    - **all note 페이지**
    - **note 표시**
    - **설정 페이지**
    - **보안 페이지**
---
  8. deploy production backend
    - **production 준비**
    - **코드로서의 인프라란?**
    - **SST로 CDK 앱 빌드**
    - **서버리스 인프라 배포**
    - **서버리스 배포 자동화**
    - **구성된 API 테스트**
---
  9. deploy production fronted
    - **React 배포 자동화**
    - **프론트엔드 워크플로우**
---
  10. 모니터링 및 디버깅
    - **풀스택 서버리스 앱 디버깅**
    - **React에서 오류보고 설정**
    - **서버리스에서 설정 오류 로깅**
---
  11. Best Practices