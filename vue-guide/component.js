/**
    # 전역 등록
    전역 컴포넌트 등록하려면, Vue.component(tagName, options) 사용
 */

Vue.component("my-component", {
  // 옵션
});

/**
 * Vue는 사용자 지정 태그 이름에 대해 W3C 규칙을 적용하지 않습니다.
 * (모두 소문자여야 하고 하이픈 포함)
 * 하지만 규칙을 따르는 것이 좋음.
 *
 * 일단 등록되면, 컴포넌트는 인스턴스의 템플릿에서 커스텀 엘리먼트,
 * <my-component></my-component>로 사용 할 수 있음.
 * 루트 Vue 인스턴스를 인스턴스화하기 전에 컴포넌트가 등록되어 있는지 확인.
 */

// 등록
Vue.component("my-component", {
  template: "<div> 사용자 정의 컴포넌트 입니다! </div>",
});

// 루트 인스턴스 생성
new Vue({
  el: "#example",
});

/**
 * # 지역 등록
 *
 * 모든 컴포넌트를 전역으로 등록 할 필요는 없다.
 * 컴포너트를 components 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의
 * 범위에서만 사용할 수 있는 컴포넌트를 만들 수 있음.
 *
 */

var Child = {
  template: "<div>사용자 정의 컴포넌트 입니다.</div>",
};

new Vue({
  // ...
  components: {
    // <my-component>는 상위 템플릿에서만 사용할 수 있습니다.
    "my-component": Child,
  },
});

// 동일한 캡슐화는 디렉티브와 같은 다른 등록 가능한 vue 기능에도 적용 됨.

Vue.component("my-component", {
  template: "<span>{{ message }}</span>",
  data: {
    message: "hello",
  },
});

// vue는 중단하고 콘솔에서 경고. data는 컴포넌트 인스턴스의 함수여야 함.

var data = { counter: 0 };

Vue.component("simple-counter", {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return {
      counter: 0,
    };
  },
});

new Vue({
  el: "#example-2",
});

// 세 개의 컴포넌트 인스턴스가 모두 같은 data 객체를 공유하므로 하나의 카운터를 증가 시키면 모두 증가.
// 새로운 데이터 객체를 반환하여 문제 해결.

/**
    컴포넌트 작성

    컴포넌트는 부모-자식 관계에서 가장 일반적으로 함께 사용하기 위한 것.
    컴포넌트 A는 자체 템플릿에서 컴포넌트 B를 사용할 수 있음. 의사소통 필요.
    부모는 자식에게 데이터를 전달해야 할 수도 있음. 자식은 자신에게 일어난 일을 부모에게 알릴 필요가 있음.
    부모와 자식이 명확하게 정의된 인터페이스를 통해 가능한한 분리 된 상태로 유지하는 것도 중요.
    각 컴포넌트 코드를 상대적으로 격리 할 수 있도록 작성, 추록 할 수 있음. 
    유지 관리가 쉽고 잠재적으로 쉽게 재사용 할 수 있음.
    
    vue.js에서 부모-자식 컴포넌트 관계는 props는 아래로, events는 위로 라고 요약 할 수 있음.
    부모는 props를 통해 자식에게 데이터를 전달.
    자식은 events를 통해 부모에게 메시지를 보냄.
 */

/**
    Props

    #props로 데이터 전달하기.

    모든 컴포넌트 인스턴스에는 자체 격리 된 범위가 있음.
    하위 컴포넌트의 템플릿에서 상위 데이터를 직접 참조 할 수 없음.
    데이터는 props 옵션을 사용하여 하위 컴포넌트로 전달 될 수 있음.

    props는 상위 컴포넌트의 정보를 전달하기 위한 사용자 지정 특성.
    하위 컴포넌트는 props 옵션 사용하여 수신할 것으로 기대되는 props를 명시적으로 선언해야 함.
 */

/**
    # camelCase vs. kebab-case

    HTML 속성은 대소 문자를 구분하지 않으므로 문자열이 아닌 템플릿을 사용할 때
    camelCased prop 이름에 해당하는 kebab-case(하이픈 구문)를 사용해야 함.
 */

Vue.component("child", {
  // JavaScript는 camelCase
  props: ["myMessage"],
  template: "<span>{{ myMessage }}</span>",
});

Vue.component("child", {
  //props 정의
  props: ["message"],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있음.
  // vm의 this.message로 사용 할 수 있음.
  template: "<span>{{ message }}</span>",
});

/**
    객체의 모든 속성을 props로 전달하려면, 인자 없이 v-bind 쓸 수 있음. 
    v-bind:prop-name 대신 v-bind
    예를 들어 todo 객체가 있다면
  */
Vue.component("todo", {
  todo: {
    text: "Learn Vue",
    isComplete: false,
  },
});

/**
 * # 단방향 데이터 흐름
 *
 * 모든 props는 하위 속성과 상위 속성 사이의 단방향 바인딩을 형성함.
 * 상위 속성이 업데이트 되면 하위로 흐르게 되지만 그 반대는 안됨.
 * 하위 컴포넌트가 실수로 부모의 상태를 변경하여 앱의 데이터 흐름을 추록하기 어렵게 만드는 것을 방지.
 *
 * 일반적으로 prop을 변경시키고 싶은 경우
 * 1. 이 prop는 초기 값을 전달하는 데만 사용되며 하위 컴포넌트는 이후에 이를 로컬 데이터 속성으로 사용하기만 함.
 * 2. prop는 변경되어야 할 원시 값으로 전달 됨.
 *
 * ->1. prop의 초기 값을 초기 값으로 사용하는 로컬 데이터 속성을 정의
 */
Vue.component("prop", {
  props: ["initialCounter"],
  data: function () {
    return { counter: this.initialCounter };
  },
});

// 2. prop 값으로 부터 계산된 속성을 정의
Vue.component("prop", {
  props: ["size"],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase();
    },
  },
});

/**
 * 자바 스크립트의 객체와 배열은 참조로 전달 됨.
 * prop가 배열이나 객체인 경우하위 객체 또는 배열 자체를 부모 상태로 변경하면 부모 상태에 영향을 줌.
 */

/**
 * # Prop 검증
 *
 * 컴포넌트가 받는 중인 prop에 대한 요구사항을 지정할 수 있음.
 * 요구사항이 충족되지 않으면 Vue에서 경고를 내보냄
 * 이 기능은 다른 사용자가 사용할 컴포넌트를 제작 할 때 유용함.
 *
 * props를 문자열 배열로 정의하는 대신 유효성 검사 요구사항이 있는 객체를 사용할 수 있음.
 */

Vue.component("example", {
  props: {
    // 기본 타입 확인 ('null'은 어떤 타입이든 가능하다는 뜻. )
    propA: Number,
    // 여러개의 가능한 타입
    propB: [String, Number],
    // 문자열이며 필수
    propC: {
      type: String,
      required: true,
    },
    // 숫자이며 기본 값
    propD: {
      type: Number,
      default: 100,
    },
    // 객체/배열의 기본 값은 팩토리 함수에서 반환 되어야 함.
    propE: {
      type: Object,
      default: function () {
        return { message: "hello" };
      },
    },
    // 사용자 정의 유효성 검사 가능
    propF: {
      validator: function (value) {
        return value > 10;
      },
    },
  },
});

/**
 * type은 다음 네이티브 생성자 중 하나를 사용할 수 있음
 *
 * String
 * Number
 * Boolean
 * Function
 * Object
 * Array
 * Symbol
 *
 * 또한, type은 커스텀 생성자 함수가 될 수 있고, assertion은 instanceof 체크로 만들어 짐
 *
 * props 검증 실패시 Vue는 콘솔에서 경고 출력 (개발 빌드 사용하는 경우)
 * props는 컴포넌트 인스턴스가 생성되기 전에 검증되기 때문에 default 또는 validator 함수 내에서
 * data, computed 또는 methods와 같은 인스턴스 속성을 사용할 수 없음.
 */

Vue.component("button-counter", {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0,
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit("increment");
    },
  },
});

new Vue({
  el: "#counter-event-example",
  data: {
    total: 0,
  },
  methods: {
    incrementTotal: function () {
      this.total += 1;
    },
  },
});

Vue.component("currency-input", {
  template:
    '\
     <span>\
      $\
       <input\
        ref="input"\
         v-bind:value="value"\
          v-on:input="updateValue($event.target.value)">\
     </span>\
    ',
  props: ["value"],
  methods: {
    // 값을 직접 업데이트 하는 대신 이 메소드를 사용하여
    // 입력 값에 대한 서식을 지정하고 배치 할 수 있음.
    updateValue: function (value) {
      var formattedValue = value
        // 공백 제거
        .trim()
        // 소수 자릿수 2자리로 줄임
        .slice(
          0,
          value.indexOf(".") === -1 ? value.length : value.indexOf(".") + 3
        );
      // 값이 아직 정규화 되지 않은 경우
      // 이를 수동으로 재정의하여 조건을 충족시킴
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // 입력 이벤트를 통해 숫자 값을 내보냄.
      this.$emit("input", Number(formattedValue));
    },
  },
});

/**
 * # 컴포넌트의 v-model 사용자 정의
 *
 * 기본적으로 컴포넌트의 v-model은 value를 보조 변수로 사용하고 input을 이벤트로 사용하지만
 * 체크박스와 라디오 버튼같은 일부 입력 타입은 다른 목적으로 value 속성을 사용할 수 있음.
 * model 옵션을 사용하면 다음 경우에 충돌을 피할 수 있음.
 */

Vue.component("my-checkbox", {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    // 다른 목적을 위해 'value' prop를 사용할 수 있습니다.
    checked: Boolean,
    value: String,
  },
});

/**
 * # 비 부모-자식간 통신
 *
 * 때로는 두 컴포넌트가 서로 통신 할 필요가 있지만 서로 부모/자식이 아닐 수도 있음.
 * 간단한 시나리오에서는 비어있는 Vue 인스턴스를 중앙 이벤트 버스로 사용할 수 있음.
 */

var bus = new Vue();

// 컴포넌트 A의 메소드
bus.$emit("id-selected", 1);

// 컴포넌트 B의 created 훅
bus.$on("id-selected", function (id) {
  // ...
});

// 보다 복잡한 경우에는 전용 상태 관리 패턴을 고려해야 함.

// 분산된 콘텐츠는 상위 범위에서 컴파일 됨.
Vue.component("child-component", {
  // 이제 작동 함. 올바른 위치에 놓여 있음.
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true,
    };
  },
});

/**
 * 동적 컴포넌트
 *
 * 같은 마운트 포인트를 사용하고 예약된 <component> 엘리먼트를 사용하여
 * 여러 컴포넌트 간에 동적으로 트랜지션하고
 * is 속성에 동적으로 바인드 할 수 있음.
 */

var vm = new Vue({
  el: "#example",
  data: {
    currentView: "home",
  },
  components: {
    home: {
      /**... */
    },
    posts: {
      /**... */
    },
    archive: {
      /**... */
    },
  },
});

// 원하는 경우 컴포넌트 객체에 직접 바인딩 할 수도 있음.
var Home = {
  template: "<p>Welcome home!</p>",
};

var vm = new Vue({
  el: "#example",
  data: {
    currentView: Home,
  },
});
