<template>
  <section>
      <ul>
          <li v-for="(todoItem) in todoList" :key="todoItem">
              <p v-bind:class="{done: todoItem.done}">{{ todoItem.title }}</p>
                <div class="changeTodo">
                  <input type="checkbox" :checked="todoItem.done" v-on:change="changeDone(todoItem)">완료
                  <button v-on:click="removeTodo(todoItem)">삭제</button>              
                </div>
          </li>
      </ul>
  </section>
</template>

<script>
export default {
    computed: {
      todoList (){
        return this.$store.state.todoItems;
      }
    },
    created(){
      this.$store.getters.showList;
    },
    methods: {
      removeTodo(todoItem){
        this.$store.commit('removeTodo', todoItem);
        this.$store.getters.updateLocalStorage;
      },
      changeDone(todoItem){
        this.$store.commit('changeDone', todoItem);
        this.$store.getters.updateLocalStorage;
      }
    }
  }    

</script>

<style scoped>
p {
  width: 100px;
}
.done{
  color: lightslategray;
  text-decoration: line-through;
  background-color: lightgray;
}
.changeTodo{
  margin-left: 100px;
}
</style>