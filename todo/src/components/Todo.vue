<template>
  <div id="todo">
    <TodoHeader />
    <TodoList />
  </div>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";

export default {
  created(){
      this.$store.dispatch("fetchTodoList");
    },
    components: {
      TodoHeader,
      TodoList  
  }
}
</script>

<style>
 #todo {
   position: relative;
   margin: 0 0.5rem;
 }
</style>
