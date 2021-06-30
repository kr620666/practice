var vm = new Vue({
  el: "#practice",
  data: {
    isActive: true,
    hasError: false,
    classObject: {
      active: true,
      "text-danger": false,
    },
  },
});

var vm1 = new Vue({
  el: "#practice2",
  data: {
    isActive: true,
    error: null,
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal",
      };
    },
  },
});

var vm2 = new Vue({
  el: "#list",
  data: {
    activeClass: "active",
    errorClass: "text-danger",
  },
});

Vue.component("my-component", {
  template: '<p class="foo bar">Hi</p>',
});

var vm3 = new Vue({
  el: "#inlineStyle",
  data: {
    activeColor: "purple",
    fontSize: 40,
    styleObject: {
      color: "red",
      fontSize: "13px",
    },
  },
});
