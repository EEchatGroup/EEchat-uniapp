<template>
	<view id="home">
		<view class="head">
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
				kk: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				userInfo: null
			}
		},
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
			getList() {
				this.userInfo = this.$store.state.userInfo
				console.log(this.userInfo,"999977779")
				var ws = new WebSocket('ws://47.112.160.66:7777?ReqIdentifier=1001&Token=' + this.userInfo.token.accessToken +
					'&SendID=0&OptionID=' + this.userInfo.optionID + '&MsgIncr=0');
				ws.onopen = function(evt) {
					console.log("Connection open ...");
					ws.send("Hello WebSockets!");
				};
			}
		},
		created() {
			this.getList()
		},
		computed:{
			ww(){
				return this.$store.state.userInfo
			}
		}
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
