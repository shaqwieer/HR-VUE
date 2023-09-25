import { createStore } from "vuex";


// import productsModule from "./modules/products";
// import cartModule from "./modules/cart.js";
const store = createStore({
  // modules: {
  //   prods: productsModule,
  //   cart: cartModule,
  // },
  state() {
    return {
      checked: false,
      isAuthenticated:false
    }
  },
   mutations: {
    toggleChecked(state,payload) {
      state.checked=payload;
    },
    isAuthenticated(state,payload){
      state.isAuthenticated=payload;
    }
  },
  //   light() {
  //     PrimeVue.changeTheme('theme', 'themeLight', 'themeLink');
  //   },

  //   dark() {
  //     PrimeVue.changeTheme('themeLight', 'theme', 'themeLink');

  //   },
  // },
  // actions: {
  //   light(context) {
  //     context.commit("light");
  //   },
  //   dark(context) {
  //     context.commit("dark");
  //   },
  getters: {
    checked(state) {
      return state.checked;
    },
    isAuthenticated(state){
      return state.isAuthenticated;
    }
  }
});
export default store;
