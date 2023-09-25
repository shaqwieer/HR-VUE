import { createRouter, createWebHistory } from "vue-router";

import loginPage from "./pages/loginPage.vue";
import mainPage from "./pages/mainPage.vue";
import profilePage from "./pages/profilePage.vue";
import store from "./store/index.js";

// import UserCart from './pages/UserCart.vue';
// import ShopAdmin from './pages/ShopAdmin.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: loginPage ,  beforeEnter(to,from,next){
      if(from.fullPath==='/main'&&store.getters.isAuthenticated)next('/main')
      else next();
    }},
    { path: "/main", component: mainPage 
},
    { path: "/main/:profileId", component: profilePage, props: true },
    { path: "/:notFound(.*)", redirect: "/login" },
    // { path: '/admin', component: ShopAdmin },
  ],
});
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  // next()
  if (to.fullPath !== "/login" && !store.state.isAuthenticated)
    next({ fullPath: "/login" });
  
  else next();
});

export default router;
