import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routers/router.js'
import VueResource from 'vue-resource'
import moment from 'moment'
import mui from '@/lib/mui/mui.min.js'
import MintUI from 'mint-ui'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'
import store from './store/index'

import 'mint-ui/lib/style.css'
import './lib/mui/mui.min.css'
import './lib/mui/icons-extra.css'


Vue.config.productionTip = false


// Vue.component(Header.name, Header)
// Vue.component(Button.name, Button);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload)

Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VuePreview)
Vue.use(Vuex)
//Vue.use(mui)

Vue.http.options.root='http://www.liulongbin.top:3005'; //to visit http, we have to put this after VueResource
Vue.http.options.emulateJSON=true

Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

 Vue.prototype.mui=mui

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
