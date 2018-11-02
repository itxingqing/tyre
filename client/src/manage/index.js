import Vue from 'vue';
import App from './App';
// import VueRouter from 'vue-router';
import { router } from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './config/icon'

//api
import api from '@manage/api';
Vue.use(api);

//fontawesom---
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
//fontawesom---

// Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
