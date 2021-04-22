import Vue from 'vue'
import Vuex from 'vuex'
import {
	loginApi
} from '../api'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		userInfo: {
			token: {
				accessToken: ""
			},
			SendID: ""
		}

	},
	mutations: {
		UserInfoValue(state, data) {
			state.userInfo = data
			console.log(state.userInfo)
		}
	},
	actions: {
		getUserInfo(store, data) {
			loginApi(data).then(res => {
				res.data.data.optionID = data.optionID
				res.data.data.accountAddr = data.accountAddr
				store.commit("UserInfoValue", res.data.data)
				if (res.data.errorCode == 0) {
					uni.switchTab({
						url: './home'
					})
				}
			})
		}
	}

})
export default store
