<template>
	<view id="mailList">
		<view class="head">
			<text class="title">通讯录</text>
			<view class="headRight">
				<image src="../static/search.png" mode="" class="headIcon"></image>
				<image src="../static/more-operations.png" mode="" class="headIcon" @click="controlDisplay"></image>
				<view class="menuCon" v-show="showOperationsMenu">
					<view class="triangle" >
						
					</view>
					<view class="operationsMenu">
						<view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/addFriend.png" mode="" class="itemImg"></image>
							<text>添加朋友</text>
						</view><view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/groupChat.png" mode="" class="itemImg"></image>
							<text>发起群聊</text>
						</view><view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/feedback.png" mode="" class="itemImg"></image>
							<text>帮助与反馈</text>
						</view>
					</view>
					
					
					
				</view>
				
				



			</view>
		</view>
		<view class="newFriend" @click="goNewFriends">
			<image src="../static/newFriend.png" mode="" class="newFriendIcon"></image>
			<text class="newFriendText">新的朋友</text>
		</view>
		<view class="">
			<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
		</view>
	</view>
</template>

<script>
	import {
		get_friend_list
	} from "../api"
	export default {
		data() {
			return {
				showOperationsMenu: false,
				list: [{
					"letter": "A",
					"data": []
				}, {
					"letter": "B",
					"data": []
				}]
			}
		},
		onShow: async function() {
			let parameter = {}
			parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
			get_friend_list(parameter).then(res => {
				console.log(res.data, "好友列表")
				this.list[0].data = []
				for (let i = 0; i < res.data.data.length; i++) {
					res.data.data[i].img =
						"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					this.list[0].data.push(res.data.data[i])
				}

			})
		},
		methods: {
			async bindClick(e) {
				console.log(e.item.name, "7777777777")
				await this.$store.commit('getSetFriendData', e.item.name)
				uni.navigateTo({
					url: './setFriend'
				});
			},
			controlDisplay() {
				this.showOperationsMenu = !this.showOperationsMenu
			},
			goAddFriend() {
				uni.navigateTo({
					url: './addFriend'
				});
				this.showOperationsMenu = false
			},
			goNewFriends() {
				uni.navigateTo({
					url: './newFriends'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#mailList {
		background-color: #E8E8E8;
		height: 100% !important;

		.menuCon{
			z-index: 99;
			position: absolute;
			top: 5%;
			right: 1.5%;
			display: flex;
			flex-direction: column;
			
			.triangle{
				width: 0px;
				height: 0px;
				border-top: 18rpx solid transparent;
				border-bottom: 18rpx solid #1B72EC;
				border-left: 18rpx solid transparent;
				border-right: 18rpx solid transparent;
				
				margin-left: 78%;
			}
			
			.operationsMenu {
				width: 222rpx;
				height: 240rpx;
				background-color: #1B72EC;
				box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
				border-radius: 18rpx;
				
				padding: 0 46rpx;
			
				.operationsMenu-item {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-weight: 600;
					color: #FFFFFF;
					margin-top: 26rpx;
			
					.itemImg {
						width: 44rpx;
						height: 44rpx;
						margin-right: 28rpx;
					}
				}
			}
		}
	
		

		.head {
			height: 90rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 44rpx;
				font-weight: 500;
				color: #1B72EC;
				margin-left: 44rpx;
			}

			.headRight {
				.headIcon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 40rpx;

				}
			}
		}

		.newFriend {
			height: 136rpx;
			background-color: #fff;
			margin-top: 6rpx;
			display: flex;
			align-items: center;

			.newFriendIcon {
				width: 88rpx;
				height: 88rpx;
				margin-left: 44rpx;
			}

			.newFriendText {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
				margin-left: 32rpx;
			}
		}
	}
</style>
