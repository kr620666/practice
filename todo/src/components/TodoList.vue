<template>
  <section>
      <ul>
          <li v-for="(todoItem) in todoList" :key="todoItem">
              <router-link :to="{ name: 'item', params: { id: todoItem.id }}">
                <p v-bind:class="{done: todoItem.done}">{{ todoItem.title }}</p>
              </router-link>
                <div class="changeTodo">
                  <input type="checkbox" :checked="todoItem.done" v-on:change="statusChange(todoItem)">완료
                  <button v-on:click="deleteTodo(todoItem.id)">삭제</button>              
                </div>
          </li>
      </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
      ...mapGetters([
        'todoList'
      ])
    },
    methods: {
      ...mapActions([
        'deleteTodo', 'statusChange'
      ]),
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