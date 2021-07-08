/**
 * [Prop 대소문자 구분 (camelCase vs kebab-case)]
 *
 * HTML 어트리뷰트는 대소문자 구분이 없기 때문에 브라우저는 대문자를 소문자로
 * 변경하여 읽음.
 * 그래서 카멜케이스로 prop의 이름을 정한 경우에
 * DOM 템플릿 안에서는 케밥 케이스를 사용해야 올바르게 동작 함.
 * (문자열 템플릿 사용하는 경우에는 무관.)
 */
Vue.component("blog-post", {
  // JavaScript에서의 camelCase
  props: ["postTitle"],
  template: "<h3>{{ postTitle }}</h3>",
});

/**
 * [Prop 타입]
 *
 * prop에 특정 타입의 값을 넣고 싶은 경우
 * prop을 속성 이름과 타입을 포함하는 오브젝트로 선언함으로써
 * 타입이 지정되 ㄴprop의 리스트를 구현할 수 있음.
 */
Vue.component({
  props: ["title", "likes", "isPublished", "commentIds", "author"],
});

Vue.component({
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commnetIds: Array,
    author: Object,
    callback: Function,
    contactsPromis: Promise, // or any other constructor
  },
});

/**
 * 컴포넌트를 읽기 좋게 문서화 + 브라우저의 자바스크립트 콘솔에서도
 * 잘못된 타입이 전달 된 경우 경고를 띄워줄 수 있도록 함.
 */

/**
 * # 오브젝트의 속성(Properties) 전달
 *
 * 오브젝트의 모든 속성을 전달하길 원하는 경우, v-bind:prop-name 대신 v-bind 만
 * 작성함으로써 모든 속성을 prop으로 전달할 수 있음.
 */

Vue.component({
  post: {
    id: 1,
    title: "My Journey with Vue",
  },
});

/**
 * [단방향 데이터 흐름]
 *
 * 모든 prop들은 부모와 자식 사이에 단방향으로 내려가는 바인딩 형태를 취함.
 * 부모의 속성이 변경되면 자식 속성에게 전달 됨.
 * 반대 방향으로는 안됨.
 * 자식의 데이터가 부모에게 전달되는 것을 막는 것은
 * 자식요소가 의도치 않게 부모 요소의 상태를 변경함으로써
 * 앱의 데이터 흐름을 이해하기 어렵게 만드는 일을 막기 위해서.
 *
 * 또, 부모 컴포넌트가 업데이트 될 때마다 자식 요소의 모든 prop들이 최신 값으로 새로고침 됨.
 * -> 사용자가 prop을 자식 컴포넌트 안에서 수정해서는 안된 다는 것.
 * 만약, 수정을 시도하는 경우, Vue는 콘솔에 경고 표시함.
 *
 * 아래 두 경우가 주로 prop을 직접 변경하고 싶을 수 있는 상황의 예시임.
 *
 * 1. prop은 초기값만 전달. 자식 컴포넌트는 그 초기값을 로컬 데이터 속성으로 활용하고 싶은 경우
 * -> 해당 경우는 로컬 데이터 속성을 따로 선언하고 그 속성의 초기값으로써 prop을 사용하는 것이 바람직.
 */

Vue.component({
  props: ["initialCounter"],
  data: function () {
    return {
      counter: this.initialCounter,
    };
  },
});

/**
 * 2. 전달 된 prop의 형태를 바꾸어야 하는 경우
 * -> computed 속성을 사용.
 */

Vue.component({
  props: ["size"],
  computed: {
    normalizedSize: function () {
      return this.normalizedSize.trim().toLowerCase();
    },
  },
});

/**
 * 자바스크립트 오브젝트나 배열을 prop으로 전달하는 경우, 객체를 복사하는 것이 아니라 참조.
 * 즉, 전달받은 오브젝트나 배열을 수정하게 되는경우,
 * 자식 요소가 부모 요소의 상태를 '변경' 하게 될 것.
 */

/**
 * [Prop 유효성 검사]
 *
 * 컴포넌트는 prop의 유효성 검사를 위해 요구사항을 특정할 수 있음.
 * 요구사항이 충족되지 않는 경우 Vue는 브라우저의 자바스크립트 콘솔을 통해 경고를 표시함.
 * -> 다른 사람들도 사용하는 컴포넌트를 개발하는 경우 유용.
 *
 * Prop들의 유효성 검사를 위해 prop의 값에 배열이나 문자열 대신 오브젝트를 삽입 할 수 있음.
 */

Vue.component("my-component", {
  props: {
    // 기본타입 체크 ('Null'이나 'undefined'는 모든 타입을 허용함.)
    propA: Number,
    // 여러 타입 허용
    propB: [String, Number],
    // 필수 문자열
    propC: {
      type: String,
      required: true,
    },
    // 기본값이 있는 숫자
    propD: {
      type: Number,
      default: 100,
    },
    // 기본값이 있는 오브젝트
    propE: {
      type: Object,
      // 오브젝트나 배열은 꼭 기본값을 반환하는 팩토리 함수의 형태로 사용되어야 함.
      default: function () {
        return { message: "hello" };
      },
    },
    // 커스텀 유효성 검사 함수
    propF: {
      validator: function (value) {
        // 값이 항상 아래 세 개의 문자열 중 하나여야 함.
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      },
    },
  },
});

/**
 * Props 유효성 검사가 실패하는 경우, Vue는 콘솔에 주의 메세지를 띄움 (개발용 빌드 사용 중인 경우)
 *
 * prop의 유효성 검사는 컴포넌트 인스턴스가 생성되기 전에 일어남.
 * 즉, 인스턴스의 값(e.g. `data`, `computed`, 등등)은
 * `default`나 `validator`함수 안에 사용 될 수 없음.
 */

/**
 * # Type Checks
 *
 * type은 아래에 있는 네이티브 생성자중 하나가 될 수 있음.
 * String
 * Number
 * Boolean
 * Array
 * Object
 * Date
 * Function
 * Symbol
 *
 * 또한, type에는 커스텀 생성자가 사용될 수도 있음.
 * 확인은 instanceof를 통해 이루어짐
 */

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Vue.component("blog-post", {
  props: {
    author: Person,
  },
});

// author prop이 new Person으로 생성된 값인지 확인 할 수 있음.

/**
 * 
    # 속성 상속 비활성화

    컴포넌트의 루트 엘리먼트가 상속된 속성을 갖지 않기를 원하는 경우,
    컴포넌트에 inheritAttrs: false 옵션을 줄 수 있음.
 */

Vue.component("my-component", {
  inheritAttrs: false,
  // ...
});

// 이는 컴포넌트에 전달된 속성으 이름과 값을 가지고 있는 인스턴스 속성인
