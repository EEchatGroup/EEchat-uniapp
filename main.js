import Vue from 'vue'
import App from './App'
import store from './store'
import websockets from 'websockets'

Vue.prototype.websockets = websockets
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
