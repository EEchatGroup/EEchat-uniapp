<template>
	<view id="addFriend">
		<uni-nav-bar left-icon="back" title="添加朋友" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<input type="text" value="" v-model="searchValue" class="searchInput" placeholder="请输入账号" />
			<view class="myUid"> <text>我的账号: </text> <text
					class="uidValue">{{ this.$store.state.userInfo.address}}</text> </view>
			<view class="searchResult" @click="searchFriend" v-show="searchValue.length>0">
				<image src="../static/searchFriend.png" mode="" class="searchFriend"></image>
				<text class="searchFriendTitle">搜索:</text>
				<text class="searchFriendValue"> {{searchValue}}</text>


			</view>
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
				searchValue: "1e483ee4ca0a6503608b355125dfa4e2d22820c0"

			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			async searchFriend() {
				let parameter = {}
				parameter.uid = this.searchValue
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				search_friend(parameter).then(async res => {
					if (res.data.errCode == 0) {
						await this.$store.commit("getSearchFriendData", res.data.data)
						uni.navigateTo({
							url: './addFriendDetail'
						});
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
				margin-top: 40rpx;
				.searchFriend {
					width: 60rpx;
					height: 60rpx;
					flex-shrink: 0;
					margin-left: 44rpx;
				}
				.searchFriendTitle{
					flex-shrink: 0;
					margin-left: 20rpx;
				}
				.searchFriendValue{
					word-wrap: break-word;
					flex: 1;
					width: 0;
					margin-left: 20rpx;
				}

			}
		}
	}
</style>
