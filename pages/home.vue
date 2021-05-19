<template>
	<view id="home">
		<view class="head" @click="pullMsg">
			<text class="title">EEchat</text>
		</view>
		<view class="main">
			<uni-list>

				<uni-list-chat v-for="item in sessionList" :title="item.id"
					avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					:note="item.content" clickable @click="goDialogue(item.id)">

					<view class="chat-custom-right">
						<text style="color: #9A9A9A; font-size: 12px;">{{item.time}}</text>
						<uni-badge text="" type="error" />
					</view>

				</uni-list-chat>
				
				<view class="" style="width: 600px;height: 100px;background-color: #007AFF;" @click="goDialogue(222)"></view>
				
			</uni-list>
		</view>


	</view>
</template>

<script>
	import {
		newest_seq,
		pull_msg
	} from '../api'
	export default {
		data() {
			return {
				sessionList: [],
				userInfo: null
			}
		},
		onTabItemTap: function() {
			this.getInfoList()
		},
		methods: {
			goRegiester() {
				uni.navigateTo({
					url: './register'
				});
			},
			goDialogue(e) {
				uni.navigateTo({
					url: './dialogue?id=' + e
				});
			},
			sortNumber(a, b) {
				return b.UNIXValue - a.UNIXValue
			},
			async getInfoList() {
				this.userInfo = this.$store.state.userInfo
				let parameter = {}
				parameter.reqIdentifier = 1001
				parameter.token = sessionStorage.getItem('token')
				parameter.sendID = this.userInfo.address
				parameter.operationID = this.userInfo.address + await Date.now().toString()
				parameter.msgIncr = this.$store.state.MsgIncr
				await newest_seq(parameter).then(res => {
					this.$store.commit('seqValue', res.data.data.seq)
				})

				let parameter2 = {}
				parameter2.reqIdentifier = 1002
				parameter2.token = sessionStorage.getItem('token')
				parameter2.sendID = this.userInfo.address
				parameter2.operationID = this.userInfo.address + await Date.now().toString();
				parameter2.msgIncr = this.$store.state.MsgIncr
				parameter2.data = {}
				if (this.$store.state.seq - 100 >= 0) {
					parameter2.data.seqBegin = this.$store.state.seq - 100
				} else {
					parameter2.data.seqBegin = 0
				}

				parameter2.data.seqEnd = this.$store.state.seq
				
				pull_msg(parameter2).then(res => {
					console.log(parameter2,"参数")
					this.sessionList = []
					console.log(res.data, "拉取消息")
					let single = res.data.data.single
					for (let i = 0; i < single.length; i++) {
						let item = {}
						item.id = single[i].ID
						item.time = single[i].List.pop().ServerMsgID.slice(11, 16)
						item.content = single[i].List.pop().Content
						item.UNIXValue = single[i].List.pop().SendTime
						item.seq = single[i].List.pop().Seq
						this.sessionList.push(item)
					}
					//用时间戳大小进行排序，按时间顺序渲染消息
					this.sessionList = this.sessionList.sort(this.sortNumber)
					this.$store.commit('getRecentMessages', single)
					console.log(this.sessionList, "liebiao")
					for(let o = 0; o <this.sessionList.length; o++){
						console.log(this.sessionList[o].content)
					}

				})

			},


		},
		watch: {
			msgReceive(oldVal, newVal) {
				console.log(newVal, "新接收的推送消息")
			}
		},
		mounted() {
			this.getInfoList()
			console.log(this.userInfo, "userinfo")
			// let that = this;
			// that.ws = new WebSocket('ws://47.112.160.66:7778?token=' + sessionStorage.getItem("token") +
			// 	'&sendID=' + that.userInfo.address + '&platformID=5');
			// that.websockets.setWs(that.ws);
			// that.ws.onopen = function(evt) {
			// 	console.log("打开ws链接");
			// }

			// // console.log(this.$store.state.userInfo.mnemonic.toString().replace(/\s*/g, ""), "xxxxxxxxx")
			// this.websockets.ws.onmessage = function(evt) {
			// 	let msgReceive = JSON.parse(evt.data)
			// 	console.log(JSON.parse(evt.data), "新接收的推送消息")
			// }
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
