<template>
	<view id="blockList">
		<uni-nav-bar left-icon="back" title="屏蔽名单" @clickLeft="goBack"></uni-nav-bar>

		<view class="">
			<view class="list-item" v-for="item in list">
				<view class="headCircle">
					<text class="lastname">
						{{item.uid.slice(0,1)}}
					</text>
				</view>
				<view class="infoArea">
					<text class="name">{{item.uid.length>10?item.uid.slice(0,10):item.uid}}</text>
					<button type="primary" class="removeButton" @click="remove(item)">移除</button>
				</view>
			</view>


		</view>


	</view>
</template>

<script>
	import {
		get_blacklist,
		remove_blacklist
	} from '../api'
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			goBack() {
				uni.switchTab({
					url: './my'
				});
			},
			async getList(){
				let parameter = {}
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				get_blacklist(parameter).then(res => {
					console.log(res)
					this.list = res.data.data
				})
			},
			async remove(e) {
				let parameter = {}
				parameter.uid = e.uid
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				
				remove_blacklist(parameter).then(res => {
					console.log(res)
					this.getList()
				})
			}
		},
		onShow() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	#blockList {
		background-image: linear-gradient(#FFFFFF, #FFFFFF, #E4F3FF);
		height: 100% !important;

		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 130rpx;

			.headCircle {
				width: 80rpx;
				height: 80rpx;
				border-radius: 80rpx;
				background-image: linear-gradient(to right bottom, #A8C0FF, #3F2B96);
				margin-left: 44rpx;
				text-align: center;
				.lastname {
					font-size: 36rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 80rpx;
					
				}
			}

			.infoArea {
				width: 600rpx;
				height: 130rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #E5EBFF;
				margin-left: 28rpx;

				.name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
					border-bottom: none !important;
				}

				.removeButton {
					width: 84rpx;
					height: 46rpx;
					padding: 0;
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 46rpx;
					box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
					margin-right: 44rpx;
				}
			}
		}




	}
</style>
