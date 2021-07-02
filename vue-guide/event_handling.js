var example1 = new Vue({
  el: "#example-1",
  data: {
    counter: 0,
  },
});

var example2 = new Vue({
  el: "#example-2",
  data: {
    name: "Vue.js",
  },
  // 메소드는 'methods' 객체 안에 정의
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 'this'는 Vue 인스턴스
      alert("Hello" + this.name + "!");
      // 'event'는 네이티브 DOM 이벤트
      if (event) {
        alert(event.target.tagName);
      }
    },
  },
});

// 또한 Javascript를 이요해서 메소드를 호출할 수 있다.
example2.greet(); // -> 'Hello Vue.js!'

new Vue({
  el: "#example-3",
  methods: {
    say: function (message) {
      alert(message);
    },
    warn: function (message, event) {
      // 이제 네이티브 이벤트에 액세스 할 수 있음
      if (event) event.preventDefault();
      alert(message);
    },
  },
});

// 'v-on:keyup.f1'을 사용 할 수 있음
Vue.onfig.keyCodes.f1 = 112;
