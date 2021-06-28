<template>
	<view v-show="showAcition" :class="{'top-action':isTop,'bottom-action':!isTop}" class="msg-actions">
		<view class="action-item">
			<image class="action-icon" src="../../static/msg_copy.png"/>
			<text>copy</text>
		</view>
		<view class="action-item">
			<image class="action-icon" src="../../static/msg_del.png"/>
			<text>delete</text>
		</view>
		<view class="action-item">
			<image class="action-icon" src="../../static/msg_share.png"/>
			<text>forward</text>
		</view>
		<view class="action-item">
			<image class="action-icon" src="../../static/msg_withdraw.png"/>
			<text>withdraw</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			showAcition:Boolean,
			isTop:Boolean
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.bottom-action{
		bottom: -45px;
		z-index: 9;
		position: absolute;
		display: flex;
		background-color: #666666;
		border-radius: 8rpx;
		.action-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;
			color: #FFFFFF;
			margin: 12rpx;
			.action-icon{
				margin-bottom: 4rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
		&::after{
			content: '';
			border: 7px solid;
			border-color: transparent transparent #666666 transparent ;
			position: absolute;
			top: -14px;
			left:7px
		}
	}
	// .top-action{
	// 	top: -67px;
	// 	&::after{
	// 		bottom: -14px;
	// 		border-color: #666666 transparent transparent transparent;
	// 	}
	// }
	.top-action{
		position: absolute;
		top: -67px;
		display: flex;
		background-color: #666666;
		border-radius: 8rpx;
		.action-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;
			// font-weight: 100;
			color: #FFFFFF;
			margin: 12rpx;
			.action-icon{
				margin-bottom: 4rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
		&::after{
			content: '';
			border: 7px solid;
			border-color: #666666 transparent transparent transparent;
			position: absolute;
			bottom: -14px;
			left:7px
		}
	}
</style>
