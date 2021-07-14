<template>
  <div id="todo">
    <TodoHeader v-on:addTodo="addTodo"></TodoHeader>
    <TodoList v-bind:todoList="todoItems" v-on:removeTodo="removeTodo" v-on:changeState="changeState"></TodoList>
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
            const todoIndex = "todo_";
            for(var i = 0; i < localStorage.length; i++){
              if (localStorage.key(i).includes(todoIndex)) {
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
              }
            }
        }
    },
    methods: {
        addTodo(todoItem){
            //로컬스토리지에 데이터를 추가하는 로직
            const todoIndex = "todo_";
            localStorage.setItem(todoItem.index, JSON.stringify(todoItem));
            if (todoItem.index.includes(todoIndex)){
              this.todoItems.push(todoItem);
            }
        },
        removeTodo(todoItem){
          localStorage.removeItem(todoItem.index);
          //splice()는 첫번째 인자값(index)로부터 두번째 인자값(1)만큼을 삭제한다.
          
          const indexNum = this.todoItems.findIndex(todo => todo.index == todoItem.index);
          this.todoItems.splice(indexNum, 1);
        },
        changeState(todoItem){
          todoItem.done = !todoItem.done;
          localStorage.setItem(todoItem.index, JSON.stringify({index:todoItem.index, title: todoItem.title, done: todoItem.done}))
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
