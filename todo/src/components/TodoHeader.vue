<template>
 <div class="header">
    <h1>Things To do
      <button class="add__button" v-on:click="toggle = !toggle" >Add</button>
    </h1>
    <div class="input" v-if="toggle">
      <input type="text" v-model="newTodoItem"/>
      <button v-on:click="addTodo()">추가</button>
    </div>    
 </div>
</template>

<script>
export default {
  data: function(){
    return {
      toggle: false,
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
};

</script>

<style scoped>
  .header {
        padding: 30px 0 20px;
    }
</style>