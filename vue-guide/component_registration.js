/**
 * 컴포넌트 등록
 *
 * 컴포넌트 이름
 * 컴포넌트를 등록할 때는 항상 이름을 지어줘야 함.
 * 예를 들어 전역등록
 */

Vue.component("my-component-name", {
  /** ...  */
});

/**
 * 컴포넌트의 이름은 Vue.component의 첫번째 인자
 *
 * 컴포넌트에 부여한 이름은 그 컴포넌트를 어디에 쓸지에 따라 다를 수 있음.
 * 컴포넌트를 (스트링 템플릿이나 싱글파일 컴포넌트로 사용하지 않고)
 * DOM에서 바로 사용할 때는 W3C 규칙에 따라서 사용자 정의 태그의 이름처럼 씀.
 * ( 모두 소문자로 쓰고 단어는 하이픈으로 연결 ) -> HTML 엘리먼트와 충돌하는 것 피함.
 */

/**
 * # 이름 표기법
 *
 * 1. 케밥 표기법
 * 케밥표기법으로 컴포넌트를 정의할 때는 사용자 정의 엘리먼트를 부를 때에도
 * <my-component-name> 과 같이 반드시 케밥 표기법을 사용해야 함.
 */
Vue.component("my-component-name", {
  /** ... */
});

/**
 * 2. 파스칼표기법
 * 파스칼표기법으로 컴포넌트를 정의할 때는 사용자 정의 엘리먼트를 부를 때
 * 두 가지 표기법 모두 사용할 수 있음.
 * 즉, <my-component-name>과 <MyComponentName> 둘다 괜찮음.
 * 단, DOM에 바로 쓸 때는 케밥 표기법 이름만 가능.
 */

/**
 * 전역 등록
 */

Vue.component("my-component-name", {
  // ... options ...
});
// 위는 전역 등록 된 컴포넌트. 즉, 어떤 루트 Vue 인스턴스(new Vue)에서도 사용할 수 있는 것.

Vue.component("component-a", {
  /** ... */
});
Vue.component("component-b", {
  /** ... */
});
Vue.component("component-c", {
  /** ... */
});

new Vue({ el: "#app" });

/**
 * 지역 등록
 *
 * 전역등록이 좋기만 한 것은 아님.
 * 예를들어 웹팩 같은 빌드 시스템을 사용하고 모든 컴포넌트를 전역 등록했으면,
 * 어떤 컴포넌트를 더이상 사용하지 않더라도 최종 빌드에는 등러가 있게 됨.
 * 사용자가 내려받아야 하는 자바스크립트의 양이 불필요하게 커짐.
 * 이 경우에 컴포넌트를 일반 자바스크립트 객체로 정의.
 */
var ComponentA = {
  /** ...  */
};
var ComponentB = {
  /** ...  */
};
var ComponentC = {
  /** ...  */
};

// -> 사용할 컴포넌트 들만 components 옵션을 통해 쓸 수 있음.

new Vue({
  el: "#app",
  components: {
    "component-a": ComponentA,
    "component-b": ComponentB,
  },
});

/**
 * components 객체의 각 속성에서 키가 커스텀 엘리먼트의 이름이 되고 밸류가 사용할 컴포넌트 객체를 지정
 *
 * 지역 등록된 컴포넌트는 하위 컴포넌트에서는 사용이 불가능 함.
 * 예를 들어, ComponentA를 ComponentB에서 쓰고 싶다면
 */

var ComponentA = {
  /** ... */
};

var ComponentB = {
  components: {
    "component-a": ComponentA,
  },
};

// 바벨이나 웹팩을 이용해 ES2015적용하고 있다면 싱글파일 컴포넌트를 이용하여
import ComponentA from "./ComonentA.vue";

export default {
  components: {
    ComponentA,
  },
  // ...
};

/**
 * ES2015 이상에서는 객체 내의 components 옵션에서 ComponentA: ComponentA 라고 하지 않고
 * ComponentA라고만 해도 됨.
 * 즉, 키로 아래의 두가지가 모두 가능 함.
 * (component-a: ComponentA, ComponentA: ComponentA, ComponentA 모두 가능)
 *
 * - 템플릿에서 사용할 사용자 정의 엘리먼트 이름
 * - 컴포넌트 옵션에 들어갈 변수명
 */

/**
 * [모듈 시스템]
 * import/require를 이용한 모듈 시스템
 *
 * # 모듈 시스템에서 컴포넌트를 다른 컴포넌트에 지역적으로 등록하기
 *
 * 바벨이나 웹팩 사용시 components 디렉토리를 만들고 각 컴포넌트를 그 자체로
 * 하나의 파일에 관리해야 함.
 * 어떤 컴포넌트를 다른 컴포넌트에 지역적으로 등록하기 전에 사용할 컴포넌트를 가져와야 함.
 * 예를 들면 ComponentB.js나 ComponentB.vue 같은 파일에서 아래처럼 다른 컴포넌트를 가져오는 것.
 *
 */

import ComponentA from "./ComponentA";
import ComponentC from "./ComponentC";

export default {
  components: {
    ComponentA,
    ComponentC,
  },
  // ...
};

// 이제 ComponentA와 ComponentC 모두 ComponentB의 템플릿에서 사용 가능

/**
 * # 기본 컴포넌트를 자동으로 전역 등록하기
 *
 * 많은 컴포넌트들은 여기저기서 쓰이고 입력값이나 버튼 하나로 구성될 수도 있음.
 * 이런 컴포넌트는 기본 컴포넌트라고 하고 여러 컴포넌트들에서 매우 빈번하게 사용.
 *
 * 많은 컴포넌트에서 긴 기본 컴포넌트 목록을 보게됨.
 */
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput,
  },
};

// 템플릿에서는 좀 더 짧은 마크업을 사용할 수 있음.

/** 웹 팩을 쓴다면 (Vue CLI 3+은 내장 ) require.context를 써서 자주 쓰는
 * 기본 컴포넌트들을 전역 등록 할 수 있음.
 * 아래 예시는 어플리케이션의 엔트리 파일(e.g. src/main.js)에 기본 컴포넌트들을 전역적으로 불러오는 코드
 */

import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  // 컴포넌트들이 있는 폴더
  "./components",
  // 하위 폴더까지 포함할 지 여부
  false,
  // 기본 컴포넌트를 찾는데 사용할 정규 표현식
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // 컴포넌트 설정 가져오기
  const componentConfig = requireComponent(fileName);

  // 컴포넌트의 파스칼표기법 이름 가져오기
  const componentName = upperFirst(
    camelCase(
      // 폴더 위치와 무관하게 파일이름 추출
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // 컴포넌트를 전역적으로 등록
  Vue.component(
    componentName,
    // 'export default'를 이용한 컴포넌트는 '.default'로 컴포넌트
    // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
    componentConfig.default || componentConfig
  );
});

// 전역 등록은 (new Vue 로) 루트 Vue 인스턴스가 만들어지기 전에 반드시 이뤄져야 한다는 것.
