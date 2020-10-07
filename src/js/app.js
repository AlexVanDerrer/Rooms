// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// import VueWebsocket from "vue-websocket";

// Vue.use(VueWebsocket, "wss://localhost:3000");

import { createStore } from '../store/index.js';

// Init App
new Vue({
  el: '#app',
  store: createStore(),
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});