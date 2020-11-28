## Redux
1. Folder Architecture
    - /pages
        _app.tsx -> wrapper.withRedux로 전체 App에 Redux 적용 
      /store
        /redux
            index.ts
            /reducers
                index.ts
                user.ts
                todo.ts
            /sagas
                index.ts
                user.ts
                todo.ts

2. store 설정 /store/index.ts
    - redux-saga의 createSagaMiddleware로 redux 미들웨어에 compose(applyMiddleware(...middlewares)) 형식으로 saga 붙이기
    - createStore(reducer, enhancer)로 store 생성
    - store.sagaTask 에 sagaMiddleware.run(rootSaga)로 saga 실행.
    - next-redux-wrapper의 createWrapper로 Nextjs에 Redux 연결할 wrapper 함수 생성

3. reducer
    - index.ts 
        - combineReducers로 각 reducer 합쳐서 rootReducer로 export 하기
        - next-redux-wrapper의 HYDRATE 적용
    - user.ts, todo.ts
        - initialState 정의
        - Action 정의
        - Action 생성함수 정의
        - reducer 정의 (immer로 불변성 지키기)
4. sagas
    - index.ts
        - all, fork로 각 saga 합친후 rootSaga로 export
        - axios.defaults.baseURL, axios.defaults.withCredentials 설정
    - user.ts, todo.ts
        - 사용할 action 생성함수 import
        - saga 3종 세트로 로직 구현(call, put, takeLatest, throttle)
        - all, fork로 해당 로직 합친후 saga 함수 export
5. Nextjs React App에서 Redux 사용하기
    - useDispath, useSelector로 redux 사용
    - getServerSideProps 함수는 wrapper.getServerSideProps으로 감싸서 서버에서 redux store 활용할 수 있게 하기
    - redux store의 state 변경시 해당 state를 사용하는 모든 Component는 자동으로 새로운 state와 함께 리렌더링하게 됨.
---
## Mobx
1. Folder Structure
2. Store 설정
    - mobx-react의 Provider에 각 store 넣어서 전체 Nextjs App 감싸기.
3. index.ts, user.ts, todo.ts
    - RootStore로 스토어끼리 관계 형성
    - observable(관찰할 값), action, computed(계산된 값)
    - 비동기는 mobx의 flow로 처리
4. Nextjs React App에서 Mobx 사용하기
    - mobx-react의 inject,observer 데코레이터로 컴포넌트 props로 스토어 주입해서 사용.
---
## Context
---
## Rxjs
---
## Apollo
---