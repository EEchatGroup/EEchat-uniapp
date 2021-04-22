<template>
	<view id="edit-nickname">
		<uni-nav-bar left-icon="back" title="修改昵称" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<input type="text" v-model="nickname" class="input" />
			<button :type=" nickname.length==0? 'defailt':'primary' "
				:style="nickname.length==0? 'color=#333333':'color=#000000'" class="saveButton"
				@click="submit">保存</button>
		</view>

	</view>
</template>

<script>
	import {
		changeNickname
	} from '../api'
	export default {
		data() {
			return {
				nickname: ""
			}
		},
		onShow() {
			this.nickname = this.$store.state.userInfo.nickName
		},
		methods: {
			goBack() {
				uni.switchTab({
					url: './my'
				});
			},
			submit() {
				let parameter = {}
				parameter.hh = "11111"
				parameter.token = this.$store.state.userInfo.token.accessToken
				parameter.optionID = this.$store.state.userInfo.optionID
				parameter.nickName = this.nickname
				console.log(parameter,"参数")
				changeNickname(parameter).then(res => {
					console.log(res,"修改昵称返回值")
				})
				uni.switchTab({
					url: './my'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#edit-nickname {
		background-image: linear-gradient(#FFFFFF, #FFFFFF, #E4F3FF);
		height: 100% !important;

		.main {
			display: flex;
			align-items: center;
			padding: 0 44rpx;
			margin-top: 88rpx;

			.input {
				font-size: 40rpx;
				font-weight: 500;
				color: #333333;
				border-bottom: 1px solid #999999;
				padding-left: 20rpx;
				padding-bottom: 12rpx;
				width: 510rpx;
			}

			.saveButton {
				padding: 0;
				width: 92rpx;
				height: 52rpx;
				line-height: 52rpx;
				font-size: 28rpx;
				font-weight: 500;
			}
		}

	}
</style>
