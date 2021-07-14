<template>
 <div class="header">
    <h1>Things To do
      <button class="add__button" v-on:click="toggle = !toggle" >Add</button>
    </h1>
    <div class="input" v-if="toggle">
      <input type="text" v-model="newTodoItem"/>
      <button v-on:click="addTodo">추가</button>
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
            //inputbox 빈값인지 체크, 빈값이 아니면 로직 수행
            if(this.newTodoItem !== ''){
                const todoIndex = "todo_";
                const todoTime = this.doTimeStamp();
                const localStorageKey = todoIndex + todoTime;
                const item = {index:localStorageKey, title: this.newTodoItem, done: false};
                this.$emit('addTodo', item);
                //inputbox 초기화
                this.clearInputbox();
            }
        },
        doTimeStamp(){  
          const now = new Date();
          const timeStamp = now.getMonth() + 1 + "_" + now.getDate() + "_" + now.getTime();

          return timeStamp;
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