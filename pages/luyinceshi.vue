<template>
	<view id="luyinceshi">

		<view class="audioPlay">
			<button @click="startRecord">开始录音</button>
			<button @tap="endRecord">停止录音</button>
			<button @tap="playVoice">播放录音</button>
		</view>

		<view class="" style="width: 100px;height: 100px;background-color: #3F536E;" @mouseenter="cc">

		</view>
		<button @tap="test">click me</button>
		<video :src="src"></video>

		<button type="default" @click="kk"> kk</button>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;

	export default {

		data() {
			return {
				recorderManager: {},
				innerAudioContext: {},
				text: 'uni-app',
				voicePath: '',
				src: ''
			}
		},
		/* onLoad() {
			innerAudioContext.autoplay = true;
						console.log("uni.getRecorderManager()",uni.getRecorderManager())
						console.log("uni.createInnerAudioContext()",uni.createInnerAudioContext())
						let self = this;
						recorderManager.onStop(function (res) {
							console.log('recorder stop' + JSON.stringify(res));
							self.voicePath = res.tempFilePath;
						});
			
			
		}, */
		methods: {
			kk() {
				let jj = function(e) {
					console.log(e, "4444444")
				}
				jj(2)



			},
			cc() {
				console.log("dddddd");
			},
			test: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						self.src = res.tempFilePath;
						alert(res.tempFilePath)
					}
				});
			},
			startRecord() {
				console.log('开始录音');
				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	#luyinceshi {}
</style>
