<script>
	import store from 'store/index.js'
	// import ws from './websockets/index.js'
	export default {
		data() {
			return {}
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
					this.userInfo = this.$store.state.userInfo
					let that = this;
					that.ws = new WebSocket('ws://47.112.160.66:7778?token=' + sessionStorage.getItem("token") +
						'&sendID=' + that.userInfo.mnemonic.toString().replace(/\s*/g,"")+ '&platformID=5');
					that.websockets.setWs(that.ws);
					that.ws.onopen = function(evt) {
						console.log("打开ws链接");
						/* let parameter = {}
						parameter.ReqIdentifier = 1001
						parameter.Token = that.userInfo.token.accessToken
						parameter.SendID = that.userInfo.userID
						parameter.OptionID = that.userInfo.optionID
						parameter.MsgIncr = 0
						console.log(JSON.stringify(parameter), "请求最新seq")
						that.websockets.ws.send(JSON.stringify(parameter)); */
					};
					that.websockets.ws.onmessage = function(res) {
						let resData = JSON.parse(res.data)
						console.log(resData.Data.Seq, "接收最新seq")
						if( resData.ReqIdentifier= 1001 ){
							that.$store.commit("seqValue",resData)
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
