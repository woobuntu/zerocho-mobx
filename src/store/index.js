import { observable } from "mobx";

const userStore = observable({
  isLoggingIn: false,
  data: null,
  // 비동기 처리도 메소드 안에서 자유자재로 하면 된다.
  // thunk나 saga같은 것이 필요없음
  logIn(data) {
    this.isLoggingIn = true;
    setTimeout(() => {
      this.data = data;
      this.isLoggingIn = false;
      postStore.data.push(1);
    }, 1000);
  },
  logOut() {
    this.data = null;
  },
});

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
});

export { userStore, postStore };
