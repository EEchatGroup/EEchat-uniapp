<template>
	<view id="dialogue">
		<uni-nav-bar left-icon="back" @clickLeft="goBack">
			<view slot="default" class="middle">
				<view class="headInfo">
					<text>{{nickname}}</text>
					<image src="../static/modify.png" mode="" class="modify" @click="modifyRemarks"></image>
				</view>
			</view>
		</uni-nav-bar>
		<view class="main">
			<view class="hhhh" v-for="item in list">
				<view v-if="item.sendID == $store.state.userInfo.address" class="right">
					<!-- <image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image> -->
					<view class="contentArea">
						<text class="maincontent">{{item.content}}</text>
						<view class="triangle">
						</view>
						<image src="../static/exit.png" mode="" class="headIcon">
						</image>
					</view>

				</view>
				<view v-if="item.sendID != $store.state.userInfo.address" class="left">
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
					<view class="contentArea">
						<view class="triangle">
						</view>
						<text class="maincontent">{{item.content}}</text>
					</view>

				</view>
			</view>
			<!-- <view v-for="item in list" :class="item.sendID == $store.state.userInfo.userID? 'right':'left'">
				<image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image>
				<view class="contentArea">
					<text class="maincontent">{{item.content}}</text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>
			
			</view>
			<view class="left">
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
					<view class="contentArea">
						<view class="triangle">
						</view>
						<text class="maincontent">dddddddddddddddddddddddddddd</text>
					</view>
				
			</view> -->
			<!-- <view class="right">
				<image src="../static/sentFail.png" mode="" v-if="sentStatus" class="StatusIcon"></image>

				<view class="contentArea">
					<text class="maincontent">ddddddddddddddddddddddddddddddddddddddddddddddd</text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view>
			<view class="right">
				<image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image>
				<view class="contentArea">
					<text class="maincontent">dddddddddddddd</text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view>
			<view class="right">
				<image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image>
				<view class="contentArea">
					<text class="maincontent"><img src="" alt="" id="kkk" class="sendImg"></text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view> -->


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
		send_msg,
		newest_seq
	} from '../api'
	export default {
		data() {
			return {
				nickname: "奥克斯公司",
				remarks: "",
				sentStatus: true,
				withdrawnStatus: true,
				isSendImg: false,
				inputValue: "",
				userInfo: {},
				list: []
			}
		},
		methods: {
			
			/* wsLink() {
				this.userInfo = this.$store.state.userInfo
				let that = this
				that.websockets.ws.onmessage = function(res) {
					console.log(JSON.parse(res.data), "接收消息推送")
					let resData = JSON.parse(res.data)
					if (resData.ReqIdentifier == 2001) {
						this.list.push(resData)
					}
				}
			}, */
			async sendInfo() {
				this.userInfo = this.$store.state.userInfo
				let that = this
				console.log(that.userInfo, "hhhhhhhhh")
				let parameter = {}
				parameter.reqIdentifier = 1003
				parameter.platformID = 5
				parameter.token = sessionStorage.getItem('token')
				parameter.sendID = that.userInfo.address
				parameter.operationID = that.userInfo.address + await Date.now().toString();
				parameter.msgIncr = that.$store.state.MsgIncr + 1;
				parameter.data = {}
				parameter.data.sessionType = 1
				parameter.data.msgFrom = 100
				parameter.data.contentType = 101
				parameter.data.recvID = "56d5bee7d8c774e66b771b2865ae3d92d145a54a"
				parameter.data.content = this.inputValue
				parameter.data.clientMsgID = "222"
				parameter.data.offlineInfo = {}
				parameter.data.forceList = []
				parameter.data.options = {}
				parameter.data.ext = {}

				if (parameter.data.content.length > 0) {
					that.$store.commit("MsgIncrAdd")
					send_msg(parameter).then(res => {
						console.log(res)
					})
					console.log(parameter, "发送输入消息")
					/* that.websockets.ws.send(JSON.stringify(parameter)); */
				} else {
					console.log("消息为空")
				}
				let latest = {}
				latest.sendID = that.userInfo.address
				latest.recvID = "ed3d2c21991e3bef5e069713af9fa6ca"
				latest.sendTime = Date.now()
				latest.subMsgType = 101
				latest.msgType = 100
				latest.content = this.inputValue
				latest.seq = 2
				// latest.serverMsgID = "2021 - 04 - 21 17: 59: 38 - 5018949295715050020 "
				if (parameter.data.content.length > 0) {
					this.list.push(latest)
					console.log(this.list, "本地消息列表")
					this.inputValue = ""
				} else {
					console.log("消息为空")
				}
				

			},
			upload() {
				let input = document.createElement('input');
				input.type = 'file';
				input.accept = 'image/*';
				input.click()
				input.onchange = (event) => {
					let preview = document.querySelector('#kkk');
					let file = event.path[0].files[0];
					let reader = new FileReader();
					//新建 FileReader 对象
					reader.addEventListener("load", function() {
						preview.src = reader.result;
						console.log(reader.result)
					}, false);
					if (file) {
						reader.readAsDataURL(file);
					}

				}
			},
			goBack() {
				uni.switchTab({
					url: "./home"
				})
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
		mounted() {
		
		}

	}
</script>

<style lang="scss" scoped>
	#dialogue {

		//公用样式
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

				.modify {
					width: 28rpx;
					height: 30rpx;
					margin-left: 20rpx;
				}
			}
		}


		.main {

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
