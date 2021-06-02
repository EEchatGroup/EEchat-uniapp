<template>
	<view id="dialogue">

		<uni-nav-bar left-icon="back" @clickLeft="goBack" @clickRight="goSetFriend" fixed="true">
			<view slot="default" class="middle">
				<view class="headInfo">
					<text>{{nickname.length>20?nickname.slice(0,20)+"...":nickname}}</text>
				</view>
			</view>
			<view slot="right" class="headRight"><text class="more">···</text></view>
		</uni-nav-bar>
		<view class="main" id="main">
			<view v-for="item in list">
				<view v-if="item.sendID == $store.state.userInfo.address && item.msgFrom==100
				" class="right">
					<!-- <image src="../static/withdraw.png" mode=""  class="StatusIcon"></image> -->
					<image src="../static/sentFail.png" mode="" v-if="item.sentFail" class="StatusIcon"></image>

					<view class="contentArea">
						<view class="maincontent" v-show="item.contentType == 101">{{item.content}}</view>
						<view class="maincontent" v-show="item.contentType == 102">
							<image :src="item.content.thumbnail" mode=""></image>
						</view>
						<view class="triangle">
						</view>
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
							mode="" class="headIcon">
						</image>
					</view>

				</view>
				<view v-if="item.sendID!= $store.state.userInfo.address && item.msgFrom==100" class="left">

					<view class="contentArea">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
							mode="" class="headIcon">
						</image>
						<view class="triangle">
						</view>
						<view class="maincontent" v-show="item.contentType == 101">{{item.content}}</view>
						<view class="maincontent" v-show="item.contentType == 102">
							<image :src="item.content.thumbnail" mode=""></image>
						</view>

					</view>

				</view>
			</view>

		</view>

		<view class="bottomArea">
			<image src="../static/album.png" mode="" class="album" @click="upload()"></image>
			<input type="text" value="" v-model="inputValue" />
			<button type="primary" class="sentButton" @click="sendInfo">发送</button>
		</view>
		<uni-popup ref="popup">
			<view class="popupMain">
				<text>修改备注</text>
				<input type="text" value="" v-model="remarks" placeholder="请输入昵称" />
				<view class="buttonArea">
					<button type="primary" @click="cancel">取消</button>
					<button type="primary" @click="confirm">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		changeAlias,
		send_msg
	} from '../api'
	import uploadFile from '../uploadFile/index.js'
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
				messages: []
			}
		},
		onLoad: function(option) {
			console.log(option, "wsxwswxwsx")
			this.nickname = option.id
			this.recipientID = option.id

			try {
				this.messages = uni.getStorageSync(this.$store.state.userInfo.address +
					'localMessage');
				for (let i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id == option.id) {
						/* for(let y = 0; y < messages[i].list.length; y++){
							if(messages[i].list[y].contentType== 102) {
							messages[i].list[y].content = JSON.parse(messages[i].list[y].content)
							}
						} */

						this.list = this.messages[i].list
						console.log(this.list, "duihua")
						break
					}

				}

			} catch (e) {
				// error
			}




		},
		methods: {
			async sendInfo() {

				let parameter = {}
				let latest = {}
				latest.sentFail = false
				parameter.reqIdentifier = 1003
				parameter.platformID = 5
				parameter.token = uni.getStorageSync('token')
				parameter.sendID = this.userInfo.address
				parameter.operationID = this.userInfo.address + await Date.now().toString();
				parameter.msgIncr = this.$store.state.MsgIncr + 1;
				parameter.data = {}
				parameter.data.sessionType = 1
				parameter.data.msgFrom = 100
				parameter.data.contentType = 101
				parameter.data.recvID = this.recipientID
				parameter.data.content = this.inputValue
				parameter.data.clientMsgID = "222"
				parameter.data.offlineInfo = {}
				parameter.data.forceList = []
				parameter.data.options = {}
				parameter.data.ext = {}

				if (parameter.data.content.length > 0) {
					this.$store.commit("MsgIncrAdd")
					console.log(parameter, "消息发送参数")
					send_msg(parameter).then(res => {
							console.log(res, "44444")
							latest.sentFail = false

						})
						.catch(function(error) {
							latest.sentFail = true
							console.log("7777")
						});

				} else {
					uni.showToast({
						title: '消息为空',
						icon: "none",
						duration: 1500
					});
				}

				latest.sendID = this.userInfo.address
				latest.recvID = this.recipientID
				latest.sendTime = Date.now()
				latest.contentType = 101
				latest.msgFrom = 100
				latest.content = this.inputValue
				latest.seq = uni.getStorageSync(this.userInfo.address + 'latestSeq') + 1
				latest.serverMsgID = "2021-06-01 09:37:46-4b134ea6ec423a385f96629ea4b6718304e3bd23-913761085841340441"
				/* if (sendStatus == true) {
				 latest.sentFail = false
				} else {
				 latest.sentFail = true
				} */

				if (parameter.data.content.length > 0) {
					this.list.push(latest)
					console.log(this.list, "本地消息列表")
					this.inputValue = ""


					for (let i = 0; i < this.messages.length; i++) {
						if (this.messages[i].id == this.recipientID) {
							this.messages[i].list = this.list
							console.log(this.messages, "duihua")
							break
						}

					}
					try {
						uni.setStorageSync(this.userInfo.address +
							'localMessage', this.messages);
						console.log(uni.getStorageSync(this.userInfo.address +
							'localMessage'), "456123")
					} catch (e) {
						// error
					}

					if (latest.sentFail == false) {
						try {
							uni.setStorageSync(this.userInfo.address +
								'latestSeq', latest.seq);
						} catch (e) {
							// error
						}
					}




					const query = uni.createSelectorQuery().in(this);
					query.select('#main').boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data.height,
							duration: 100
						});
					}).exec();


				}


			},
			upload() {
				let that = this
				// 选择文件
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], //从相册选择
					success: async function(res) {
						const tempFilePaths = res.tempFilePaths;
						let suffix = res.tempFiles[0].name.substring(res.tempFiles[0].name.length - 4)
						await uploadFile(tempFilePaths[0], suffix)
						console.log(res, "5555645656")
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: async function(image) {
								console.log(image.width);
								var imgWidth = image.width
								console.log(image.height);
								var imageHeight = image.height
								let parameter = {}
								let latest = {}
								latest.sentFail = false
								parameter.reqIdentifier = 1003
								parameter.platformID = 5
								parameter.token = uni.getStorageSync('token')
								parameter.sendID = that.userInfo.address
								parameter.operationID = that.userInfo.address + Date.now()
									.toString();
								parameter.msgIncr = that.$store.state.MsgIncr + 1;
								parameter.data = {}
								parameter.data.sessionType = 1
								parameter.data.msgFrom = 100
								parameter.data.contentType = 102
								parameter.data.recvID = that.recipientID
								parameter.data.content = {}
								parameter.data.content.url = that.$store.state.upLoadImgUrl
								parameter.data.content.thumbnail = that.$store.state.upLoadImgUrl +
									"?imageView2/2/w/300/h/300"
								parameter.data.content.width = imgWidth
								parameter.data.content.height = imageHeight
								this.imgContent = parameter.data.content
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
								that.list.push(latest)
								console.log(that.list, "本地消息列表")
								await that.$store.commit('getUpLoadImgUrl', "")

								const query = uni.createSelectorQuery().in(that);
								query.select('#main').boundingClientRect(data => {
									uni.pageScrollTo({
										scrollTop: data.height,
										duration: 100
									});
								}).exec();

							}

						});




					}
				});








			},
			goBack() {
				uni.switchTab({
					url: "./home"
				})

			},
			goSetFriend() {
				uni.navigateTo({
					url: './setFriend'
				});
			},
			modifyRemarks() {
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close()
			},
			confirm() {
				let parameter = {}
				parameter.optionID = ""
				parameter.accountAddr = ""
				parameter.nickName = this.remarks
				changeAlias(parameter).then(res => {
					console.log("res")
					this.$refs.popup.close()
				})

			}
		},
		watch: {
			"$store.state.newInfoJudgeValue": {
				deep: true,
				handler: function(newVal, oldVal) {
					if (this.$store.state.latestNews.sendID == this.recipientID) {

						this.list.push(this.$store.state.latestNews)
						console.log(this.list, "消息列表")
					}

				}
			}
		},
		mounted() {
			this.userInfo = this.$store.state.userInfo
			const query = uni.createSelectorQuery().in(this);
			query.select('#main').boundingClientRect(data => {
				uni.pageScrollTo({
					scrollTop: data.height,
					duration: 1
				});
			}).exec();
		}

	}
</script>

<style lang="scss" scoped>
	#dialogue {
		/deep/.uni-navbar__content {
			width: 100%;
		}

		.uni-navbar {
			box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
		}

		.maincontent {
			max-width: 384rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			background-color: #F0F0F0;
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
			height: 88rpx;
			width: 88rpx;
		}

		.middle {
			margin: 0 auto;

			.headInfo {
				display: flex;
				align-items: center;


			}
		}

		.headRight {
			padding-top: 14rpx;

			.more {
				margin: 0;
				font-size: 50px;
			}
		}


		.main {
			padding-bottom: 220rpx;

			.left {
				margin-left: 44rpx;
				margin-top: 26rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.contentArea {
					display: flex;
					align-items: flex-start;

					.triangle {
						width: 0px;
						height: 0px;
						border-top: 14rpx solid transparent;
						border-bottom: 14rpx solid transparent;
						border-left: 18rpx solid transparent;
						border-right: 24rpx solid #F0F0F0;
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


				.StatusIcon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}

				.contentArea {
					display: flex;
					align-items: flex-start;

					.triangle {
						width: 0px;
						height: 0px;
						border-top: 14rpx solid transparent;
						border-bottom: 14rpx solid transparent;
						border-right: 18rpx solid transparent;
						border-left: 24rpx solid #F0F0F0;
						margin-top: 26rpx;

					}


				}

			}
		}

		.bottomArea {
			width: 100%;
			height: 100rpx;
			background-color: #E8F2FF;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0%;

			.album {
				width: 60rpx;
				height: 60rpx;
				margin-left: 24rpx;
			}

			input {
				width: 68%;
				height: 62rpx;
				background-color: #fff;
				margin-left: 20rpx;
				text-indent: 18rpx;
			}

			.sentButton {
				width: 90rpx;
				height: 56rpx;
				padding: 0;
				line-height: 56rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #FFFFFF;
				margin-left: 20rpx;
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
				color: #1B72EC;
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
	}
</style>
