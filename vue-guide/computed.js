var vm = new Vue({
  el: "#example",
  data: {
    message: "안녕하세요",
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // 'this'는 vm 인스턴스를 가리킵니다.
      return this.message.split("").reverse().join("");
    },
  },
});
