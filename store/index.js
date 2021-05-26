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
			//address,mnemonic,publicKey
		},
		userInfo: {
			//address,mnemonic,publicKey
		},
		token: "",
		MsgIncr: 1,
		seq: 0,
		recentMessages: [],
		newInfoJudgeValue: 0,
		latestNews: {},
		reconnectionTimes: 0,
		isLogin:false
	},
	mutations: {
		getRegisterInfo(state, data) {
			state.registerInfo = data
		},
		UserInfoValue(state, data) {
			state.userInfo = data
		},
		getToken(state, data) {
			state.token = data
		},
		MsgIncrAdd(state) {
			state.MsgIncr = state.MsgIncr + 1
			// console.log(state.MsgIncr, "MsgIncr值")
		},
		seqValue(state, data) {
			state.seq = data
			// console.log(state.seq, "seq值")
		},
		getRecentMessages(state, data) {
			state.recentMessages = data
		},
		newInfoJudge(state, data) {
			state.newInfoJudgeValue = state.newInfoJudgeValue + 1
			console.log(state.newInfoJudgeValue, "有新消息")
		},
		getLatestNews(state, data) {
			state.latestNews = data
			console.log(state.latestNews, "新消息内容")
		},
		addReconnectionTimes(state, data) {
			state.reconnectionTimes = state.reconnectionTimes + 1
			
		},
		logOn(state, data) {
			state.isLogin = true
		},
		
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
