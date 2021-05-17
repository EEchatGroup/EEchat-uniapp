<template>
	<view id="home">
		<view class="head" @click="pullMsg">
			<text class="title">EEchat</text>
		</view>
		<view class="main">
			<uni-list>

				<uni-list-chat v-for=" item in kk" title="uni-app"
					avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12" clickable @click="goDialogue">
				</uni-list-chat>

			</uni-list>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				kk: [1],
				userInfo: null
			}
		},
		/* onTabItemTap:function(){
		   this.pullMsg()
		}, */
		methods: {
			goRegiester() {
				uni.navigateTo({
					url: './register'
				});
			},
			goDialogue() {
				uni.navigateTo({
					url: './dialogue'
				});
			},
			/* pullMsg() {
				this.userInfo = this.$store.state.userInfo
				let that = this;
				let parameter = {}
				parameter.ReqIdentifier = 1002
				parameter.Token = that.userInfo.token.accessToken
				parameter.SendID = that.userInfo.userID
				parameter.OptionID = that.userInfo.optionID
				parameter.MsgIncr = 0
				parameter.Data = {}
				parameter.Data.SeqBegin = 0
				parameter.Data.SeqEnd = 100
				console.log(JSON.stringify(parameter), "主动拉取消息")
				that.websockets.ws.send(JSON.stringify(parameter));
				that.websockets.ws.onmessage = function(res) {
					console.log(JSON.parse(res.data), "接收主动拉取的消息")
				}
			},
			 */
		},
		watch: {
			msgReceive(oldVal, newVal) {
				console.log(newVal, "新接收的推送消息")
			}
		},
		created() {
			console.log(this.$store.state.userInfo.mnemonic.toString().replace(/\s*/g,""), "xxxxxxxxx")
			this.websockets.ws.onmessage = function(evt) {
				let msgReceive = JSON.parse(evt.data)
				console.log(JSON.parse(evt.data), "新接收的推送消息")
			}
		},
		computed: {}
	}
</script>

<style lang="scss" scoped>
	#home {
		background-color: #E8E8E8;
		height: 100% !important;

		.head {
			height: 90rpx;
			background-color: #fff;

			.title {
				font-size: 44rpx;
				font-weight: 500;
				color: #1B72EC;
				line-height: 90rpx;
				margin-left: 44rpx;
			}
		}

		.main {
			padding-bottom: 120rpx;

			.chat-custom-right {
				flex: 1;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-end;
			}

			.chat-custom-text {
				font-size: 12px;
				color: #999;
			}
		}

	}
</style>
