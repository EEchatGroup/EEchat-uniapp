<template>
	<view :id="id" class="other-msg-box">
		<u-avatar src="static/user.png" mode="circle"></u-avatar>
		<view @longpress.prevent="pressAtion" class="msg-box">
			<view class="msg-status">
				<text v-if="msg.isRead&&msg.status!==3&&msg.contentType==101" class="readed">Readed</text>
				<text v-if="!msg.isRead&&msg.status!==3&&msg.contentType==101" class="unread">UnRead</text>
				<u-icon v-if="msg.status==3" size="32" name="error-circle" color="#f44038" />
			</view>
			<text v-if="msg.contentType==101" class="msg-text">{{msg.content}}</text>
			<view @click="playVoice(msg.soundElem)" v-if="msg.contentType==103" class="msg-text msg-voice">
				<text>{{msg.soundElem.duration}}''</text>
				<image class="voice-icon" src="../../static/voice_me.png" mode=""></image>
			</view>
			<view v-if="msg.contentType==102" @click="preViewImage(msg.pictureElem.sourcePicture.url)"
				class="msg-image">
				<u-image border-radius="16" width="400" height="400"
					:src="msg.status==1?msg.pictureElem.sourcePath:msg.pictureElem.sourcePicture.url" @error="error" mode="aspectFill"/>
				<!-- <image v-else src="../../static/img_error.png" style="width: 48px;height: 48px;"/> -->
				<u-circle-progress v-if="msg.status===1" class="loading-cover" width="80" type="info" border-width="8" :percent="msg.percent">
					<text style="color: #FFFFFF;">{{msg.percent}}%</text>
				</u-circle-progress>
			</view>
			<view @click="showVideo(msg.videoElem.videoUrl)" v-if="msg.contentType==104" class="msg-image">
				<u-image :class="{'video-item':msg.status==2}" border-radius="16" width="300" height="300" mode="aspectFill"
					:src="msg.status==1?msg.videoElem.snapshotPath:msg.videoElem.snapshotUrl" @error="videoError" error-icon="../static/video_error.png" />
				<!-- <image v-else src="../../static/video_error.png" style="width: 48px;height: 48px;"/> -->
					<u-circle-progress v-if="msg.status===1" class="loading-cover" width="80" type="info" border-width="8" :percent="msg.percent">
						<text style="color: #FFFFFF;">{{msg.percent}}%</text>
					</u-circle-progress>
			</view>
			<MsgAction :isTop="isTop" :msgItem="msg" :showAcition="showAcition" />
		</view>
	</view>
</template>

<script>
	import MsgAction from './msgAction.vue'
	let _this = null
	export default {
		data() {
			return {
				isTop: true,
				endStatus:true,
				errorImage:false,
				errorVideo:false,
				showAcition: false,
				innerAudioContext: null,
				uuid: "",
				imgSrc: "https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg?imageView2/2/w/200/h/200"
			}
		},
		components: {
			MsgAction
		},
		props: {
			id: String,
			msg: Object
		},
		filters: {
			// imgHeight(h){
			// 	h 
			// }
		},
		methods: {
			error(){
				this.errorImage = true
			},
			videoError(){
				this.errorVideo = true
			},
			playVoice(item) {
				console.log(item);
				console.log(this.innerAudioContext.paused);
				if (!this.innerAudioContext.paused && this.uuid == item.uuid) {
					console.log(111);
					this.innerAudioContext.pause()
				} else if (this.innerAudioContext.paused && this.uuid == item.uuid && !this.endStatus) {
					console.log(222);
					this.innerAudioContext.play()
				} else {
					const localUrl = item.soundPath
					const netUrl = item.sourceUrl
					this.uuid = item.uuid
					console.log(this.uuid);
					plus.io.resolveLocalFileSystemURL(localUrl,
						(file) => {
							console.log(file);
							_this.innerAudioContext.src = localUrl
							_this.innerAudioContext.play()
						},
						(err) => {
							console.log(err);
							_this.innerAudioContext.src = netUrl
							_this.innerAudioContext.play()
						})
				}
				// if(JSON.stringify(this.innerAudioContext)!==="{}"){
				// 	this.innerAudioContext.destroy()
				// }
			},
			showVideo(url) {
				console.log(url);
				uni.navigateTo({
					url: '/pages/playVideo?url=' + url
				})
			},
			pressAtion() {
				uni.$emit("clickPage")
				this.setPosition()
				this.showAcition = true
			},
			preViewImage(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			setPosition() {
				const ids = '#' + this.id
				const query = uni.createSelectorQuery().select(ids);
				query.boundingClientRect((val) => {
					console.log('my-' + val.top);
					if (val.top < 120) {
						console.log(val.top);
						this.isTop = false
					}
				}).exec()
			},
			setListener() {
				uni.$on("clickPage", () => {
					if (this.showAcition) {
						this.showAcition = false
					}
				})
			},
		},
		mounted() {
			_this = this
			this.setListener()
			this.innerAudioContext = uni.createInnerAudioContext()
			this.innerAudioContext.onError(err=>{
				console.log(err);
			})
			this.innerAudioContext.onPlay(res=>{
				console.log(res);
			})
			this.innerAudioContext.onEnded(function(res){
				_this.endStatus = true
				console.log('end');
			})
			this.innerAudioContext.onPause(function(res){
				console.log('pause');
			})
		}
	}
</script>

<style lang="scss">
	.other-msg-box {
		display: flex;
		flex-direction: row-reverse;
		padding: 22px;
		padding-bottom: 0;

		.msg-box {
			position: relative;
			margin-top: 11px;
			margin-right: 12px;
			display: flex;

			.msg-image {
				display: inline-block;
				position: relative;

				.img-item {
					border-radius: 8px;
				}
				.loading-cover {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateX(-50%) translateY(-50%);
					background-color: transparent !important;
				}

				

				.video-item {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						top: 50%;
						left: 50%;
						width: 52rpx;
						height: 52rpx;
						transform: translateX(-50%) translateY(-50%);
						background-image: url(../../static/video.png);
						background-repeat: no-repeat;
					}
				}
			}

			.msg-video {
				display: inline-block;

				.video-item {
					border-radius: 8px;
				}
			}

			.msg-voice {
				display: flex;
				justify-content: center;
				align-items: center;

				.voice-icon {
					width: 13px;
					height: 19px;
					margin-right: 8rpx;
				}
			}

			.msg-text {
				position: relative;
				background-color: #dfebff;
				padding: 7px;
				border-radius: 4px;
				word-break: break-all;

				&::before {
					content: '';
					position: absolute;
					border: 7px solid;
					border-color: transparent transparent transparent #dfebff;
					right: -14px;
					top: 12px;
					// transform: translateY(-50%);
				}
			}

			.msg-status {
				// display: inline-block;
				margin-right: 12rpx;
				margin-top: 12rpx;

				.readed {
					font-size: 24rpx;
					color: #999999;
				}

				.unread {
					font-size: 24rpx;
					color: #1B72EC;
				}
			}

		}
	}

	.msg-actions {
		right: 0;

		&::after {
			left: auto;
			right: 7px
		}
	}
</style>
