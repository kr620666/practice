// 데이터 객체
var data = { a: 1 };

// Vue인스턴스에 데이터 객체를 추가합니다.
var vm = new Vue({
  data: data,
});

// 인스턴스에 있는 속성은 원본 데이터에 있는 값을 반환합니다.
vm.a === data.a; // => true

// 인스턴스에 있는 속성값을 변경하면 원본 데이터에도 영향을 미칩니다.
vm.a = 2;
data.a; // => 2

// ... 반대로 마찬가지입니다.
data.a = 3;
vm.a; // => 3

vm.b = "hi";

// 어떤 속성이 나중에 필요하다는 것을 알고 있으며,
// 빈 값이거나 존재하지 않은 상태로 시작한다면 아래와 같이 초기값을
// 지정할 필요가 있습니다.

// data: {
//     newTodoText: '',
//     visitCount: 0,
//     hideCompletedTodos: false,
//     todos: [],
//     error: null
//   }

var obj = {
  foo: "bar",
};

// 기존 속성이 변경되는 것을 막아 반응성시스템이 추적할 수 없다는 것을 의미.
Object.freeze(obj);

new Vue({
  el: "#app",
  data: obj,
});

var data = { a: 1 };
var vm = new Vue({
  el: "#example",
  data: data,
});

vm.$data === data; // => true
vm.$el === document.getElementById("example"); // => true

// $watch는 인스턴스 메소드 입니다.
vm.$watch("a", function (newVal, oldVal) {
  // 'vm.a'가 변경되면 호출 됩니다.
});

new Vue({
  data: {
    a: 1,
  },
  created: function () {
    // 'this'는 vm 인스턴스를 가리킵니다.
    console.log("a is: " + this.a);
  },
});
// => 'a is: 1'

/**
 * options 속성이나 콜백에
 * created: () => console.log(this.a) 나
 * vm.$watch('a', newValue => this.myMethod()) 와 같은
 * 화살표 함수 사용 지양.
 * 화살표 함수는 this를 가지지 않기 때문에
 * this가 다른 변수로 취급되거나 렉시컬하게 호출한 변수를 발결할 떄까지
 * 부모 스코프에서 해당 변수를 찾음.
 * -> Uncaught TypeError: Cannot read property of undefined
 * 또는 Uncaught TypeError: this.myMethod is not a function
 * 에러발생.
 *  */
