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

import VueSocketIO from 'vue-socket.io'

import { store } from '../store/index.js';

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.0.15:3000', // http://localhost:3000
  vuex: {
      store: store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

// Init App
new Vue({ 
  el: '#app',
  store: store,
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});