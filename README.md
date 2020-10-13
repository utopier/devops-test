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

## 12. CircleCI ( with docker )

## 13. Build

## 14. Testing(linting, jest, react-testing-library, cypress)
1. jest
  - **Matchers**
    1. Common
      - expect
      - toBe
      - toEqual
    
  - **Async**
  - **Setup and Teardown**
  - **Mock Functions**

2. react-testing-library

3. cypress

## 15. Deploy ( Serverless, AWS )


