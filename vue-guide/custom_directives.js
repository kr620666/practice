/**
 * 사용자 지정 디렉티브
 *
 * Vue는 코어에 포함된 기본 디렉티브 세트(v-model과 v-show)외에도 사용자 정의
 * 디렉티브를 등록 할 수 있음.
 * Vue.2.0에서 코드 재사용 및 추상화의 기본 형식은 컴포넌트 임.
 * 그러나, 일반 엘리먼트에 하위 수준의 DOM 액세스가 필요한 경우가 있을 수 있음.
 * -> 사용자 지정 디렉티브가 여전히 유용.
 * 다음은 input 엘리먼트와 focusing에 대한 예제
 *
 * 페이지가 로드되면 해당 엘리먼트는 포커스를 얻음.
 */

// 전역 사용자 정의 디렉티브 v-focus 등록
Vue.directive("focus", {
  // 바인딩 된 엘리먼트가 DOM에 삽입 되었을 때..
  inserted: function (el) {
    // 엘리먼트에 포커스를 줌.
    el.focus();
  },
  // 지시어를 로컬로 등록하기 위해서 컴포넌트는 diretives 옵션 허용
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function (el) {
        el.focus();
      },
    },
  },
});

// 그런 다음 템플릿에서 다음과 같이 모든 요소에서 새로운 v-focus 속성 사용 가능
// <input v-focus>

/**
 * 훅 함수
 *
 * 디렉티브 정의 객체는 여러가지 훅 함수를 제공할 수 있음. (선택)
 *
 * bind: 디렉티브가 처음 엘리먼트에 바인딩 될 때 한번만 호출 됨. 일회성 설정 가능
 * inserted: 바인딩 된 엘리먼트가 부모 노드에 삽입 되었을 때 호출됨.
 *           부모 노드 존재를 보장하며 반드시 document 내에 있는 것은 아님.
 * update : 포함하는 컴포넌트가 업데이트 된 후 호출 됨.
 *          그러나 자식이 업데이트 되기 전일 가능성이 있음.
 *          디렉티브의 값은 변경되거나 변경되지 않았을 수 있지만 바인딩의
 *          현재 값과 이전 값을 비교하여 불필요한 업데이트를 건너 뛸 수 있음.
 * componentUpdated : 포함하고 있는 컴포넌트와 그 자식들이 업데이트 된 후에 호출 됨.
 * unbind : 디렉티브가 엘리먼트로부터 언바인딩 된 경우에만 한번 호출.
 *
 * 다음 섹션에서 이 훅으로 전달 된 인자 (예: binding, vnode 및 oldVnode )
 *
 * 디렉티브 훅 전달인자
 *
 * 디렉티브 훅은 다음을 전달인자로 사용 할 수 있음.
 * el : 디렉티브가 바인딩 된 엘리먼트. 이 것을 사용하면 DOM 조작 가능
 * binding: 아래의 속성을 가진 객체
 *  - name : 디렉티브 이름, v- 프리픽스 없음
 *  - value : 디렉티브에서 전달받은 값, 예를들어 v-my-directive="1+1" 인 경우 value = 2
 *  - oldValue : 이전 값, update와 componentUpdated 에서만 사용할 수 있음.
 *               이를 통해 값이 변경 되었는지 확인 할 수 있음.
 *  - expression :  표현식 문자열, 예를 들어 v-my-directive="1+1" 이면, 표현식은 "1 + 1"
 *  - arg : 디렉티브의 전달인자, 있는 경우에만 존재. 예를 들어 v-my-directive.foo.bar 이면,
 *          수식어 객체는 {  foo: true, bar: true }
 *  - vnode: Vue 컴파일러가 만든 버추얼 노드
 *  - oldVnode: 이전의 버추얼 노드, update와 componentUpdated에서만 사용 가능
 *
 * `el` 뿐 만 아니라 모든 전달인자는 읽기 전용으로 사용하여야 함.
 * 절대 변경하면 안됨. 훅을 통해 이 정보들을 전달하는 경우 엘리먼드 [dataset]이용
 *
 * 위 특성 중 일부를 사용하는 사용자 정의 디렉티브 예제
 * <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
 */

Vue.directive("demo", {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify;
    el.innerHTML =
      "name: " +
      s(binding.name) +
      "<br>" +
      "value: " +
      s(bingding.value) +
      "<br>" +
      "expression: " +
      s(binding.expression) +
      "<br>" +
      "argument: " +
      s(binding.arg) +
      "<br>" +
      "modifiers: " +
      s(binding.modifiers) +
      "<br>" +
      "vnode keys: " +
      Object.keys(vnode).join(", ");
  },
});

new Vue({
  el: "#hook-arguments-example",
  data: {
    message: "hello!",
  },
});

/**
 * # 다이나믹 디렉티브 전달인자
 *
 * 디렉티브 전달인자는 다이나믹 할 수 있다. io v-mydirective:[argurment]='value',
 * 전달인자는 업데이트 될 수 있다. data properties 에 기반하여. 컴포넌트 인스턴스 안에서.
 * 이것은 커스텀 디렉티브가 유연하게 만들어준다 어플리케이션을 사용함으로써.
 *
 * 커스텀 디렉티브 만들기를 원한다고 말해보자. 엘리멘트를 고정할 수 있게 만들어주는
 * 너의 페이지에.
 * <div id="baseexample">
 *  <p>Scroll down the page</p>
 *  <p v-pin="200">Strick me 200px from the top of the page</p>
 * </div>
 */

Vue.directive("pin", {
  bind: function (el, binding, vnode) {
    el.style.position = "fixed";
    el.style.top = binding.value + "px";
  },
});

new Vue({
  el: "#baseexaple",
});

/**
 * 함수 약어
 *
 * 많은 경우에, bind와 update에서 같은 동작이 필요할 수 있다.
 * 그러나 다른 훅은 신경 쓸 필요가 없다.
 */

Vue.directive("color-swatch", function (el, binding) {
  el.style.backroundColor = binding.value;
});

/**
 * 객체 리터럴
 *
 * 디렉티브에 여러 값이 필요한 경우, JavaScript 객체 리터럴을 전달할 수도 있다.
 * 디렉티브는 유효한 JavaScript 표현식을 사용할 수 있다.
 *
 * <div v-demo="{ color: 'white', text: 'hello!' }"></div>
 */

Vue.directive("demo", function (el, binding) {
  console.log(binding.value.color); // => 'white'
  console.log(binding.value.text); // => 'hello!'
});
