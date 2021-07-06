var example1 = new Vue({
  el: "#example-1",
  data: {
    items: [{ message: "Foo" }, { message: "Bar" }],
  },
});

var example2 = new Vue({
  el: "#example-2",
  data: {
    parentMessage: "Parent",
    items: [{ message: "Foo" }, { message: "Bar" }],
  },
});

new Vue({
  el: "#v-for-object",
  data: {
    object: {
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2021-06-30",
    },
  },
});

/* 
  배열 변경 감지

  # 변이 메소드
  Vue는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거
  래핑된 메소드
  - push()
  - pop()
  - shift()
  - unshift()
  - splice() 
  - sort()
  - reverse()

  콘솔에 이전 예제의 items 배열로 변이 메소드를 호출하여 재생 가능
  example1.items.push({ message: 'Baz' })

  # 배열 대체

  변이 메소드는 호출된 원본 배열을 변형함.
  변형하지 않는 방법 filter(), concat(), slice()
  원본 배열을 변형하지 않고 항상 새 배열을 반환함.
  변형이 없는 방법으로 작업할 때 이전 배열을 새 배열로 바꿀 수 있음.

  배열을 겹치는 객체가 포함 된 다른 배열로 대체하여 효율적임.

  # 주의 사항

  JavaScript의 제한으로 배열에 대해 변경사항을 감지할 수 없는 것.
  1. 인덱스로 배열에 있는 항목을 직접 설정하는 경우
      ex) vm.items[indexOfItem] = newValue
  2. 배열 길이를 수정하는 경우
      ex) vm.items.length = newLength
  */

example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/);
});

var vm = new Vue({
  data: {
    items: ["a", "b", "c"],
  },
});

vm.items[1] = "x"; // reactive하지 않음.
vm.items.length = 2; // reactive하지 않음.

// Vue.set
Vue.set(vm.items, indexOfItem, newValue);

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue);

// 인스턴스 메소드 vm.$set을 사용할 수 있음. ( 전역 Vue.set의 별칭임 )
vm.$set(vm.items, indexOfItem, newValue);

// 주의 사항 중 2번을 극복하기 위해 splice를 사용해야 함.
vm.items.splice(newLength);

/**
 * 객체 변경 감지에 관한 주의사항
 *
 * JavaScript의 한계로 Vue는 속성 추가 및 삭제를 감지하지 못함.
 */

var vm = new Vue({
  data: {
    a: 1,
  },
});
// 'vm.a'는 반응형

vm.b = 2;
// 'vm.b'는 반응형이 아님.

/**
 * Vue는 이미 만들어진 인스턴스에 새로운 루트 레벨의 반응형 속성을 동적으로
 * 추가하는 것을 허용하지 않음.
 * 그러나.
 * Vue.set(object, propertyName, value) 메소드를 사용하여 중첩된 객체에
 * 반응형 속성을 추가할 수 있음.
 */

var vm = new Vue({
  data: {
    userProfile: {
      name: "Anika",
    },
  },
});

// 중첩된 userProfile 객체에 새로운 속성 age를 추가.
vue.set(vm.userprofile, "age", 27);

// 인스턴스 메소드인 vm.$set을 사용할 수도 잇음. Vue.set의 별칭임.
vm.$set(vm.userProfile, "age", 27);

// 때로는 Object.assign() 이나 _.extend()를 사용해 기존의 객체에 새 속성을
// 할당할 수 잇음. 두 객체의 속성을 사용해 새 객체를 만들어야 함.
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: "Vue Green",
});

/**
 * 필터링 / 정렬 된 결과 표시하기
 *
 * 때로 원본 데이터를 실제로 변경하거나 재설정하지 않고 배열의 필터링 된 버전이나
 * 정렬된 버전을 표시해야 할 필요가 있습니다. 이 경우 필터링 된 배열이나
 * 정렬된 배열을 반환하는 계산된 속성을 만들 수 있습니다.
 */

var vm = new Vue({
  el: "#filtering",
  data: {
    numbers: [1, 2, 3, 4, 5],
  },
  computed: {
    evenNumers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0;
      });
    },
  },
});

var vm = new Vue({
  el: "#filtering2",
  data: {
    numbers: [1, 2, 3, 4, 5],
  },
  methods: {
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0;
      });
    },
  },
});
