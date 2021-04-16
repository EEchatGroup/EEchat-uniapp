<template>
	<view id="confirm">
		<view class="returnArea" @click="goRegiester">
			<image src="../static/return.png" mode="" class="returnIcon"></image><text
				class="returnText">请确认您的助记词</text>
		</view>
		<text class="tipsInfo">请选择相应助记词，确保顺序正确</text>
		<view class="writeArea">
			<view class="writeArea-item" v-for=" item in writeArr">
				<text>{{item.id}}.</text>
				<view :class="item.content.length==0? 'writeArea-item-main':'writeArea-item-main-writed' " @click="deleteWrited(item)">
					{{item.content}}
				</view>
			</view>
		</view>
		<view class="chooseArea">
			<view v-for="item in chooseArr" :key="item.id"
				:class="item.isSlected == true? 'chooseArea-item-selected':'chooseArea-item'" @click="choose(item)">
				{{item.content}}
			</view>
		</view>
		<view class="hh">
			<button type="primary" @click="login" class="login">登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				writeArr: [{
						id: 1,
						content: ""
					},
					{
						id: 2,
						content: ""
					},
					{
						id: 3,
						content: ""
					},
					{
						id: 4,
						content: ""
					},
					{
						id: 5,
						content: ""
					},
					{
						id: 6,
						content: ""
					},
					{
						id: 7,
						content: ""
					},
					{
						id: 8,
						content: ""
					},
					{
						id: 9,
						content: ""
					},
					{
						id: 10,
						content: ""
					},
					{
						id: 11,
						content: ""
					},
					{
						id: 12,
						content: ""
					}
				],
				chooseArr: [{
						id: 1,
						content: "a"
					},
					{
						id: 2,
						content: "b"
					},
					{
						id: 3,
						content: "c"
					},
					{
						id: 4,
						content: "d"
					},
					{
						id: 5,
						content: "e"
					},
					{
						id: 6,
						content: "f"
					},
					{
						id: 7,
						content: "g"
					},
					{
						id: 8,
						content: "h"
					},
					{
						id: 9,
						content: "i"
					},
					{
						id: 10,
						content: "j"
					},
					{
						id: 11,
						content: "k"
					},
					{
						id: 12,
						content: "l"
					}
				]
			}
		},
		methods: {
			goRegiester() {
				uni.navigateTo({
					url: './register'
				});
			},
			login() {
				uni.switchTab({
					url: './home'
				})
			},
			//清楚选项
			deleteWrited(e){
				let deleteElement = e
				for (let y = 0; y < this.chooseArr.length; y++){
					if (this.chooseArr[y].content ==deleteElement.content ){
						this.chooseArr[y].isSlected = false
						deleteElement.content = ""
						break
					}
				}
			},
			//点击下方选择块
			async choose(e) {

				await this.kk(e)
				//判断是否选择了以改变样式
				for (let x = 0; x < this.writeArr.length; x++) {
					for (let y = 0; y < this.chooseArr.length; y++) {
						if (this.writeArr[x].length != 0 && this.writeArr[x].content == this.chooseArr[y].content) {
							this.chooseArr[y].isSlected = true
						}
					}

				}

			},
			//把选择内容推入上面的内容区
			kk(e) {
				let chooseValue = e
				chooseValue.isSlected = true
				for (let i = 0; i < this.writeArr.length; i++) {
					if (this.writeArr[i].content.length == 0) {
						this.writeArr[i].content = chooseValue.content
						break
					}
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	#confirm {
		background-image: url(../static/confirmBackground.png);
		background-size: 100% 100%;
		padding: 0 48rpx;
		display: flex;
		flex-direction: column;

		.returnArea {
			display: flex;
			align-items: center;
			margin-top: 56rpx;

			.returnIcon {
				width: 36rpx;
				height: 66rpx;

			}

			.returnText {
				font-size: 56rpx;
				font-weight: 600;
				color: #1D6BED;
				margin-left: 20rpx;
			}
		}

		.tipsInfo {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-top: 24rpx;
		}

		.writeArea {
			width: 580rpx;
			height: 550rpx;
			background-color: #fff;
			box-shadow: 0 4rpx 26rpx 0 rgba(0, 84, 223, 0.3);
			margin-top: 44rpx;
			padding: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.writeArea-item {
				display: flex;
				align-items: center;

				.writeArea-item-main {
					width: 200rpx;
					height: 56rpx;
					border: 1px dashed #999999;
					border-radius: 8rpx;
					margin-left: 12rpx;
				}

				.writeArea-item-main-writed {
					width: 200rpx;
					height: 56rpx;
					border: 1px solid #1D6BED;
					border-radius: 8rpx;
					margin-left: 12rpx;
					text-align: center;
					line-height: 56rpx;
				}
			}
		}

		.chooseArea {
			width: 660rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 60rpx;

			.chooseArea-item {
				width: 180rpx;
				height: 80rpx;
				margin-top: 20rpx;
				box-shadow: 0 2rpx 14rpx 0 rgba($color: #004AC6, $alpha: 0.46);
				border-radius: 8rpx;
				line-height: 80rpx;
				text-align: center;
			}

			.chooseArea-item-selected {
				width: 180rpx;
				height: 80rpx;
				margin-top: 20rpx;
				box-shadow: 0 2rpx 14rpx 0 rgba($color: #004AC6, $alpha: 0.46);
				border-radius: 8rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: skyblue;
				pointer-events: none;
				background-color: rgba($color: #004AC6, $alpha: 0.46);
			}
		}

		.login {
			width: 320rpx;
			height: 80rpx;
			padding: 0;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 80rpx;
			margin-top: 90rpx;
			margin-bottom: 180rpx;
		}


	}
</style>
