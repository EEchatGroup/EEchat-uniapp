<template>
	<view id="mailList">
		<view class="head">
			<text class="title">mail list</text>
			<view class="headRight">
				<image src="../static/search.png" mode="" class="headIcon" @click="goSearch"></image>
				<image src="../static/more-operations.png" mode="" class="headIcon" @click="controlDisplay"></image>
				<view class="menuCon" v-if="showOperationsMenu">
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
			<view class="newFriendMain">
				<image src="../static/newFriend.png" mode="" class="newFriendIcon"></image>
				<text class="newFriendText">New friends</text>
			</view>
			<view class="newFriendNumber">
				2
			</view>
		</view>
		<view class="">
		<!-- 	<u-index-list :sticky="false" :scrollTop="scrollTop">
				<view v-for="(item, index) in indexList" :key="index">
					<u-index-anchor :index="item" />
					<view v-for="dataItem in data" v-if="dataItem.title==item" class="list-cell">
						{{dataItem.msg}}
					</view>
				</view>
			</u-index-list> -->
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
				}, ]
			}
		},
		onShow: async function() {
			// if (this.friendList.length == 0) {
			// 	for (let x = 0; x < this.Initials.length; x++) {
			// 		let item = {}
			// 		item.letter = this.Initials[x]
			// 		item.data = []
			// 		this.friendList.push(item)
			// 	}
			// 	console.log(this.friendList, "xxx");
			// }


			// let parameter = {}
			// parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
			// get_friend_list(parameter).then(res => {
			// 	console.log(res.data, "好友列表")
			// 	for (let i = 0; i < res.data.data.length; i++) {
			// 		res.data.data[i].img =
			// 			"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
			// 		for (let y = 0; y < this.Initials.length; y++) {
			// 			this.friendList[y].data = []
			// 			this.friendList[y].data.push(res.data.data[i])
			// 		}

			// 	}
			// 	console.log(this.friendList, "544566");
			// })
		},
		methods: {
			getMailList() {
				this.$openSdk.getFriendList((data) => {
					// const tmpList = JSON.parse(data.msg)
					const tmpList = [
						{
							uid:"123456"
						},
						{
							uid:"123456"
						},
						{
							uid:"123456"
						},{
						uid:"123456"
					}
					]
					console.log(tmpList)
					tmpList.map(i => {
						i.img =
							"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					})
					this.friendList = [{
						letter: "A",
						data: [...tmpList,...tmpList,...tmpList,...tmpList]
					}]
					console.log(this.friendList)
				})
			},
			async bindClick(e) {
				let item = Object.assign({}, e.item.name)
				console.log(item, "7777777777")
				if (item.isInBlackList === 1) {
					item.blackStatus = true
				} else {
					item.blackStatus = false
				}
				await this.$store.commit('getSetFriendData', item)
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
		},
		beforeMount() {
			this.getMailList()
		},
		onShow() {
			this.getMailList()
		}
	}
</script>

<style lang="scss" scoped>
	#mailList {
		// position: relative;

		.head {
			// position: fixed;
			// z-index: 99;
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
					top: 86rpx;
					right: 1.5%;
					display: flex;
					flex-direction: column;

					&::after {
						content: '';
						position: absolute;
						top: -36rpx;
						right: 36rpx;
						border: 20rpx solid;
						border-color: transparent transparent #1b72ec transparent;
					}

					.operationsMenu {
						width: 250rpx;
						height: 100rpx;
						background-color: #1B72EC;
						box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
						border-radius: 18rpx;


						.operationsMenu-item {
							display: flex;
							align-items: center;
							font-size: 30rpx;
							font-weight: 600;
							color: #FFFFFF;

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
			// padding-top: 90rpx;
			height: 136rpx;
			background-color: #fff;
			margin-top: 6rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.newFriendMain {
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

			.newFriendNumber {
				width: 32rpx;
				height: 32rpx;
				border-radius: 32rpx;
				background-color: #F44038;
				text-align: center;
				line-height: 32rpx;
				font-size: 24rpx;
				font-weight: 600;
				color: #FFFFFF;
				margin-right: 24rpx;
			}
		}
	}
</style>
