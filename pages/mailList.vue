<template>
	<view id="mailList">
		<view class="head">
			<text class="title">通讯录</text>
		</view>
		<view class="">
			<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					"letter": "A",
					"data": [{
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}]
				}, {
					"letter": "B",
					"data": [{
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}, {
						img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						name: "111"
					}]
				}]
			}
		},
		methods: {
			bindClick(e) {
				console.log(e, "7777777777")
			}
		}
	}
</script>

<style lang="scss" scoped>
	#mailList{
		background-color: #E8E8E8;
		height: 100% !important;
		.head {
			height: 90rpx;
			background-color: #fff;
			.title {
				font-size: 44rpx;
				font-weight: 500;
				color: #1B72EC;
				line-height: 90rpx;
				margin-left: 44rpx;
			}
		}
	}

</style>
