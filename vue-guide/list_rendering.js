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
