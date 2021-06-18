<template>
	<view id="dialogue">
		<view class="headCon">
			<view class="head">
				<image src="../static/goBack.png" mode="" class="headleft" @click="goBack"></image>
				<view class="headMiddle">
					<text class="headMiddleTop">{{
            nickname.length > 20 ? nickname.slice(0, 20) + "..." : nickname
          }}</text>
					<view class="headMiddleBottom" @click="setStatusShow = true"><text>{{ onlineStatus }}</text>
						<image src="../static/moreStatus.png" mode="" class="moreStatus"></image>
					</view>
				</view>
				<image src="../static/goDetails.png" mode="" class="headRight" @click="goSetFriend"></image>
			</view>
			<view class="promptInfo" v-if="statusChangeShow">
				<view class="onlineCircle" v-if="
            onlineStatus == 'Mobile Online' || onlineStatus == 'Computer online'
          ">
				</view>
				<view class="invisibleCircle" v-if="onlineStatus == 'invisible'">
				</view>
				<view class="offlineCircle" v-if="onlineStatus == 'off-line'"> </view>
				<text class="changeInfo">Your status has been switched to {{ onlineStatus }}</text>
			</view>
		</view>

		<view class="main" id="main">
			<view v-for="item in list" :key="item.serverMsgID">
				<view v-if="
            item.sendID == $store.state.userInfo.address && item.msgFrom == 100
          " class="right">
					<image src="../static/sentFail.png" mode="" v-if="item.sentFail" class="StatusIcon"></image>
					<view class="blank" @click="chooseServerMsgID = 0"> </view>
					<view class="contentArea">
						<view class="operationBox" v-if="item.serverMsgID == chooseServerMsgID">
							<view class="operationBoxMain">
								<view class="operationBoxMainItem">
									<image src="../static/copy.png" mode="" class="operationIcon"></image>
									<text class="operationText">copy</text>
								</view>
								<view class="operationBoxMainItem">
									<image src="../static/delete.png" mode="" class="operationIcon"></image>
									<text class="operationText">delete</text>
								</view>
								<view class="operationBoxMainItem">
									<image src="../static/forward.png" mode="" class="operationIcon"></image>
									<text class="operationText">forward</text>
								</view>
								<view class="operationBoxMainItem">
									<image src="../static/withdraw.png" mode="" class="operationIcon"></image>
									<text class="operationText">forward</text>
								</view>
							</view>
							<view class="operationBoxtriangle"> </view>
						</view>
						<view class="maincontent" v-show="item.contentType == 101"
							@longtap.prevent="showOperation(item)">{{ item.content }}</view>
						<view class="maincontent" v-show="item.contentType == 102"
							@longtap.prevent="showOperation(item)">
							<image :src="item.content.thumbnail || item.content" mode="aspectFit"></image>
						</view>
						<view class="triangle"> </view>
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
							mode="" class="headIcon">
						</image>
					</view>
				</view>
				<view v-if="
            item.sendID != $store.state.userInfo.address && item.msgFrom == 100
          " class="left">
					<view class="blank" @click="chooseServerMsgID = 0"> </view>
					<view class="contentArea">
						<view class="operationBox" v-if="item.serverMsgID == chooseServerMsgID">
							<view class="operationBoxMain">
								<view class="operationBoxMainItem">
									<image src="../static/copy.png" mode="" class="operationIcon"></image>
									<text class="operationText">copy</text>
								</view>
								<view class="operationBoxMainItem">
									<image src="../static/delete.png" mode="" class="operationIcon"></image>
									<text class="operationText">delete</text>
								</view>
								<view class="operationBoxMainItem">
									<image src="../static/forward.png" mode="" class="operationIcon"></image>
									<text class="operationText">forward</text>
								</view>
							</view>
							<view class="operationBoxtriangle"> </view>
						</view>
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
							mode="" class="headIcon">
						</image>
						<view class="triangle"> </view>
						<view class="maincontent" v-show="item.contentType == 101"
							@longtap.prevent="showOperation(item)">{{ item.content }}</view>
						<view class="maincontent" v-show="item.contentType == 102"
							@longtap.prevent="showOperation(item)">
							<image :src="item.content.thumbnail" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottomArea">
			<view class="bottomAreaTop">
				<image src="../static/voice.png" mode="" class="voice" @click="voice"></image>
				<input type="text" value="" v-model="inputValue" />
				<image src="../static/moreOperation.png" mode="" class="moreOperation"
					@click="isMoreOperation = !isMoreOperation"></image>
				<button type="primary" class="sentButton" @click="sendInfo">
					Send
				</button>
			</view>

			<view class="bottomAreaBottom" v-show="isMoreOperation">
				<view class="bottomAreaBottomItem" @click="album">
					<image src="../static/camera.png" mode="" class="itemIcon"></image>
					<text class="itemText">shot</text>
				</view>

				<view class="bottomAreaBottomItem" @click="album">
					<image src="../static/album.png" mode="" class="itemIcon"></image>
					<text class="itemText">album</text>
				</view>
			</view>

			<view class="setStatus" v-if="setStatusShow">
				<!-- <view class="setStatus"> -->
				<image src="../static/closeSetStastus.png" mode="" class="closeSetStastus"
					@click="setStatusShow = false">
				</image>
				<text class="setStatusTitle">Set my current status</text>
				<view class="statusArea">
					<view class="statusItem" @click="mobileOnline">
						<view class="onlineCircle"> </view>
						<text>Mobile Online</text>
					</view>
					<view class="statusItem" @click="computerOnline">
						<view class="onlineCircle"> </view>
						<text>Computer online</text>
					</view>
					<view class="statusItem" @click="invisible">
						<view class="invisibleCircle"> </view>
						<text>invisible</text>
					</view>
					<view class="statusItem" @click="offline">
						<view class="offlineCircle"> </view>
						<text>off-line</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		changeAlias,
		send_msg
	} from "../api";
	import uploadFile from "../uploadFile/index.js";
	export default {
		data() {
			return {
				nickname: "奥克斯公司",
				remarks: "",
				withdrawnStatus: true,
				isSendImg: false,
				inputValue: "",
				userInfo: {},
				list: [],
				recipientID: "",
				tupian: "",
				imgContent: {},
				messages: [],
				isMoreOperation: false,
				chooseServerMsgID: 0,
				setStatusShow: false,
				statusChangeShow: false,
				onlineStatus: "Mobile Online",
				listener: null
			};
		},
		onLoad: function(option) {
			this.getHistoryMessageListListener()
			this.sendMessageListener()
			if(option.userID){
				this.nickname = option.userID;
			}else{
				this.nickname = "7777"
			}
			console.log(this.$store.state,"78979979987979");
			let params = {}
			params.userID= option.userID,
			params.groupID="",
			params.startMsg=null,
			params.count=50
			this.$openSdk.getHistoryMessageList(JSON.stringify(params))

		},
		methods: {
			sendMessageListener() {
				let _this = this
				_this.$globalEvent.addEventListener('sendMessageSuccess', (params) => {
					let transfer = JSON.stringify(params)
					_this.listener = JSON.parse(transfer)

					console.log(_this.listener, "chenggong");

				})
				_this.$globalEvent.addEventListener('sendMessageFailed', (params) => {
					let transfer = JSON.stringify(params)
					_this.listener = JSON.parse(transfer)

					console.log(_this.listener, "shibai");

				})
			},
			getHistoryMessageListListener() {
				let _this = this
				_this.$globalEvent.addEventListener('getHisMsgSuccess', (params) => {
					let transfer = JSON.stringify(params);
					_this.list = JSON.parse(JSON.parse(transfer).msg);
			
					console.log(_this.list, "拉消息");
			
				})
				_this.$globalEvent.addEventListener('getHisMsgFailed', (params) => {
					let transfer = JSON.stringify(params)
					_this.listener = JSON.parse(transfer)
			
					console.log(_this.listener, "shibai");
			
				})
			},
			async sendInfo() {
				let parameter = {};
				let latest = {};
				latest.sentFail = false;
				parameter.reqIdentifier = 1003;
				parameter.platformID = 5;
				parameter.token = uni.getStorageSync("token");
				parameter.sendID = this.userInfo.address;
				parameter.operationID =
					this.userInfo.address + (await Date.now().toString());
				parameter.msgIncr = this.$store.state.MsgIncr + 1;
				parameter.data = {};
				parameter.data.sessionType = 1;
				parameter.data.msgFrom = 100;
				parameter.data.contentType = 101;
				parameter.data.recvID = this.recipientID;
				parameter.data.content = this.inputValue;
				parameter.data.clientMsgID = "222";
				parameter.data.offlineInfo = {};
				parameter.data.forceList = [];
				parameter.data.options = {};
				parameter.data.ext = {};

				if (parameter.data.content.length > 0) {
					this.$store.commit("MsgIncrAdd");
					console.log(parameter, "消息发送参数");
					send_msg(parameter)
						.then((res) => {
							console.log(res, "44444");
							latest.sentFail = false;
						})
						.catch(function(error) {
							latest.sentFail = true;
						});
				} else {
					uni.showToast({
						title: "消息为空",
						icon: "none",
						duration: 1500,
					});
				}

				latest.sendID = this.userInfo.address;
				latest.recvID = this.recipientID;
				latest.sendTime = Date.now();
				latest.contentType = 101;
				latest.msgFrom = 100;
				latest.content = this.inputValue;
				latest.seq = uni.getStorageSync(this.userInfo.address + "latestSeq") + 1;
				latest.serverMsgID =
					"2021-06-01 09:37:46-4b134ea6ec423a385f96629ea4b6718304e3bd23-913761085841340441";
				/* if (sendStatus == true) {
				 latest.sentFail = false
				} else {
				 latest.sentFail = true
				} */

				if (parameter.data.content.length > 0) {
					this.list.push(latest);
					console.log(this.list, "本地消息列表");
					this.inputValue = "";

					for (let i = 0; i < this.messages.length; i++) {
						if (this.messages[i].id == this.recipientID) {
							this.messages[i].list = this.list;
							console.log(this.messages, "duihua");
							break;
						}
					}
					try {
						uni.setStorageSync(
							this.userInfo.address + "localMessage",
							this.messages
						);
						console.log(
							uni.getStorageSync(this.userInfo.address + "localMessage"),
							"456123"
						);
					} catch (e) {
						// error
					}

					if (latest.sentFail == false) {
						try {
							uni.setStorageSync(this.userInfo.address + "latestSeq", latest.seq);
						} catch (e) {
							// error
						}
					}

					const query = uni.createSelectorQuery().in(this);
					query
						.select("#main")
						.boundingClientRect((data) => {
							uni.pageScrollTo({
								scrollTop: data.height,
								duration: 100,
							});
						})
						.exec();
				}
			},
			async album() {
				let that = this;
				let latest = {};
				// 选择文件
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"],
					sourceType: ["album"], //从相册选择
					success: async function(res) {
						const tempFilePaths = res.tempFilePaths;
						/* latest.sendID = that.userInfo.address
						latest.recvID = that.recipientID
						latest.sendTime = Date.now()
						latest.contentType = 102
						latest.msgFrom = 100
						latest.content = tempFilePaths[0]
						console.log(latest.content, "latest.content");
						that.list.push(latest)
						console.log(that.list, "本地消息列表")

						const query = uni.createSelectorQuery().in(that);
						query.select('#main').boundingClientRect(data => {
							uni.pageScrollTo({
								scrollTop: data.height,
								duration: 100
							});
						}).exec(); */

						let suffix = res.tempFiles[0].name.substring(
							res.tempFiles[0].name.length - 4
						);
						await uploadFile(tempFilePaths[0], suffix);
						/* uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: async function(image) {
								console.log(image.width);
								var imgWidth = image.width
								console.log(image.height);
								var imageHeight = image.height
								let parameter = {}

								latest.sentFail = false
								parameter.reqIdentifier = 1003
								parameter.platformID = 5
								parameter.token = uni.getStorageSync('token')
								parameter.sendID = that.userInfo.address
								parameter.operationID = that.userInfo.address + await Date
									.now()
									.toString();
								parameter.msgIncr = that.$store.state.MsgIncr + 1;
								parameter.data = {}
								parameter.data.sessionType = 1
								parameter.data.msgFrom = 100
								parameter.data.contentType = 102
								parameter.data.recvID = that.recipientID
								parameter.data.content = {}
								parameter.data.content.url = that.$store.state.upLoadImgUrl
								parameter.data.content.thumbnail = that.$store.state
									.upLoadImgUrl +
									"?imageView2/2/w/300/h/300"
								parameter.data.content.width = imgWidth
								parameter.data.content.height = imageHeight
								console.log(parameter.data.content, "parameter.data.content");

								this.imgContent = parameter.data.content
								console.log(this.imgContent, "this.imgContent");

								parameter.data.content = parameter.data.content.toString()
								parameter.data.clientMsgID = "222"
								parameter.data.offlineInfo = {}
								parameter.data.forceList = []
								parameter.data.options = {}
								parameter.data.ext = {}

								that.$store.commit("MsgIncrAdd")
								console.log(parameter, "消息发送参数")
								send_msg(parameter).then(res => {
										console.log(res, "44444")
										latest.sentFail = false

									})
									.catch(function(error) {
										latest.sentFail = true
										console.log("7777")
									});

								latest.sendID = that.userInfo.address
								latest.recvID = that.recipientID
								latest.sendTime = Date.now()
								latest.contentType = 102
								latest.msgFrom = 100
								latest.content = this.imgContent
								console.log(latest.content,"latest.content");
								that.list.push(latest)
								console.log(that.list, "本地消息列表")

								const query = uni.createSelectorQuery().in(that);
								query.select('#main').boundingClientRect(data => {
									uni.pageScrollTo({
										scrollTop: data.height,
										duration: 100
									});
								}).exec();

							}

						}); */
					},
				});
			},
			async voice() {
				let newTextMessage = await this.$openSdk.createTextMessage(this.inputValue)
				let dd = this.$openSdk.sendMessage(newTextMessage, "ac6b0878cba4000a798f99eb7f5c12f0", "", false)
				console.log(dd);

				// uni.navigateTo({
				//   url: "./luyinceshi",
				// });
			},
			goBack() {
				uni.switchTab({
					url: "./home",
				});
			},
			goSetFriend() {
				uni.navigateTo({
					url: "./setFriend",
				});
			},
			modifyRemarks() {
				this.$refs.popup.open();
			},
			cancel() {
				this.$refs.popup.close();
			},
			confirm() {
				let parameter = {};
				parameter.optionID = "";
				parameter.accountAddr = "";
				parameter.nickName = this.remarks;
				changeAlias(parameter).then((res) => {
					console.log("res");
					this.$refs.popup.close();
				});
			},
			showOperation(e) {
				console.log(e);
				this.chooseServerMsgID = e.serverMsgID;
			},
			closeTimeOut() {
				this.statusChangeShow = true;
				setTimeout(() => {
					this.statusChangeShow = false;
				}, 3000);
			},
			mobileOnline() {
				this.onlineStatus = "Mobile Online";
				this.closeTimeOut();
			},
			computerOnline() {
				this.onlineStatus = "Computer online";
				this.closeTimeOut();
			},
			invisible() {
				this.onlineStatus = "invisible";
				this.closeTimeOut();
			},
			offline() {
				this.onlineStatus = "off-line";
				this.closeTimeOut();
			},
		},
		watch: {
			"$store.state.newInfoJudgeValue": {
				deep: true,
				handler: function(newVal, oldVal) {
					if (this.$store.state.latestNews.sendID == this.recipientID) {
						this.list.push(this.$store.state.latestNews);
						console.log(this.list, "消息列表");
					}
				},
			},
		},
		mounted() {
			// this.userInfo = this.$store.state.conversationParameter;
			// console.log(this.userInfo,"1111111");
			// const query = uni.createSelectorQuery().in(this);
			// query
			//   .select("#main")
			//   .boundingClientRect((data) => {
			//     uni.pageScrollTo({
			//       scrollTop: data.height,
			//       duration: 1,
			//     });
			//   })
			//   .exec();
		},
	};
</script>

<style lang="scss" scoped>
	#dialogue {
		.onlineCircle {
			width: 20rpx;
			height: 20rpx;
			border-radius: 20rpx;
			background: #10cc64;
		}

		.invisibleCircle {
			width: 20rpx;
			height: 20rpx;
			border-radius: 20rpx;
			background: #e8a414;
		}

		.offlineCircle {
			width: 20rpx;
			height: 20rpx;
			border-radius: 20rpx;
			background: #959595;
		}

		.headCon {
			position: fixed;
			top: 0;
			z-index: 99;
			width: 100%;

			.head {
				height: 90rpx;
				box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
				background-color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:  0 44rpx;
				.headleft {
					width: 24rpx;
					height: 42rpx;
				}

				.headMiddle {
					display: flex;
					flex-direction: column;
					align-items: center;

					&Top {
						font-size: 36rpx;
						font-weight: 400;
						color: #333333;
					}

					&Bottom {
						font-size: 20rpx;
						font-weight: 400;
						color: #666666;
						display: flex;
						align-items: center;

						.moreStatus {
							width: 10rpx;
							height: 18rpx;
							margin-left: 8rpx;
						}
					}
				}

				.headRight {
					width: 56rpx;
					height: 12rpx;
				}
			}

			.promptInfo {
				width: 100%;
				height: 90rpx;
				background: #ebebeb;
				display: flex;
				align-items: center;
				justify-content: center;

				.changeInfo {
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					margin-left: 16rpx;
				}
			}
		}

		.maincontent {
			max-width: 384rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			background-color: #f0f0f0;
			border-radius: 4px;
			padding: 14rpx 18rpx;
			margin-top: 8rpx;
			white-space: normal;
			word-break: break-all;
			overflow: hidden;

			.sendImg {
				width: 100%;
			}
		}

		.headIcon {
			height: 84rpx;
			width: 84rpx;
			border-radius: 84rpx;
			flex-shrink: 0;
		}

		.main {
			padding-bottom: 220rpx;
			margin-top: 120rpx;

			.left {
				margin-left: 44rpx;
				margin-top: 26rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				position: relative;

				.blank {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 0;
				}

				.contentArea {
					display: flex;
					align-items: flex-start;
					z-index: 9;

					.operationBox {
						position: absolute;
						left: 2%;
						margin-top: -100rpx;

						.operationBoxtriangle {
							width: 0px;
							height: 0px;
							border-top: 16rpx solid #666;
							border-bottom: 16rpx solid transparent;
							border-left: 16rpx solid transparent;
							border-right: 16rpx solid transparent;
							margin-left: 37%;
						}
					}

					.triangle {
						width: 0px;
						height: 0px;
						border-top: 14rpx solid transparent;
						border-bottom: 14rpx solid transparent;
						border-left: 18rpx solid transparent;
						border-right: 24rpx solid #f0f0f0;
						margin-top: 26rpx;
					}
				}
			}

			.right {
				margin-right: 44rpx;
				margin-top: 26rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: relative;

				.StatusIcon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}

				.blank {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 0;
				}

				.contentArea {
					display: flex;
					align-items: flex-start;
					z-index: 9;

					.operationBox {
						position: absolute;
						right: -5%;
						margin-top: -100rpx;

						.operationBoxtriangle {
							width: 0px;
							height: 0px;
							border-top: 16rpx solid #666;
							border-bottom: 16rpx solid transparent;
							border-left: 16rpx solid transparent;
							border-right: 16rpx solid transparent;
							margin-left: 37%;
						}
					}

					.triangle {
						width: 0px;
						height: 0px;
						border-top: 14rpx solid transparent;
						border-bottom: 14rpx solid transparent;
						border-right: 18rpx solid transparent;
						border-left: 24rpx solid #f0f0f0;
						margin-top: 26rpx;
					}
				}
			}
		}

		.bottomArea {
			width: 100%;
			position: fixed;
			bottom: 0%;
			z-index: 9;

			.bottomAreaTop {
				height: 100rpx;
				background-color: #e8f2ff;
				display: flex;
				align-items: center;

				.voice {
					width: 52rpx;
					height: 52rpx;
					margin-left: 24rpx;
				}

				input {
					width: 62%;
					height: 62rpx;
					background-color: #fff;
					margin-left: 20rpx;
					text-indent: 18rpx;
				}

				.moreOperation {
					width: 52rpx;
					height: 52rpx;
					margin-left: 16rpx;
				}

				.sentButton {
					width: 90rpx;
					height: 56rpx;
					padding: 0;
					line-height: 56rpx;
					font-size: 28rpx;
					font-weight: 600;
					color: #ffffff;
					margin-left: 20rpx;
				}
			}

			.bottomAreaBottom {
				height: 240rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.bottomAreaBottomItem {
					display: flex;
					flex-direction: column;
					align-items: center;

					.itemIcon {
						width: 64rpx;
						height: 58rpx;
					}

					.itemText {
						font-size: 28rpx;
						font-weight: 500;
						color: #1b72ec;
						margin-top: 12rpx;
					}
				}
			}
		}

		.popupMain {
			width: 464rpx;
			height: 268rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			text {
				font-size: 32rpx;
				font-weight: 500;
				color: #1b72ec;
				margin-top: 36rpx;
			}

			input {
				width: 400rpx;
				border-bottom: 1px solid #999999;
				margin-top: 21rpx;
			}

			.buttonArea {
				width: 100%;
				display: flex;
				margin-top: 36rpx;

				button:nth-of-type(1) {
					width: 104rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-left: 40rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}

				button:nth-of-type(2) {
					width: 104rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-right: 40rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}
			}
		}

		.operationBoxMain {
			width: 372rpx;
			height: 92rpx;
			background-color: #666;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			.operationBoxMainItem {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.operationIcon {
					width: 28rpx;
					height: 28rpx;
				}

				.operationText {
					font-size: 20rpx;
					font-weight: 400;
					color: #ffffff;
					margin-top: 6rpx;
				}
			}
		}

		.setStatus {
			width: 750rpx;
			height: 530rpx;
			background-color: #ecf5ff;
			position: absolute;
			bottom: 0;
			z-index: 999;
			display: flex;
			flex-direction: column;
			align-items: center;

			.closeSetStastus {
				width: 52rpx;
				height: 32rpx;
				margin-top: 60rpx;
			}

			.setStatusTitle {
				font-size: 36rpx;
				font-weight: 400;
				color: #333333;
				margin-top: 50rpx;
			}

			.statusArea {
				width: 564rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 24rpx;

				.statusItem {
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					height: 62rpx;
					background: #d1e7ff;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					padding-left: 24rpx;
					margin-top: 36rpx;

					text {
						margin-left: 12rpx;
					}
				}

				.statusItem:active {
					opacity: 0.5;
				}

				.statusItem:nth-of-type(even) {
					width: 236rpx;
				}

				.statusItem:nth-of-type(odd) {
					width: 216rpx;
				}
			}
		}
	}
</style>
