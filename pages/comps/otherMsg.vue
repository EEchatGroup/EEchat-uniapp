<template>
	<view :id="id" class="other-msg-box">
		<u-avatar src="../../static/user.png" mode="circle"></u-avatar>
		<view @longpress.prevent="pressAtion" class="msg-box">
				<text class="msg-text">{{msg.content}}</text>
				<view v-if="msg.contentType==103" class="msg-text msg-voice">
					<image class="voice-icon" src="../../static/voice_other.png"/>
					<text>8''</text>
				</view>
				<view v-if="msg.contentType==102" @click="preViewImage(msg.pictureElem.sourcePicture.url)" class="msg-image">
					<image
					  class="img-item"
					  style="width: 200px;height: 200px;"
					  :src="msg.pictureElem.sourcePicture.url"
					  mode="aspectFill"
					/>
				</view>
				<view @click="showVideo(msg.videoElem.videoUrl)" v-if="msg.contentType==104" class="msg-image">
					<image class="img-item video-item" style="width:150px,height:150px" mode="aspectFill" :src="msg.videoElem.snapshotUrl"/>
					<!-- <image class="img-item video-item" :style="{width:msg.videoElem.snapshotWidth+'px',height:msg.videoElem.snapshotHeight+'px'}" :src="msg.videoElem.snapshotUrl"/> -->
				</view>
				<!-- <view class="msg-status"> -->
					<!-- <text class="readed">Readed</text> -->
					<!-- <text class="unread">UnRead</text> -->
					<!-- <u-icon size="32" name="error-circle" color="#f44038"/> -->
				<!-- </view> -->
				<MsgAction :isTop="isTop" :showAcition="showAcition"/>
		</view>
	</view>
</template>

<script>
	import MsgAction from './msgAction.vue'
	export default{
		data(){
			return{
				isTop:true,
				showAcition:false,
				imgSrc:"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg?imageView2/2/w/200/h/200"
			}
		},
		components:{
			MsgAction
		},
		props:{
			id:String,
			msg:Object
		},
		methods:{
			showVideo(url){
				uni.navigateTo({
					url:'../playVideo?url='+url
				})
			},
			pressAtion(){
				uni.$emit("clickPage")
				this.setPosition()
				this.showAcition=true
			},
			preViewImage(url){
				uni.previewImage({
					urls:[url]
				})
			},
			setPosition(){
				const ids = '#'+this.id
				const query = uni.createSelectorQuery().select(ids);
				query.boundingClientRect((val)=>{
					if(val.top<120){
						console.log(val.top);
						this.isTop=false
					}
				}).exec()
			},
			setListener(){
				uni.$on("clickPage",()=>{
					if(this.showAcition){
						this.showAcition=false
					}
				})
			}
		},
		mounted() {
			this.setListener()
		}
	}
</script>

<style lang="scss">
	.other-msg-box{
		display: flex;
		padding: 22px;
		padding-bottom: 0;
		.msg-box{
			position: relative;
			    margin-top: 11px;
			    margin-left: 12px;
				.msg-image{
					display: inline-block;
					.img-item{
					border-radius: 8px;
					}
					.video-item{
						position: relative;
						&::after{
							content: '';
							position: absolute;
							top: 50%;
							left: 50%;
							width: 52rpx;
							height: 52rpx;
							transform:translateX(-50%) translateY(-50%);
							background-image: url(../../static/video.png);
							background-repeat: no-repeat;
						}
					}
				}
				.msg-voice{
					display: flex;
					justify-content: center;
					.voice-icon{
						width: 13px;
						height: 19px;
						margin-right: 8rpx;
					}
				}
				.msg-text{
					position: relative;
					background-color: #f0f0f0;
					padding: 7px;
					border-radius: 4px;
					&::before{
						content: '';
						position: absolute;
						border: 7px solid;
						border-color: transparent #f0f0f0 transparent transparent ;
						left: -14px;
						top: 50%;
						transform: translateY(-50%);
					}
				}
				.msg-status{
					display: inline-block;
					margin-left: 12rpx;
					.readed{
						font-size: 24rpx;
						color: #999999;
					}
					.unread{
						font-size: 24rpx;
						color: #1B72EC;
					}
				}
				
		}
	}
</style>
