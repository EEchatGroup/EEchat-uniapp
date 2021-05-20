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
					let that = this;
					that.ws = new WebSocket('ws://47.112.160.66:7778?token=' + sessionStorage.getItem("token") +
						'&sendID=' + that.$store.state.userInfo.address + '&platformID=5');
					that.websockets.setWs(that.ws);
					that.ws.onopen = function(evt) {
						console.log("打开ws链接");
					}

					// console.log(this.$store.state.userInfo.mnemonic.toString().replace(/\s*/g, ""), "xxxxxxxxx")
					that.websockets.ws.onmessage = function(evt) {
						let msgReceive = JSON.parse(evt.data)
						console.log(msgReceive, "新接收的推送消息")
						let messages = that.deepClone(that.$store.state.recentMessages)
						for (let i = 0; i < messages.length; i++) {
							if (messages[i].ID == msgReceive.data.sendID) {
								messages[i].List.push(msgReceive)
								console.log(messages, "newMessages")
								break
							}

						}
					}
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
