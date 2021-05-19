<script>
	import store from 'store/index.js'
	// import ws from './websockets/index.js'
	export default {
		data() {
			return {}
		},
		mounted(){
			
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
						console.log(JSON.parse(evt.data), "新接收的推送消息")
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
