<template>
    <div>
        <input type="text" v-model="newTodoItem">
        <button v-on:click="addTodo">추가</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo(){
            //inputbox 빈값인지 체크, 빈값이 아니면 로직 수행
            if(this.newTodoItem !== ''){
                var obj = {title: this.newTodoItem, done: false};
                this.$emit('addTodo', obj);
                //inputbox 초기화
                this.clearInputbox();
            }
        },
        clearInputbox(){
            this.newTodoItem = '';
        }
    }
}
</script>