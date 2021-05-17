import Vue from 'vue'
import Vuex from 'vuex'
import {
	user_register
} from '../api'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		registerInfo: {

		},
		userInfo: {
			
		},
		MsgIncr: 0,
		seq: 0

	},
	mutations: {
		getRegisterInfo(state, data) {
			state.registerInfo = data
		},
		UserInfoValue(state, data) {
			state.userInfo = data
		},
		MsgIncrAdd(state) {
			state.MsgIncr = state.MsgIncr + 1
			console.log(state.MsgIncr, "MsgIncr值")
		},
		seqValue(state, data) {
			state.seq = data.Data.Seq
			console.log(state.seq, "seq值")
		}

	},
	actions: {
		setSeq(state, data) {
			that.websockets.ws.send(data);
			that.websockets.ws.onmessage = function(res) {
				console.log(JSON.parse(res.data), "接收最新seq")
			}
		}
	}

})
export default store
