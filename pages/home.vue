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
				isLatestSeq: true,
				addNewMessage: false
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
				let parameter2 = {}
				parameter2.data = {}
				parameter.reqIdentifier = 1001
				parameter.token = uni.getStorageSync('token')
				parameter.sendID = this.userInfo.address
				parameter.operationID = this.userInfo.address + await Date.now().toString()
				parameter.msgIncr = this.$store.state.MsgIncr



				await newest_seq(parameter).then(async res => {

					let that = this
					if (res.data.data.seq >= 1 && uni.getStorageSync(that.userInfo.address +
							'latestSeq').length == 0) {
						console.log("老用户 换机登录")
						uni.setStorage({
							key: that.userInfo.address + 'latestSeq',
							data: res.data.data.seq,
							success: function() {

								parameter2.data.seqBegin = 1
								parameter2.data.seqEnd = uni.getStorageSync(that.userInfo
									.address + 'latestSeq');
								that.isLatestSeq = false
								that.addNewMessage = false
							}
						});

					} else if (res.data.data.seq == 0) {
						that.sessionList = []
						uni.setStorageSync(that.userInfo.address + 'sessionList', that.sessionList);
						console.log("新用户 没消息")
						that.isLatestSeq = true
					} else if (res.data.data.seq == uni.getStorageSync(that.userInfo.address +
							'latestSeq')) {
						let value = uni.getStorageSync(that.userInfo.address + 'latestSeq')
						if (value == res.data.data.seq) {
							console.log("老用户 seq正常")
							
							that.isLatestSeq = true
							that.sessionList = []

							try {
								let localMessageValue = uni.getStorageSync(this.userInfo.address + 'localMessage')

								//截取每个用户最新一条用来显示
								for (let i = 0; i < localMessageValue.length; i++) {

									let item = {}
									let l = localMessageValue[i].list.length - 1
									let last = localMessageValue[i].list[l]
									item.id = localMessageValue[i].id
									item.time = last.serverMsgID.slice(11, 16)
									if (last.content.length > 20) {
										item.content = last.content.slice(0, 20) + "..."
									} else {
										item.content = last.content
									}

									item.UNIXValue = last.sendTime
									item.isShow = false
									that.sessionList.push(item)
								}
								//sort
								that.sessionList = that.sessionList.sort(that.sortNumber)

							} catch (e) {
								// error
							}


							try {
								uni.setStorageSync(that.userInfo.address + 'sessionList', that
								.sessionList);
							} catch (e) {
								// error
							}






						} else {
							console.log("老用户 seq没对齐")
							parameter2.data.seqBegin = uni.getStorageSync(that.userInfo.address +
								'latestSeq')
							parameter2.data.seqEnd = res.data.data.seq
							that.addNewMessage = true
							uni.setStorage({
								key: that.userInfo.address + 'latestSeq',
								data: res.data.data.seq,
								success: function() {
									that.$store.commit('seqValue', res.data.data.seq)
									that.isLatestSeq = false
								}
							});

						}
					}




				})

				if (this.isLatestSeq == false) {

					parameter2.reqIdentifier = 1002
					parameter2.token = uni.getStorageSync('token')
					parameter2.sendID = this.userInfo.address
					parameter2.operationID = this.userInfo.address + await Date.now().toString();
					parameter2.msgIncr = this.$store.state.MsgIncr



					pull_msg(parameter2).then(res => {
						console.log("走了拉取请求")
						console.log(res.data.data.single, "拉取消息返回值")
						if (this.addNewMessage == true) {
							let newSingle = res.data.data.single
							let localMessage = uni.getStorageSync(this.userInfo.address + 'localMessage');
							for (let i = 0; i < newSingle.length; i++) {
								for (let t = 0; t < localMessage.length; t++) {
									if (localMessage[t].id == newSingle[i].id) {
										localMessage[t].list = localMessage[t].list.concat(newSingle[i].list)
										try {
											uni.setStorageSync(this.userInfo.address + 'localMessage',
												localMessage);
										} catch (e) {
											// error
										}

									}
								}
							}

						} else {
							try {
								uni.setStorageSync(this.userInfo.address + 'localMessage', res.data.data
									.single);
							} catch (e) {
								// error
							}


						}

						try {
							var value = uni.getStorageSync(this.userInfo.address + 'localMessage')
							// var single = this.deepClone(uni.getStorageSync(this.userInfo.address + 'localMessage'))


						} catch (e) {
							// error
						}
						this.sessionList = []
						//截取每个用户最新一条用来显示
						for (let i = 0; i < value.length; i++) {

							let item = {}
							let l = value[i].list.length - 1
							let last = value[i].list[l]
							item.id = value[i].id
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
						//sort
						this.sessionList = this.sessionList.sort(this.sortNumber)
						try {
							uni.setStorageSync(this.userInfo.address + 'sessionList', this.sessionList);
						} catch (e) {
							// error
						}


					})
				}


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
			console.log(this.userInfo, "userinfo")
		
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
