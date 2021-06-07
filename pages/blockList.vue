<template>
	<view id="blockList">
		<uni-nav-bar left-icon="back" title="Address book blacklist" @clickLeft="goBack"></uni-nav-bar>

		<view class="list">
			<view class="list-item" v-for="item in list">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					mode="" class="portrait"></image>
				<view class="listItemMain">
					<text class="name">{{item.uid.length>10?item.uid.slice(0,10):item.uid}}</text>
					<button type="primary" class="remove" @click="remove(item)">remove</button>
				</view>
			</view>
			
			<!-- <view class="list-item">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					mode="" class="portrait"></image>
				<view class="listItemMain">
					<text class="name">xxx</text>
					<button type="primary" class="remove">移除</button>

				</view>
			</view> -->

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
			async getList() {
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

		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 130rpx;

			.portrait {
				flex-shrink: 0;
				width: 90rpx;
				height: 90rpx;
				border-radius: 90rpx;
				margin-left: 44rpx;
			}

			.listItemMain {
				height: 130rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-left: 28rpx;
				border-bottom: 1px solid #E5EBFF;
				.name{
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
				.remove {
					padding: 0;
					margin: 0;
					width: 122rpx;
					height: 52rpx;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 52rpx;
					margin-right: 42rpx;
				}


			}

		}




	}
</style>
