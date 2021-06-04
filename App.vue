<script>
	import store from 'store/index.js'
	// import ws from './websockets/index.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			//深拷贝
			deepClone(obj) {
				let _obj = JSON.stringify(obj)
				return JSON.parse(_obj);
			},
			linkWS() {
				let that = this;
				that.ws = new WebSocket('ws://47.112.160.66:7778?token=' + uni.getStorageSync('token') +
					'&sendID=' + that.$store.state.userInfo.address + '&platformID=5');
				that.websockets.setWs(that.ws);
				that.ws.onopen = function(evt) {
					console.log("打开ws链接");
				}

				// console.log(that.$store.state.userInfo.mnemonic.toString().replace(/\s*/g, ""), "xxxxxxxxx")
				that.ws.onmessage = function(evt) {
					let msgReceive = JSON.parse(evt.data)
					console.log(msgReceive, "新接收的推送消息")
					console.log(evt.data, "新接收的推送消息")
					
					that.$store.commit("newInfoJudge")
					that.$store.commit("getLatestNews", msgReceive.data)
					
					let localMessage = uni.getStorageSync(that.$store.state.userInfo.address + 'localMessage');
					for (let i = 0; i < localMessage.length; i++) {
						
							if (localMessage[i].id == msgReceive.data.sendID) {
								localMessage[i].list = localMessage[i].list.concat(msgReceive.data)
								console.log(localMessage,"wswswswswswsws")
								try {
									uni.setStorageSync(that.$store.state.userInfo.address + 'localMessage',localMessage);
									uni.setStorageSync(that.$store.state.userInfo.address + 'latestSeq',msgReceive.data.seq);
								} catch (e) {
									// error
								}
								
							}
						
					}






				}
				that.ws.onclose = function(event) {
					if (that.$store.state.reconnectionTimes == 2) {
						uni.showToast({
							title: 'connection failed',
							icon: "none",
							duration: 2000
						});
						return
					}
					console.log(event, '聊天服务器连接失败');
					if (event) {
						that.$store.commit('addReconnectionTimes')
						setTimeout(() => {
							that.linkWS()
						}, 3000)
					}
				};
				/* that.ws.onerror = function(event) {
					if (that.$store.state.reconnectionTimes == 5) {
						uni.showToast({
							title: 'connection failed',
							icon: "none",
							duration: 2000
						});
						return
					}
					console.log(event, '聊天服务器连接错误');
					if (event) {
						that.$store.commit('addReconnectionTimes')
						setTimeout(() => {
							that.linkWS()
						}, 3000)
					}
				}; */
			}
		},
		mounted() {

		},
		onLaunch: function() {

		},
		onShow: function() {},
		onHide: function() {},
		watch: {
			//深度监听
			"$store.state.isLogin": {
				deep: true, //深度监听设置为 true
				handler: function(newVal, oldVal) {
					this.linkWS()
				}
			}
		}

	}
</script>

<style>
	page {
		height: 100% !important;
	}
	.uni-navbar {
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
	}
</style>
