import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { router, navList } from './router';
// import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

// console.log('***************');
// console.log(navList);
// console.log(router)

new Vue({
	el: '#app',
	router,
	// store,
	template: '<App/>',
	components: { App }
})
