<script>
	import store from 'store/index.js'
	// import ws from './websockets/index.js'
	export default {
		data() {
			return {}
		},
		methods: {
			//深拷贝
			deepClone(obj) {
				let _obj = JSON.stringify(obj)
				return JSON.parse(_obj);
			},
			linkWS() {
				let that = this;
				that.ws = new WebSocket('ws://47.112.160.66:7778?token=' + sessionStorage.getItem("token") +
					'&sendID=' + that.$store.state.userInfo.address + '&platformID=5');
				that.websockets.setWs(that.ws);
				that.ws.onopen = function(evt) {
					console.log("打开ws链接");
				}

				// console.log(that.$store.state.userInfo.mnemonic.toString().replace(/\s*/g, ""), "xxxxxxxxx")
				that.ws.onmessage = function(evt) {
					let msgReceive = JSON.parse(evt.data)
					console.log(msgReceive, "新接收的推送消息")
					that.$store.commit("newInfoJudge")
					that.$store.commit("getLatestNews", msgReceive.data)

				}
				that.ws.onclose = function(event) {
					console.log(event, '聊天服务器连接失败');
					if (event) {
						setTimeout(() => {
							that.linkWS()
						}, 3000)
					}
				};
				that.ws.onerror = function(event) {
					console.log(event, '聊天服务器连接错误');
					if (event) {
						setTimeout(() => {
							that.linkWS()
						}, 3000)
					}
				};
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
			"$store.state.userInfo": {
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

	/*每个页面公共css */
</style>
