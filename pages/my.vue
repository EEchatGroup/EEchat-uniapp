<template>
	<view id="my">
		<view class="head">
			<view class="headCircle">
				<view class="lastname">XXX</view>
			</view>
			<view class="headInfo">
				<text>XXXXXXXXXXXXXXX</text>
				<text>My Account:</text>
				<text>{{userInfo.publicKey}}</text>
			</view>
		</view>
		<view class="funtionArea">
			<uni-list>
				<uni-list-item thumb="../static/changeAvatar.png" title="Change your Avatar" clickable
					@click="changeAvatar"></uni-list-item>
				<uni-list-item thumb="../static/edit.png" title="Change nickname" clickable @click="goEditNickname">
				</uni-list-item>
				<uni-list-item thumb="../static/blockList.png" title="Address book blacklist" clickable
					@click="goBlockList"></uni-list-item>
				<!-- <uni-list-item thumb="../static/link.png" title="生成会话链接" clickable @click="showLinkPopup"></uni-list-item>
				<uni-list-item thumb="../static/exit.png" title="退出登录" clickable @click="logoutConfirm"></uni-list-item> -->
			</uni-list>

			<view class="logOutArea" @click="logoutConfirm">
				<image src="../static/logOut.png" mode="" class="logOutIcon"></image>
				<text class="logOutText">Log out</text>
			</view>
		</view>
		
		<uni-popup ref="logoutPopup">
			<view class="logout">
				<view class="title">
					<text>Are you sure you want to log out?</text>
				</view>

				<view class="buttonArea">
					<button type="primary" @click="logoutCancel">Cancel</button>
					<button type="primary" @click="logout">Confirm</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				linkValue: "1111122222222211111",
				userInfo: {},
				tt: 0
			}
		},

		methods: {
			changeAvatar(){
				let _this = this 
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original','compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						const tempFilePaths = res.tempFilePaths[0]
						let parameter = {}
						parameter.icon = tempFilePaths
						_this.$openSdk.setSelfInfo(parameter,data=>{
							console.log(data);
						})
				    }
				});
			},
			goEditNickname() {
				uni.navigateTo({
					url: './editNickname'
				})
			},
			goBlockList() {
				uni.navigateTo({
					url: './blockList'
				})
			},
			logoutConfirm() {
				this.$refs.logoutPopup.open()
			},
			
			logoutCancel() {
				this.$refs.logoutPopup.close()
			},
			logout() {
				this.$openSdk.logout()
				this.$refs.logoutPopup.close()
				
			}
		},
		mounted() {
			this.userInfo = this.$store.state.userInfo
			// this.setConversationListener()
			// this.$openSdk.setConversationListener()
		}
	}
</script>

<style lang="scss" scoped>
	#my {
		height: 100% !important;
		background-color: #F0F6FF;

		.head {
			height: 268rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.headCircle {
				width: 120rpx;
				height: 120rpx;
				border-radius: 120rpx;
				background-image: linear-gradient(to right bottom, #74FAD4, #0B8597);
				margin-left: 44rpx;
				margin-right: 40rpx;

				.lastname {
					font-size: 48rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 120rpx;
					text-align: center;
				}
			}

			.headInfo {
				display: flex;
				flex-direction: column;
				width: 480rpx;
				white-space: normal;
				word-break: break-all;
				overflow: hidden;

				text:nth-of-type(1) {
					font-size: 40rpx;
					font-weight: 500;
					color: #333333;
				}

				text:nth-of-type(2) {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 18rpx;
				}

				text:nth-of-type(3) {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
				}

			}

		}

		.funtionArea {
			margin-top: 28rpx;

			.logOutArea {
				height: 112rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				margin-top: 440rpx;

				.logOutIcon {
					width: 40rpx;
					height: 40rpx;
				}

				.logOutText {
					font-size: 36rpx;
					font-weight: 500;
					color: #1B72EC;
					margin-left: 20rpx;
				}
			}
		}

		.linkPopup {
			width: 448rpx;
			height: 250rpx;
			border-radius: 20rpx;
			background-color: #fff;
			padding: 26rpx 40rpx;
			display: flex;
			flex-direction: column;

			text:nth-of-type(1) {
				font-size: 32rpx;
				font-weight: 500;
				color: #1B72EC;
				margin: 0 auto;
			}

			text:nth-of-type(2) {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				margin-top: 30rpx;
			}

			input {
				width: 438rpx;
				height: 56rpx;
				background-color: #F0F6FF;
				margin-top: 8rpx;
				font-size: 20rpx;
				font-weight: 500;
				color: #333333;
				padding-left: 10rpx;
			}

			.buttonArea {
				display: flex;
				margin-top: 30rpx;

				button:nth-of-type(1) {
					width: 104rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-left: 0rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}

				button:nth-of-type(2) {
					width: 134rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-right: 0rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}
			}
		}

		.logout {
			width: 528rpx;
			height: 300rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				font-size: 34rpx;
				font-weight: 500;
				color: #333333;
				margin-top: 60rpx;
				padding: 0 50rpx;
				text-align: center;
			}

			.buttonArea {
				width: 100%;
				display: flex;
				margin-top: 70rpx;

				button:nth-of-type(1) {
					width: 104rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-left: 70rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}

				button:nth-of-type(2) {
					width: 104rpx;
					height: 42rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 42rpx;
					margin-right: 70rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
				}
			}
		}
	}
</style>
