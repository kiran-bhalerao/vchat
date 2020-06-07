import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import "./assets/styles/index.css";
import router from "./router";

Vue.use(firestorePlugin);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
