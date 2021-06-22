<template>
	<view id="home">
		<view class="head">
			<text class="title" @click="dd">EEchat</text>
			<view class="headRight">
				<image src="../static/more-operations.png" mode="" class="headIcon" @click="controlDisplay"></image>
				<view class="my-menuCon" v-show="showOperationsMenu">
					<view class="triangle"> </view>
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
				<view class="chatItem" v-for="item in sessionList" :key="item.conversationID"
					@longtap.prevent="showOperation(item.conversationID)" @click="goDialogue(item)">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						mode="" class="portrait"></image>
					<view class="chatItemMain">
						<view class="mainHead">
							<text class="nickName">{{
                item.userID.length > 20 ? item.userID.slice(0, 20) + "..." : item.userID
              }}</text>
							<text class="latestTime">{{ item.latestMsg.serverMsgID.slice(11,16) }}</text>
						</view>
						<view class="mainBottom">
							<text class="latestContent">{{ item.latestMsg.content }}</text>
							<view class="msgNumber" v-show="item.unreadCount>0"> {{item.unreadCount}} </view>
						</view>
					</view>
					<!-- <view class="operationBox" :ref="item.id" v-show="item.isShow">
						<view class="transparent" @click.stop="item.isShow = false">

						</view>
						<view class="operationBox-left" @click.stop="shield(item)">
							<text>Top</text>
						</view>
						<view class="operationBox-right">
							<text>delete</text>
						</view>
					</view> -->
					<view class="operationBox" :ref="item.id" v-if="item.conversationID == chooseConversationID">
						<view class="transparent" @click.stop="item.isShow = false"> </view>
						<view class="operationBox-left" @click.stop="shield(item)">
							<text>Top</text>
						</view>
						<view class="operationBox-right" @click.stop="deleteConversation(item.conversationID)">
							<text>delete</text>
						</view>
						<view class="operationBox-add">
							<text>Mark as read</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				chooseConversationID: 0
			};
		},
		onInit() {

		},
		onLoad() {
			this.getAllConversationListListener();
			this.deleteConversationListener();
			this.getTotalUnreadMsgCountListener();
			
			this.getOneConversationListener()

			// this.$openSdk.setConversationListener()
			this.$openSdk.getAllConversationList()
			this.$openSdk.getTotalUnreadMsgCount()
				
		

		},
		onShow() {
		},
		beforeMount() {
			this.setConversationListener()
		},
		methods: {
			setConversationListener() {
				let _this = this
				_this.$globalEvent.addEventListener("onNewConversation", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(JSON.parse(transfer).msg);
					for (let i = 0; i < _this.listener.length; i++) {
						_this.listener[i].latestMsg = JSON.parse(_this.listener[i].latestMsg)

					}
					_this.sessionList = _this.listener.concat(_this.sessionList)
					console.log(_this.listener, "信心信息信息");
					console.log(_this.sessionList, "新会话");
				});
				_this.$globalEvent.addEventListener("onConversationChanged", function(e) {
					console.log(e);
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(JSON.parse(transfer).msg);
					console.log(_this.listener, "kong空");
					if (_this.listener != null) {
						for (let i = 0; i < _this.listener.length; i++) {
							_this.listener[i].latestMsg = JSON.parse(_this.listener[i].latestMsg)

						}
						_this.sessionList = _this.listener
					}

					console.log(_this.sessionList, "会话列表改变");
				});
				_this.$globalEvent.addEventListener("onTotalUnreadMessageCountChanged", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					_this.$openSdk.getTotalUnreadMsgCount()
					console.log(_this.listener, "总未读数改变");
				});
				_this.$globalEvent.addEventListener("onSyncServerStart", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener, "监听启动");
				});
				_this.$globalEvent.addEventListener("onSyncServerFailed", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener, "监听失败");
				});
				_this.$globalEvent.addEventListener("onSyncServerFinish", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener, "监听完成");
				});


			},
			getAllConversationListListener() {
				let _this = this;
				_this.$globalEvent.addEventListener("getAllConversationSuccess", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(JSON.parse(transfer).msg);
					for (let i = 0; i < _this.listener.length; i++) {
						_this.listener[i].latestMsg = JSON.parse(_this.listener[i].latestMsg)
						_this.listener[i].isShow = false
					}
					_this.sessionList = _this.listener
					console.log(_this.listener, "获取所有会话成功");
				});
				_this.$globalEvent.addEventListener("getAllConversationFailed", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener);
				});
			},
			deleteConversationListener() {
				let _this = this;
				_this.$globalEvent.addEventListener("deleteConversationSuccess", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener, "删除成功");
				});
				_this.$globalEvent.addEventListener("deleteConversationFailed", function(e) {
					let transfer = JSON.stringify(e);
					_this.listener = JSON.parse(transfer);
					console.log(_this.listener, "删除失败");
				});
			},
			getTotalUnreadMsgCountListener() {
				let _this = this;
				_this.$globalEvent.addEventListener(
					"getTotalUnreadMsgCountSuccess",
					function(e) {
						let transfer = JSON.stringify(e);
						_this.listener = JSON.parse(transfer);
						if (Number(_this.listener.msg) > 0) {
							uni.setTabBarBadge({
								index: 0,
								text: _this.listener.msg
							})
						}

						console.log(_this.listener.msg, "未读消息");
					}
				);
				_this.$globalEvent.addEventListener(
					"getTotalUnreadMsgCountFailed",
					function(e) {
						let transfer = JSON.stringify(e);
						_this.listener = JSON.parse(transfer);
						console.log(_this.listener);
					}
				);
			},
			getOneConversationListener() {
				let _this = this;
				_this.$globalEvent.addEventListener(
					"getOneConversationSuccess",
					function(e) {
						let transfer = JSON.stringify(e);
						_this.listener = JSON.parse(transfer);
						console.log(_this.listener, "获取单个会话");
					}
				);
				_this.$globalEvent.addEventListener(
					"getOneConversationFailed",
					function(e) {
						let transfer = JSON.stringify(e);
						_this.listener = JSON.parse(transfer);
						console.log(_this.listener);
					}
				);
			},
			getTotalUnreadMsgCount() {
				this.$openSdk.getTotalUnreadMsgCount();
			},
			dd() {
				uni.navigateTo({
					url: "./dialogue",
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
			showOperation(conversationID) {
				this.chooseConversationID = conversationID
			},
			shield(e) {
				//功能还没做
				this.chooseConversationID = 0
			},
			//depep clone
			deepClone(obj) {
				let _obj = JSON.stringify(obj);
				return JSON.parse(_obj);
			},
			goRegiester() {
				uni.navigateTo({
					url: "./register",
				});
			},
			goDialogue(e) {
				// await this.$store.commit("getConversationUserID",e.userID)

				uni.navigateTo({
					url: "./dialogue?userID=" + e.userID + "&conversationID=" + e.conversationID
				});
			},
			sortNumber(a, b) {
				return b.UNIXValue - a.UNIXValue;
			},

			deleteConversation(e) {
				this.$openSdk.deleteConversation(e);
				this.chooseConversationID = 0
			},
		},
		watch: {

		},
		mounted() {},
	};
</script>

<style lang="scss" scoped>
	#home {
		.head {
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
					top: 5%;
					right: 1.5%;
					display: flex;
					flex-direction: column;

					.triangle {
						width: 0px;
						height: 0px;
						border-top: 18rpx solid transparent;
						border-bottom: 18rpx solid #1b72ec;
						border-left: 18rpx solid transparent;
						border-right: 18rpx solid transparent;

						margin-left: 80%;
					}

					.operationsMenu {
						width: 250rpx;
						height: 100rpx;
						background-color: #1b72ec;
						box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
						border-radius: 18rpx;

						padding: 0 46rpx;

						.operationsMenu-item {
							display: flex;
							align-items: center;
							font-size: 30rpx;
							font-weight: 600;
							color: #ffffff;
							margin-top: 26rpx;

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
