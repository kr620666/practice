import Vue from "vue";
import Vuex from "vuex";
import LocalStore from "./local.store";

Vue.use(Vuex);

const localStore = new LocalStore("TODO");
const store = new Vuex.Store({
  state: {
    todoItems: [],
  },
  getters: {
    todoList: (state) => {
      return state.todoItems;
    },
  },
  mutations: {
    setTodoList(state, todoItems = []) {
      state.todoItems = todoItems;
    },
    addTodo(state, payload) {
      state.todoItems.push(payload);
    },
    removeTodo(state, payload) {
      state.todoItems.splice(payload, 1);
    },
    changeDone(state, payload) {
      Vue.set(state.todoItems, payload.id, payload);
    },
  },
  actions: {
    fetchTodoList({ commit }) {
      const todoList = localStore.storeToJson();
      commit("setTodoList", todoList);
    },
    createTodo({ commit }, { id, title }) {
      const todo = {
        id,
        title,
        done: false,
      };
      localStore.save(todo);
      commit("addTodo", todo);
    },
    deleteTodo({ commit, state }, payload) {
      const indexNum = state.todoItems.findIndex(
        (todo) => todo.id === payload.id
      );
      localStore.remove(payload.id);
      commit("removeTodo", indexNum);
    },
    statusChange({ commit }, payload) {
      payload.done = !payload.done;
      const todo = {
        id: payload.id,
        title: payload.title,
        done: payload.done,
      };
      localStore.save(todo);
      commit("changeDone", payload.done);
    },
  },
});

export default store;
