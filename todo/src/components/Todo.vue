<template>
  <div id="todo">
    <TodoHeader v-on:addTodo="addTodo"></TodoHeader>
    <TodoList v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo"></TodoList>
  </div>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";

export default {
   data(){
        return {
          toggle: false,
            todoItems: []
        }
    },
    created(){
        if(localStorage.length > 0){
            for(var i = 0; i < localStorage.length; i++){
              if (localStorage.key(i) != "loglevel:webpack-dev-server") {
                this.todoItems.push(localStorage.key(i));
              }
            }
        }
    },
    methods: {
        addTodo(todoItem){
            //로컬스토리지에 데이터를 추가하는 로직
            localStorage.setItem(todoItem, todoItem);
            if (todoItem != "loglevel:webpack-dev-server"){
              this.todoItems.push(todoItem);
            }
        },
        removeTodo(todoItem, index){
          localStorage.removeItem(todoItem.title);
          //splice()는 첫번째 인자값(index)로부터 두번째 인자값(1)만큼을 삭제한다.
          this.todoItems.splice(index, 1);
        }
    },
   components: {
      TodoHeader,
      TodoList  
  }
}
</script>

<style>

</style>
