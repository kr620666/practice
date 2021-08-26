import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.use(VueRouter);

Vue.config.productionTip = false;

// 1. 라우트 컴포넌트를 정의하세요.
// 아래 내용들은 다른 파일로부터 가져올 수 있습니다.
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

// 2. 라우트를 정의하세요.
// Each route should map to a component. The "component" can
// 각 라우트는 반드시 컴포넌트와 매핑되어야 합니다.
// "component"는 `Vue.extend()`를 통해 만들어진
// 실제 컴포넌트 생성자이거나 컴포넌트 옵션 객체입니다.
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];

// 3. `routes` 옵션과 함께 router 인스턴스를 만드세요.
// 추가 옵션을 여기서 전달해야합니다.
// 지금은 간단하게 유지하겠습니다.

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
};

const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: User,
      children: [
        {
          // /user/:id/profile 과 일치 할 때
          // UserProfile은 User의 <router-view> 내에 렌더링 됩니다.
          path: "profile",
          component: UserProfile,
        },
        {
          // /user/:id/posts 과 일치 할 때
          // UserPosts가 User의 <router-view> 내에 렌더링 됩니다.
          path: "posts",
          component: UserPosts,
        },
      ],
    },
  ],
});
// 4. 루트 인스턴스를 만들고 mount 하세요.
// router와 router 옵션을 전체 앱에 주입합니다.
const app = new Vue({
  router,
}).$mount("#app");

// 이제 앱이 시작됩니다!
