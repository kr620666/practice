<template>
<div>

<h3>id : {{ todoId }}</h3>
<h3>title: {{ getTodoById(todoId).title }}</h3>
<h3>done: {{ getTodoById(todoId).done }}</h3>

<div class="changeTodo">
    <input type="checkbox" :checked="getTodoById(todoId).done" v-on:change="statusChange(getTodoById(todoId))">완료
    <button v-on:click="onClickDelete(todoId)">삭제</button>    
    <br>        
</div>
<router-view></router-view>

</div>
</template>
<script>
import { mapActions } from 'vuex'


export default {
    computed: {
        todoId () {
            return this.$route.params.id
        },
        getTodoById () {
            return (id) => this.$store.getters.getTodoById(id)
        },
    },
    methods: {
      ...mapActions([
        'deleteTodo', 'statusChange'
      ]),
      onClickDelete(todoId) {
          this.$store.dispatch("deleteTodo", todoId).then(() => this.$router.push("/"))
      }
    }
}
</script>
