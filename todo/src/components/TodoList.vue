<template>
  <section>
      <ul>
          <li v-for="(todoItem, index) in propsdata" :key="todoItem">
              <p v-bind:class="{done: todoItem.done}">{{ todoItem.title }}</p>
                <input type="checkbox" v-on:change="todoItem.done = true">완료
                <button v-on:click="removeTodo(todoItem, index)">삭제</button>              
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
      props: ['propsdata'],
      methods: {
        removeTodo(todoItem, index){
          this.$emit('removeTodo', todoItem, index);
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