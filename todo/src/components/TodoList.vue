<template>
  <section>
      <ul>
          <li v-for="(todoItem) in todoList" :key="todoItem">
              <p v-bind:class="{done: todoItem.done}">{{ todoItem.title }}</p>
                <input type="checkbox" :checked="todoItem.done" v-on:change="changeState(todoItem)">완료
                <button v-on:click="removeTodo(todoItem)">삭제</button>              
          </li>
      </ul>
  </section>
</template>

<script>
export default {
    data(){
        return {
            todoItems: []
        }
    },
      props: ['todoList'],
      methods: {
        removeTodo(todoItem){
          this.$emit('removeTodo', todoItem);
        },
        changeState(todoItem){
          this.$emit('changeState', todoItem);
        }
      }
  }    

</script>

<style scoped>
.done{
  color: gray;
  text-decoration: line-through;
}
</style>