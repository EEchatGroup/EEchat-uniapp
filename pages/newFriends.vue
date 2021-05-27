<template>
	<view id="newFriends">
		<uni-nav-bar left-icon="back" title="新的朋友" @clickLeft="goBack"></uni-nav-bar>

		<view class="requestList">
			<view class="listItem" v-for="item in requestList">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					mode="" class="portrait"></image>
				<view class="listItemMain">
					<text>{{item.uid.length>20?item.uid.slice(0,20) + "...":item.uid}} </text>
					<button type="primary" class="increase" v-show="item.flag==0"
						@click="addConfirm(item.uid)">添加</button>
					<text class="alreadyIncrease" v-show="item.flag==1">已添加</text>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		get_friend_apply_list,
		add_friend_response
	} from "../api"
	export default {
		data() {
			return {
				requestList: []
			}
		},
		onShow: function() {
			this.getList()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			async getList() {
				let parameter = {}
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				get_friend_apply_list(parameter).then(res => {
					console.log(res.data, "好友请求列表")
					this.requestList = res.data.data
				})
			},
			async addConfirm(e) {
				let parameter = {}
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				parameter.uid = e
				parameter.flag = 1
				add_friend_response(parameter).then(res => {
					console.log(res)
					if (res.data.errCode == 0) {
						this.getList()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#newFriends {

		.requestList {
			height: 100%;
			background-color: #fff;

			.listItem {
				height: 146rpx;
				display: flex;
				align-items: center;


				.portrait {
					flex-shrink: 0;
					width: 90rpx;
					height: 90rpx;
					border-radius: 90rpx;
					margin-left: 44rpx;
				}


				.listItemMain {
					height: 144rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					margin-left: 28rpx;
					border-bottom: 1px solid #E5EBFF;

					.increase {
						padding: 0;
						margin: 0;
						width: 92rpx;
						height: 52rpx;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 52rpx;
						margin-right: 42rpx;
					}

					.alreadyIncrease {
						font-size: 28rpx;
						font-weight: 500;
						color: #666666;
						margin-right: 42rpx;
					}


				}




			}
		}
	}
</style>
