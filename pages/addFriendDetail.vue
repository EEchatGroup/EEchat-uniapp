<template>
	<view id="addFriendDetail">
		<uni-nav-bar left-icon="back" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<view class="infoCard">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					mode="" class="headIcon"></image>
				<text class="name">{{searchFriendData.name}}</text>
				<view class="uidCon">account number:<text class="uid">{{searchFriendData.uid}}</text>
				</view>
				
				<button type="primary" class="button" @click="addFriend">
					<image src="../static/addFriend2.png" mode="" class="buttonIcon"></image>Add friend
				</button>
				
				<!-- <button type="primary" class="button" @click="addFriend" v-show="!alreadyAdd">
					<image src="../static/addFriend2.png" mode="" class="buttonIcon"></image>Add friend
				</button>
				<button type="primary" class="button" @click="sendMessage" v-show="alreadyAdd">
					<image src="../static/sentMsg.png" mode="" class="buttonIcon"></image>Send Message
				</button> -->

			</view>
			<text class="infoText" v-show="isSend">Friend request sent</text>
		</view>
	</view>
</template>

<script>
	import {
		add_friend
	} from "../api"
	export default {
		data() {
			return {
				searchFriendData: {},
				alreadyAdd: false,
				isSend: false
				
			}
		},
		// onShow: function() {
		// 	console.log(this.$store.state.searchFriendData, "好友详细")
		// 	this.searchFriendData = this.$store.state.searchFriendData
		// },
		methods: {
			goBack() {
				uni.navigateBack()
			},
			addFriend() {
				const reqData = {
					uid:this.searchFriendData.uid,
					reqMessage:"hello"
				}
				this.$openSdk.addFriend(JSON.stringify(reqData))
				// let parameter = {}
				// parameter.uid = this.searchFriendData.uid
				// parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString()
				// add_friend(parameter).then(res => {
				// 	console.log(res, "jiahaoyou返回")
				// 	if (res.data.errCode == 0) {
				// 		this.alreadyAdd = true
				// 		this.isSend = true
				// 		setTimeout(() => {
				// 			this.isSend = false
				// 		}, 3000)
				// 	}
				// })
			},
		},
		onLoad:function(options){
			this.$globalEvent.addEventListener('addFriendFailed',(params)=>{
				console.log(params);
			})
			this.$globalEvent.addEventListener('addFriendSuccess',(params)=>{
				console.log(params);
				const _this = this
				uni.showToast({
					title:"发送成功",
					icon:"success",
					success() {
						_this.isSend = true
					}
				})
			})
			const tmpArr = JSON.parse(options.userInfo)
			this.searchFriendData = tmpArr[0]
		}
	}
</script>

<style lang="scss" scoped>
	#addFriendDetail {
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;

			.infoCard {
				width: 662rpx;
				height: 536rpx;
				background: #FAFCFF;
				box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.14);
				border-radius: 20rpx;
				margin-top: 80rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.headIcon {
					width: 160rpx;
					height: 160rpx;
					border-radius: 160rpx;
					margin-top: 56rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
					margin-top: 32rpx;
				}

				.uidCon {
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 8rpx;
					width: 80%;
					display: flex;

					.uid {
						word-wrap: break-word;
						flex: 1;
						width: 0;
					}

				}

				.button {
					width: 176rpx;
					height: 64rpx;
					font-size: 24rpx;
					font-weight: 500;
					margin-top: 56rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 4rpx;
					.buttonIcon {
						width: 28rpx;
						height: 28rpx;
						margin-right: 12rpx;
					}
				}

			}

			.infoText {
				font-size: 32rpx;
				font-weight: 400;
				color: #1B72EC;
				margin-top: 380rpx;
				text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
			}
		}
	}
</style>
