import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "./components/TodoList";
import Test from "./components/test";
import TodoItem from "./components/TodoItem";
import TodoAdd from "./components/TodoAdd";
import GoToList from "./components/GoToList";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: "home",
      path: "/",
      component: TodoList,
    },
    {
      name: "item",
      path: "/item/:id",
      component: TodoItem,
      children: [{ path: "", component: GoToList }],
    },
    {
      path: "/test",
      component: Test,
    },
    {
      path: "/add",
      component: TodoAdd,
      children: [{ path: "", component: GoToList }],
    },
  ],
});
export default router;
