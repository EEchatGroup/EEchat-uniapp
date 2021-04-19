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
			<view class="left">
				<image src="../static/exit.png" mode="" class="headIcon">
				</image>
				<view class="contentArea">
					<view class="triangle">
					</view>
					<text class="mainContent">dddddddddddddddddddddddddddd</text>
				</view>
			</view>
			<view class="right">
				<image src="../static/sentFail.png" mode="" v-if="sentStatus" class="StatusIcon"></image>

				<view class="contentArea">
					<text class="mainContent">ddddddddddddddddddddddddddddddddddddddddddddddd</text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view>
			<view class="right">
				<image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image>
				<view class="contentArea">
					<text class="mainContent">dddddddddddddd</text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view>
			<view class="right">
				<image src="../static/withdraw.png" mode="" v-if="withdrawnStatus" class="StatusIcon"></image>
				<view class="contentArea">
					<text class="mainContent"><img src="" alt="" id="kkk" class="sendImg"></text>
					<view class="triangle">
					</view>
					<image src="../static/exit.png" mode="" class="headIcon">
					</image>
				</view>

			</view>


		</view>

		<view class="bottomArea">
			<image src="../static/album.png" mode="" class="album" @click="upload()"></image>
			<input type="text" value="" />
			<button type="primary" class="sentButton">发送</button>
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
	export default {
		data() {
			return {
				nickname: "奥克斯公司",
				remarks: "",
				sentStatus: true,
				withdrawnStatus: true,
				isSendImg: false
			}
		},
		methods: {
			websocketLin(){
				var ws = new WebSocket("ws://47.112.160.66:10000");
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
				this.$refs.popup.close()
			}
		},
		created() {
			this.websocketLin()
		}

	}
</script>

<style lang="scss" scoped>
	#dialogue {

		//公用样式
		.mainContent {
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
			.sendImg{
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
