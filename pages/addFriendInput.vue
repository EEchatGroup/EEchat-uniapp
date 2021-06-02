<template>
	<view id="addFriendInput">
		<view class="head">
			<input type="text" value="" v-model="searchValue" class="searchInput" placeholder="请输入账号"
				@input="noUser = false" />
			<image src="../static/eliminate.png" mode="" class="eliminate" v-show="searchValue.length>0" @click="eliminateValue"></image>
			<text class="cancel" @click="goBack">取消</text>
		</view>

		<view class="searchResult" @click="searchFriend" v-show="searchValue.length>0 && noUser == false">
			<image src="../static/searchFriend.png" mode="" class="searchFriend"></image>
			<text class="searchFriendTitle">搜索:</text>
			<text class="searchFriendValue">{{searchValue}}</text>
		</view>
		<view class="searchResult2" v-show="noUser">
			<text class="noUserTitle">该用户不存在</text>
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
				searchValue: "1e483ee4ca0a6503608b355125dfa4e2d22820c0",
				noUser: false
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			eliminateValue(){
				this.searchValue=""
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
	#addFriendInput {
		.head {
			height: 126rpx;
			background-color: rgba(138, 191, 255, 0.2);
			display: flex;
			align-items: center;
			position: relative;
			.searchInput {
				width: 400rpx;
				height: 82rpx;
				background-color: #fff;
				border-radius: 8rpx;
				background-image: url(../static/search2.png);
				background-size: 36rpx 36rpx;
				background-repeat: no-repeat;
				background-position: 20rpx 50%;
				padding-left: 76rpx;
				padding-right: 80rpx;
				margin-left: 44rpx;

			}

			.eliminate {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 36%;
				left: 72%;
			}

			.cancel {
				font-size: 36rpx;
				font-weight: 600;
				color: #1B72EC;
				margin-left: 34rpx;
			}
		}

		.searchResult {
			width: 750rpx;
			height: 120rpx;
			background: #E8F2FF;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 32rpx;

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


		}

		.searchResult2 {
			width: 750rpx;
			height: 152rpx;
			background: #E8F2FF;
			display: flex;
			align-items: center;
			justify-content: center;

			.noUserTitle {
				font-size: 32rpx;
				font-weight: 500;
				color: #666666;
			}
		}

	}
</style>
