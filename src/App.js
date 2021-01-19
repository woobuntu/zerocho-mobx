import { useCallback } from "react";
import { observer, useLocalObservable, useObserver } from "mobx-react";
import { userStore, postStore } from "./store";

function App() {
  const state = useLocalObservable(() => ({
    name: "",
    password: "",
    onChange(e) {
      this[e.target.name] = e.target.value;
    },
  }));

  const onLogin = useCallback(() => {
    userStore.logIn({
      nickname: state.name,
    });
  }, []);
  // 아니 함수 내부에서 state값을 참조하는데 dependency를 빈 배열로 전달함?
  // 이래서 mobx랑 리액트는...

  const onLogout = useCallback(() => {
    userStore.logOut();
  }, []);

  return useObserver(() => (
    <div>
      {userStore.isLoggingIn ? (
        <div>로그인 중</div>
      ) : userStore.data ? (
        <div>{userStore.data.nickname}</div>
      ) : (
        "로그인 해주세요"
      )}
      {!userStore.data ? (
        <button onClick={onLogin}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
      <div>{postStore.data.length}</div>
      <input name="name" value={state.name} onChange={state.onChange} />
      <input
        name="password"
        value={state.password}
        type="password"
        onChange={state.onChange}
      />
    </div>
  ));
}

export default App;
// 상단 선언부에서 감싸주는 방법도 있고(화살표 함수 컴포넌트)
// 이렇게 export부분에 감싸주는 방법도 있다.
// 근데 밑에서 감싸주는 게 가독성이 더 좋지 않나
