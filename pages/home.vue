<template>
	<view id="home">
		<view class="head">
			<text class="title">EEchat</text>
			<view class="headRight">
				<image src="../static/more-operations.png" mode="" class="headIcon" @click="controlDisplay"></image>
				<view class="my-menuCon" v-if="showOperationsMenu">
					<view class="operationsMenu">
						<view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/addFriend.png" mode="" class="itemImg"></image>
							<text>Add friends</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">

			<view class="chatList">
				<uni-swipe-action>
					<uni-swipe-action-item autoClose v-for="item in sessionList" :key="item.conversationID"
						>
						<template>
							<view @click="clickConversation(item)" class="chatItem">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
									mode="" class="portrait"></image>
								<view class="chatItemMain">
									<view class="mainHead">
										<text class="nickName">{{
					               	  item.userID.length > 20 ? item.userID.slice(0, 20) + "..." : item.userID
					               	}}</text>
										<text class="latestTime">{{ item.latestMsg.sendTime| dateFilter }}</text>
									</view>
									<view class="mainBottom">
										<text class="latestContent">{{ item | msgFilter }}</text>
										<view class="msgNumber" v-if="item.unreadCount>0"> {{item.unreadCount}}
										</view>
									</view>
								</view>
							</view>
						</template>
						<template v-slot:right>
							<view class="action-item action-item-top"
								@click="pinConversation(item.conversationID,item.isPinned)"><text>Top</text></view>
							<view class="action-item action-item-del" @click="deleteConversation(item.conversationID)">
								<text>Delete</text></view>
							<view class="action-item action-item-mark" @click="markAsRead(item.userID)">
								<text>Mark as read</text></view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		calculateDiffTime,
		formatDate
	} from '../utils/tools.js'
	export default {
		data() {
			return {
				sessionList: [],
				userInfo: null,
				startData: {},
				isLatestSeq: true,
				addNewMessage: false,
				showOperationsMenu: false,
				listener: null,
			};
		},
		filters: {
			msgFilter(value) {
				switch (value.latestMsg.contentType) {
					case 101:
						return value.latestMsg.content
						break;
					case 102:
						return "[图片]"
						break;
					case 103:
						return "[音频]"
						break;
					case 104:
						return "[视频]"
						break;
					case 201:
						return JSON.parse(value.latestMsg.content).text
						break;
				}
			},
			dateFilter(val) {
				const fromDay = calculateDiffTime(val)
				const sendTimeArr = formatDate(val)
				switch (fromDay) {
					case 0:
						return sendTimeArr[1]
					case 1:
						return "last day"
					default:
						return sendTimeArr[0]
				}
			}
		},
		onLoad() {
			this.getAllConversationListList();
			// this.$openSdk.setConversationListener()
			this.getTotalUnreadMsgCount()
		},
		beforeMount() {
			this.setConversationListener()
		},
		methods: {
			setConversationListener() {
				let _this = this
				_this.$globalEvent.addEventListener("onNewConversation", params=> {
					let res = JSON.parse(params.msg)
					res.forEach(r=>r.latestMsg = JSON.parse(r.latestMsg))
					_this.sessionList = res.concat(_this.sessionList)
					console.log(_this.sessionList, "新会话");
				});
				_this.$globalEvent.addEventListener("onConversationChanged", params=> {
					let res = JSON.parse(params.msg)
					if (res) {
						res.forEach(r=>r.latestMsg = JSON.parse(r.latestMsg))
						_this.sessionList =res
					}
					console.log(_this.sessionList, "会话列表改变");
				});
				_this.$globalEvent.addEventListener("onTotalUnreadMessageCountChanged",params=> {
					// const res = JSON.parse(params.msg)
					_this.getTotalUnreadMsgCount()
					console.log(params.msg, "总未读数改变");
				});
				_this.$globalEvent.addEventListener("onSyncServerStart",params=> {
					console.log(params.msg, "监听启动");
				});
				_this.$globalEvent.addEventListener("onSyncServerFailed",params=> {
					console.log(params.msg, "监听失败");
				});
				_this.$globalEvent.addEventListener("onSyncServerFinish",params=> {
					console.log(params.msg, "监听完成");
				});


			},
			getAllConversationListList() {
				this.$openSdk.getAllConversationList((data) => {
					if (data.msg) {
						let tmpList = JSON.parse(data.msg)
						for (let i = 0; i < tmpList.length; i++) {
							tmpList[i].latestMsg = JSON.parse(tmpList[i].latestMsg)
							tmpList[i].isShow = false
						}
						this.sessionList = [...tmpList,...tmpList,...tmpList,...tmpList,...tmpList,...tmpList]
					} else {
						console.log(data.err);
					}
				})
			},
			getTotalUnreadMsgCount() {
				this.$openSdk.getTotalUnreadMsgCount(data => {
					if (data.msg) {
						if (Number(data.msg) > 0) {
							uni.setTabBarBadge({
								index: 0,
								text: data.msg
							})
						} else {
							uni.removeTabBarBadge({
								index: 0
							})
						}
					}
				});
			},
			controlDisplay() {
				this.showOperationsMenu = !this.showOperationsMenu;
			},
			goAddFriend() {
				uni.navigateTo({
					url: "./addFriend",
				});
				this.showOperationsMenu = false;
			},
			clickConversation(e) {
				this.$store.commit('setConversationUser',e.userID)
				uni.navigateTo({
					url: "./chatWin?userID=" + e.userID + "&conversationID=" + e.conversationID +
						"&unreadCount=" + e.unreadCount
				});
			},
			deleteConversation(id) {
				this.$openSdk.deleteConversation(id, data => {
					console.log(data);
				});
				this.chooseConversationID = 0
			},
			pinConversation(id, state) {
				const newState = state === 0 ? true : false
				this.$openSdk.pinConversation(id, newState, data => {
					console.log(data);
				})
			},
			markAsRead(id) {
				console.log(id);
				this.$openSdk.markSingleMsgHasRead(id, data => {
					console.log(data);
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	#home {
		position: relative;
		.head {
			position: fixed;
			z-index: 99;
			width: 100%;
			height: 90rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

			.title {
				font-size: 44rpx;
				font-weight: 500;
				color: #1b72ec;
				line-height: 90rpx;
				margin-left: 44rpx;
			}

			.headRight {
				.headIcon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 40rpx;
				}

				.my-menuCon {
					z-index: 99;
					position: absolute;
					top: 86rpx;
					right: 1.5%;
					display: flex;
					flex-direction: column;
					
					&::after{
						content: '';
						position: absolute;
						top: -36rpx;
						right:36rpx;
						border: 20rpx solid;
						border-color: transparent transparent #1b72ec transparent;
					}

					.operationsMenu {
						background-color: #1b72ec;
						box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
						border-radius: 18rpx;
						padding: 24rpx;
						

						.operationsMenu-item {
							display: flex;
							align-items: center;
							font-size: 30rpx;
							font-weight: 600;
							color: #ffffff;

							.itemImg {
								width: 44rpx;
								height: 44rpx;
								margin-right: 28rpx;
							}
						}
					}
				}
			}
		}

		.main {
			padding-top: 90rpx;
			// padding-bottom: 120rpx;

			.chatList {
				margin-top: 6rpx;

				.action-item {
					width: 148rpx;
					box-shadow: 0px 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
					font-size: 28rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;

					&-del {
						background: linear-gradient(135deg, #FFD576 0%, #FFAB41 100%);
					}

					&-top {
						background: linear-gradient(135deg, #87C0FF 0%, #0060E7 100%);
					}

					&-mark {
						background: linear-gradient(135deg, #C9C9C9 0%, #7A7A7A 100%);
					}
				}



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
						border-bottom: 1px solid #e5ebff;
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

						.mainBottom {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.latestContent {
								font-size: 24rpx;
								font-weight: 500;
								color: #666666;
								margin-top: 10rpx;
							}

							.msgNumber {
								width: 32rpx;
								height: 32rpx;
								border-radius: 32rpx;
								background-color: #f44038;
								text-align: center;
								line-height: 32rpx;
								font-size: 24rpx;
								font-weight: 600;
								color: #ffffff;
							}
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
						color: #ffffff;
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
							background-image: linear-gradient(to right bottom,
									#7cbaff,
									#1b72ec);
							box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
						}

						&-right {
							flex-shrink: 0;
							width: 160rpx;
							height: 100%;
							background-image: linear-gradient(to right bottom,
									#ffd576,
									#ffab41);
							box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
						}

						&-add {
							display: flex;
							align-items: center;
							flex-shrink: 0;
							width: 160rpx;
							height: 100%;
							background-image: linear-gradient(to right bottom,
									#c9c9c9,
									#7a7a7a);
							box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
							line-height: 20px;
						}
					}
				}
			}
		}
	}
</style>
