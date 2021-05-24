<template>
	<view id="home">
		<view class="head">
			<text class="title">EEchat</text>
		</view>
		<view class="main">
			<!-- <uni-list>

				<uni-list-chat v-for="item in sessionList" :title="item.id" @longpress.native="logoTime(item)"
					avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					:note="item.content" clickable @click="goDialogue(item.id)">

					<view class="chat-custom-right">
						<text style="color: #9A9A9A; font-size: 12px;">{{item.time}}</text>
						<uni-badge text="" type="error" />

					</view>


				</uni-list-chat>

			</uni-list> -->
			<view class="chatList">
				<view class="chatItem" v-for="item in sessionList" @longtap.prevent="showOperation(item)"
					@click="goDialogue(item.id)">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						mode="" class="portrait"></image>
					<view class="chatItemMain">
						<view class="mainHead">
							<text class="nickName">{{item.id.length>20?item.id.slice(0,20)+"...":item.id}}</text>
							<text class="latestTime">{{item.time}}</text>
						</view>
						<text class="latestContent">{{item.content}}</text>
					</view>
					<view class="operationBox" :ref="item.id" v-show="item.isShow">
						<view class="transparent" @click.stop="item.isShow = false">

						</view>
						<view class="operationBox-left" @click.stop="shield(item)">
							<text>屏蔽该人</text>
						</view>
						<view class="operationBox-right">
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>


		</view>


	</view>
</template>

<script>
	import {
		newest_seq,
		pull_msg,
		add_blacklist
	} from '../api'
	export default {
		data() {
			return {
				sessionList: [],
				userInfo: null,
				startData: {},
			}
		},
		onLoad() {


		},

		onShow() {
			this.getInfoList()
			console.log(this.$store.state.recentMessages, "vuex")

		},
		methods: {
			showOperation(e) {
				e.isShow = true
			},
			async shield(e) {
				e.isShow = false
				let parameter = {}
				parameter.uid = e.id
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();

				add_blacklist(parameter).then(res => {
					console.log(res)
				})
			},
			//depep clone
			deepClone(obj) {
				let _obj = JSON.stringify(obj)
				return JSON.parse(_obj);
			},
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
				parameter.token = sessionStorage.getItem("token")
				parameter.sendID = this.userInfo.address
				parameter.operationID = this.userInfo.address + await Date.now().toString()
				parameter.msgIncr = this.$store.state.MsgIncr

				await newest_seq(parameter).then(res => {
					console.log(res, "seq参数")
					this.$store.commit('seqValue', res.data.data.seq)
				})

				let parameter2 = {}
				parameter2.reqIdentifier = 1002
				parameter2.token = sessionStorage.getItem("token")
				parameter2.sendID = this.userInfo.address
				parameter2.operationID = this.userInfo.address + await Date.now().toString();
				parameter2.msgIncr = this.$store.state.MsgIncr
				parameter2.data = {}
				if (this.$store.state.seq - 100 > 0) {
					parameter2.data.seqBegin = this.$store.state.seq - 100
				} else {
					parameter2.data.seqBegin = 1
				}

				parameter2.data.seqEnd = this.$store.state.seq

				pull_msg(parameter2).then(res => {
					console.log(parameter2, "参数")
					console.log(res.data.data.single, "拉取消息返回值")

					let single = this.deepClone(res.data.data.single)
					this.sessionList = []
					//截取每个用户最新一条用来显示
					for (let i = 0; i < res.data.data.single.length; i++) {
						let item = {}

						let last = single[i].list.pop()

						item.id = single[i].id
						item.time = last.serverMsgID.slice(11, 16)
						if (last.content.length > 20) {
							item.content = last.content.slice(0, 20) + "..."
						} else {
							item.content = last.content
						}

						item.UNIXValue = last.sendTime
						item.isShow = false
						this.sessionList.push(item)
					}
					//用时间戳大小进行排序，按时间顺序渲染消息
					this.sessionList = this.sessionList.sort(this.sortNumber)
					this.$store.commit('getRecentMessages', res.data.data.single)

				})

			},


		},
		watch: {
			"$store.state.newInfoJudgeValue": {
				deep: true,
				handler: function(newVal, oldVal) {
					this.getInfoList()
				}
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

			.chatList {
				margin-top: 6rpx;

				.chatItem {
					background-color: #fff;
					height: 146rpx;
					display: flex;
					align-items: center;


					.portrait {
						flex-shrink: 0;
						width: 92rpx;
						height: 92rpx;
						border-radius: 92rpx;
						margin-left: 44rpx;
					}


					.chatItemMain {
						height: 144rpx;
						display: flex;
						flex-direction: column;
						width: 100%;
						margin-left: 28rpx;
						border-bottom: 1px solid #E5EBFF;
						margin-right: 44rpx;

						.mainHead {
							display: flex;
							justify-content: space-between;
							margin-top: 38rpx;

							.nickName {
								font-size: 28rpx;
								font-weight: 600;
								color: #333333;
							}

							.latestTime {
								font-size: 24rpx;
								font-weight: 600;
								color: #999999;
							}
						}

						.latestContent {
							font-size: 24rpx;
							font-weight: 500;
							color: #666666;
							margin-top: 10rpx;
						}
					}

					.operationBox {
						width: 100%;
						height: 136rpx;
						position: absolute;
						z-index: 99;
						right: 0;
						display: flex;
						font-size: 28rpx;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 136rpx;

						.transparent {
							width: 100%;
							height: 100%;
						}

						&-left {
							flex-shrink: 0;
							width: 160rpx;
							height: 100%;
							background-image: linear-gradient(to right bottom, #7CBAFF, #1B72EC);
							box-shadow: 0px 2px 4px 0px;

						}

						&-right {
							flex-shrink: 0;
							width: 160rpx;
							height: 100%;
							background-image: linear-gradient(to right bottom, #FFD576, #FFAB41);
							box-shadow: 0px 2px 4px 0px;
						}
					}


				}
			}

		}

	}
</style>
