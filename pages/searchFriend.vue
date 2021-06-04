<template>
	<view id="searchFriend">
		<uni-nav-bar left-icon="back" title="搜索联系人" @clickLeft="goBack"></uni-nav-bar>
		<view class="inputCon">
			<input type="text" value="" class="searchInput" />
		</view>
		<view class="friendList">

			<view class="friendListItem" v-for="item in friendList">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					mode="" class="portrait"></image>
				<view class="ItemMain">
					<text>{{item.name}}</text>
				</view>

			</view>


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
				friendList: []
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
		},
		async onShow() {
			let parameter = {}
			parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
			get_friend_list(parameter).then(res => {
				console.log(res.data, "好友列表")
				this.friendList = res.data.data

			})
		}
	}
</script>

<style lang="scss" scoped>
	#searchFriend {
		.inputCon {
			.searchInput {
				width: 506rpx;
				height: 68rpx;
				background-color: #E8F2FF;
				border-radius: 8rpx;
				background-image: url(../static/search2.png);
				background-size: 36rpx 36rpx;
				background-repeat: no-repeat;
				background-position: 20rpx 50%;
				padding-left: 76rpx;
				padding-right: 80rpx;
				margin-left: 44rpx;
				margin-top: 20rpx;
			}
		}

		.friendList {

			margin-top: 6rpx;

			.friendListItem {
				background-color: #fff;
				height: 146rpx;
				display: flex;
				align-items: center;


				.portrait {
					flex-shrink: 0;
					width: 92rpx;
					height: 92rpx;
					border-radius: 92rpx;
					margin-left: 44rpx;
				}

				.ItemMain {
					height: 144rpx;
					display: flex;
					align-items: center;
					width: 100%;
					margin-left: 28rpx;
					border-bottom: 1px solid #E5EBFF;
				}


			}






		}
	}
</style>
