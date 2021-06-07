<template>
	<view id="mailList">
		<view class="head">
			<text class="title">mail list</text>
			<view class="headRight">
				<image src="../static/search.png" mode="" class="headIcon" @click="goSearch"></image>
				<image src="../static/more-operations.png" mode="" class="headIcon" @click="controlDisplay"></image>
				<view class="menuCon" v-show="showOperationsMenu">
					<view class="triangle">

					</view>
					<view class="operationsMenu">
						<view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/addFriend.png" mode="" class="itemImg"></image>
							<text>Add friends</text>
						</view>
						<!-- <view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/groupChat.png" mode="" class="itemImg"></image>
							<text>发起群聊</text>
						</view>
						<view class="operationsMenu-item" @click="goAddFriend">
							<image src="../static/feedback.png" mode="" class="itemImg"></image>
							<text>帮助与反馈</text>
						</view> -->
					</view>



				</view>





			</view>
		</view>
		<view class="newFriend" @click="goNewFriends">
			<image src="../static/newFriend.png" mode="" class="newFriendIcon"></image>
			<text class="newFriendText">Add friends</text>
		</view>
		<view class="">
			<uni-indexed-list :options="friendList" :showSelect="false" @click="bindClick"></uni-indexed-list>
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
				Initials: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T',
					'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				friendList: [],
				showOperationsMenu: false,
				list: [{
						"letter": "A",
						"data": []
					}, {
						"letter": "B",
						"data": [{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
							name: "BBB",
							uid: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
						}]
					},
				]
			}
		},
		onShow: async function() {
			if (this.friendList.length == 0) {
				for (let x = 0; x < this.Initials.length; x++) {
					let item = {}
					item.letter = this.Initials[x]
					item.data = []
					this.friendList.push(item)
				}
				console.log(this.friendList, "xxx");
			}


			let parameter = {}
			parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
			get_friend_list(parameter).then(res => {
				console.log(res.data, "好友列表")
				for (let i = 0; i < res.data.data.length; i++) {
					res.data.data[i].img =
						"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						for(let y=0;y<this.Initials.length; y++){
							this.friendList[y].data=[]
							this.friendList[y].data.push(res.data.data[i])
						}
					
				}
				console.log(this.friendList,"544566");
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
			goSearch() {
				uni.navigateTo({
					url: './searchFriend'
				});
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
				color: #1B72EC;
				margin-left: 44rpx;
			}

			.headRight {
				.headIcon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 40rpx;

				}

				.menuCon {
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
						border-bottom: 18rpx solid #1B72EC;
						border-left: 18rpx solid transparent;
						border-right: 18rpx solid transparent;

						margin-left: 80%;
					}

					.operationsMenu {
						width: 250rpx;
						height: 100rpx;
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
