/**
 * 믹스인
 *
 * 기초
 * mixin은 vue 컴포넌트에 재사용 가능한 기능을 배포하는 유연한 방법.
 * mixin 객체는 모든 구성 요소 옵션을 포함할 수 있음.
 * 컴포넌트에 mixin을 사용하면 해당 mixin의 모든 옵션이 컴포넌트의 고유 옵션에
 * 혼합됨.
 *
 */

// mixin 객체 생성
var myMixin = {
  created: function () {
    this.hello();
  },
  method: {
    hello: function () {
      console.log("hello fron mixin!");
    },
  },
};

// mixin을 사용할 컴포넌트 정의
var Component = Vue.extend({
  mixins: [myMixin],
});

var component = new Component(); // => 'hello from mixin!'

/**
 * 옵션 병합
 *
 * mixin과 컴포넌트 자체에 중첩 옵션이 포함되어 있으면 적절한 전략을
 * 사용하여 '병합'됨.
 *
 * 예를들어 data 오브젝트의 내용이 상충하는 경우,
 * 컴포넌트에 선언된 data 오브젝트를 우선으로 하여 재귀적으로 병합.
 */

var mixin = {
  data: function () {
    return {
      message: "hello",
      foo: "abc",
    };
  },
};

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: "goodbye",
      bar: "def",
    };
  },
  created: function () {
    console.log(this.$data);
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
});

// 같은 이름의 훅 함수가 배열에 병합되어 모든 함수가 호출됨.
// 또한 mixin 혹은 컴포넌트 자체의 훅 이전에 호출 됨.

var mixin = {
  created: function () {
    console.log("mixin hook called");
  },
};

new Vue({
  mixins: [mixin],
  created: function () {
    console.log("component hook called");
  },
});

// -> 'mixin hook called'
// -> 'component hook called'

// methods, components, directives 와 같은 객체 값을 요구하는 옵션은 같은 객체에 병합 됨.
// 객체에 충돌하는 키가 있을 경우 컴포넌트의 옵션이 우선순위를 갖음.

var mixin = {
  methods: {
    foo: function () {
      console.log("foo");
    },
    conflicting: function () {
      console.log("from mixin");
    },
  },
};

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log("bar");
    },
    conflictiing: function () {
      console.log("from self");
    },
  },
});

vm.foo(); // => 'foo'
vm.bar(); // => 'bar'
vm.conflictiing(); // => 'from self'

// 같은 병합 전략이 vue.extend()에서 사용된다는 것 주의.

/**
 * 전역  Mixin
 *
 * mixin은 전역으로 적용할 수 있음.
 * 주의! mixin을 전역으로 적용하면 이후에 생성된 모든 Vue 인스턴스에
 * 영향을 미침.
 * 적절히 사용하면 사용자 정의 옵션에 대한 처리 로직을 주입하는데 사용 가능
 */

// 'myOption' 사용자 정의 옵션을 위한 핸들러 주입
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption;
    if (myOption) {
      console.log(myOption);
    }
  },
});

new Vue({
  myOption: "hello",
});
// => 'hello'

/**
 * 글로벌 mixin은 써드파티 컴포넌트를 포함하여 생성된 모든 단일 Vue 인스턴스에 영향
 * -> 적고 신중하게 사용.
 * 대부분의 경우 위 예제처럼 사용자 지정 옵션 처리에만 사용해야 함.
 */

/**
 * 사용자 정의 옵션 병합 전략
 *
 * 사용자 지정 옵션을 병합할 때 기본 옵션을 사용하면 기존 값을 덮어씀.
 * 커스텀 로직을 사용해 커스텀 옵션을 병합하려면
 * Vue.config.optionMergeStrategies에 함수를 추가해야 함.
 */

Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return 병합된 값
};

// 대부분의 객체 기반 옵션에서 methods에서 사용한것과 같은 전략을 간단하게 사용 가능
var strategies = Vue.config.optionMergeStrategies;
strategies.myOption = strategies.methods;
