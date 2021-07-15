import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todoItems: [],
  },
  getters: {
    showList(state) {
      if (localStorage.length > 0) {
        state.todoItems = JSON.parse(localStorage.getItem("TODO"))["todoItems"];
      }
    },
    updateLocalStorage(state) {
      localStorage.setItem("TODO", JSON.stringify(state));
    },
  },
  mutations: {
    addTodo(state, payload) {
      //로컬스토리지에 데이터를 추가하는 로직
      state.todoItems.push(payload);
    },
    removeTodo(state, payload) {
      //splice()는 첫번째 인자값(index)로부터 두번째 인자값(1)만큼을 삭제한다.
      const indexNum = state.todoItems.findIndex(
        (todo) => todo.id === payload.id
      );
      state.todoItems.splice(indexNum, 1);
    },
    changeDone(state, payload) {
      payload.done = !payload.done;
      Vue.set(state.todoItems, payload.id, payload.done);
    },
  },
});

export default store;
