<template>
	<view id="addFriend">
		<uni-nav-bar left-icon="back" title="Add friends" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<!-- <input type="text" value="" class="searchInput" placeholder="Please enter the account number" @focus="goInput" /> -->
			<u-search class="my-search" disabled shape="square" @click="goInput"></u-search>
			<view class="myUid"> <text>My Account: </text> <text
					class="uidValue">{{ this.$store.state.userInfo.address}}</text> </view>

		</view>






	</view>
</template>

<script>
	import {
		search_friend
	} from "../api"
	export default {
		data() {
			return {
				noUser: false
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goInput() {
				uni.navigateTo({
					url: './addFriendInput'
				});
			},
			async searchFriend() {
				let parameter = {}
				parameter.uid = this.searchValue
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				search_friend(parameter).then(async res => {
					console.log(res)
					if (res.data.errCode == 0) {
						await this.$store.commit("getSearchFriendData", res.data.data)
						uni.navigateTo({
							url: './addFriendDetail'
						});
					} else {
						this.noUser = true
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#addFriend {
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;

			.searchInput {
				width: 580rpx;
				height: 82rpx;
				background-color: #E8F2FF;
				border-radius: 8rpx;
				margin-top: 50rpx;
				background-image: url(../static/search2.png);
				background-size: 36rpx 36rpx;
				background-repeat: no-repeat;
				background-position: 20rpx 50%;
				padding-left: 76rpx;
				padding-right: 20rpx;
			}
			.my-search{
				padding:50rpx 20rpx 0 76rpx
			}

			.myUid {
				font-size: 30rpx;
				font-weight: 400;
				color: #666666;
				width: 82%;
				display: flex;
				margin-top: 32rpx;

				.uidValue {
					word-wrap: break-word;
					flex: 1;
					width: 0;
				}

			}

			.searchResult {
				width: 750rpx;
				height: 120rpx;
				background: #E8F2FF;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40rpx;

				.searchFriend {
					width: 60rpx;
					height: 60rpx;
					flex-shrink: 0;
					margin-left: 44rpx;
				}

				.searchFriendTitle {
					flex-shrink: 0;
					margin-left: 20rpx;
				}

				.searchFriendValue {
					word-wrap: break-word;
					flex: 1;
					width: 0;
					margin-left: 20rpx;
					margin-right: 30rpx;
				}

				.noUserTitle {
					font-size: 32rpx;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	}
</style>
