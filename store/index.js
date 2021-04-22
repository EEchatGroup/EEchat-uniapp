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
		},
		MsgIncr: 0,
		seq:0

	},
	mutations: {
		UserInfoValue(state, data) {
			state.userInfo = data
			console.log(state.userInfo,"userInfo")
		},
		MsgIncrAdd(state) {
			state.MsgIncr = state.MsgIncr + 1 
			console.log(state.MsgIncr,"MsgIncr值")
		},
		seqValue(state,data){
			state.seq = data.Data.Seq
			console.log(state.seq,"seq值")
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
		},
		setSeq(state, data) {
			that.websockets.ws.send(data);
			that.websockets.ws.onmessage = function(res) {
				console.log(JSON.parse(res.data), "接收最新seq")
			}
		}
	}

})
export default store
