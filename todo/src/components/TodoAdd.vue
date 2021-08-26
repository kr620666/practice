<template>
    <div>
        <input type="text" v-model="newTodoItem"/>
        <button v-on:click="addTodo()">추가</button>
        <br>
        <router-view></router-view>  
    </div>
</template>
<script>
export default {
   data: function(){
    return {      
      newTodoItem: ''
    }
  },
    methods: {
        addTodo(){
            if(this.newTodoItem !== ''){
                const localStorageKey = "todo_" + this.doTimeStamp();
                this.$store.dispatch('createTodo', {id:localStorageKey, title: this.newTodoItem});
                this.clearInputbox();
            }
        },
        doTimeStamp(){  
          const now = new Date();
          return `${now.getMonth() + 1 }_${now.getDate()}_${now.getTime()}`;
        },
        clearInputbox(){
            this.newTodoItem = '';
        }
    }
}
</script>
