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

console.log(vm.reversedMessage); // => 요세하녕항
vm.message = "Goodbye";
console.log(vm.reversedMessage); // => 'eybdooG'

var vm1 = new Vue({
  el: "#example1",
  data: {
    message: "호두야잘자",
  },
  methods: {
    reversedMessage: function () {
      return this.message.split("").reverse().join("");
    },
  },
});

/**
 * #Computed 속성의 캐싱 vs 메소드
 *
 * 최종 결과에 대해 두가지 접근방식은 서로 동일.
 * 차이점
 * computed 속성은 종속 대상을 따라 저장(캐싱)된다
 * 해당 속성이 종속 된 대상이 변경 될떄만 함수를 실행 함.
 * -> message가 변경되지 않는 한,
 * computed 속성인 reversedMessage를 여러번 요청해도 계산을 다시 하지 않고
 * 계산 되어 있던 결과를 즉시 반환.
 * 또, Date.now() 처럼 아무 곳에도 의존하지 않는 computed 속성의 경우 절대로 업데이트 되지 않음.
 *
 * 메소드 호출 시 렌더링을 다시 할 때 마다 항상 함수를 실행 함.
 *
 * 캐싱이 필요 한 이유
 * 계산에 시간이 많이걸리는 computed 속성인 A
 * 캐싱을 하지 않으면 A의 getter 함수를 꼭 필요한 것보다 더 많이 실행 하게 됨.
 * 캐싱을 원하지 않는 경우 메소드 사용.
 *
 *
 * #Computed 속성 vs watch 속성
 *
 * Vue는 Vue 인스턴스의 데이터 변경을 관찰하고 이에 반응하는 일반적인 watch 속성 제공.
 * 다른 데이터 기반으로 변경할 필요가 있는 데이터가 있는 경우 사용.
 * 명령적인 watch 콜백보다 computed 속성을 사용하는 것이 좋음.
 *
 * watch 속성은 감시할 데이터를 지정하고 그 데이터가 바뀌면 실행하라는 '명령형 프로그래밍' 방식
 * computed 속성은 계산해야 하는 목표 데이터를 정의하는 방식 '선언형 프로그래밍' 방식
 *
 */
var vm2 = new Vue({
  el: "#demo",
  data: {
    firstName: "Foo",
    lastName: "Bar",
    fullName: "Foo Bar",
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName: function (val) {
      this.fullName = this.firstName + " " + val;
    },
  },
});
/* 위의 코드는 명령형. 코드 반복함. 
 아래 코드는 선언형.
 일반적으로 선언형 프로그래밍이 명령형 프로그래밍보다 코드 반복이 적은 등 우수하다고 평가.
*/

var vm3 = new Vue({
  el: "#demo2",
  data: {
    firstName: "Foo",
    lastName: "Bar",
  },
  computed: {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },
  },
});
