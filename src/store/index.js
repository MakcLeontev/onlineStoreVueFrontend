import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({
  modules: {
    auth,
  },
  state:{
    basketList:[],

  },
  mutations:{
    ADD_ITEM_TO_CART(state, item) {
      state.basketList.push(item);
    },

  },
  getters:{
    cartItems(state) {
      return state.basketList
    },
  }

});

export default store;