<template>
	<view id="addFriend">
		<uni-nav-bar left-icon="back" title="添加朋友" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<input type="text" value="xxx" v-model="searchValue" class="searchInput" />
			<view class="" @click="searchFriend">
				<text>搜索: {{searchValue}}</text>
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
				width: 662rpx;
				height: 82rpx;
				background-color: #E8F2FF;
				border-radius: 8rpx;
				margin-top: 50rpx;
			}
		}
	}
</style>
