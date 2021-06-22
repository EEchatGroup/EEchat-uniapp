<template>
	<view id="register">
		<view class="returnArea" @click="goLogin">
			<image src="../static/return.png" mode="" class="returnIcon"></image><text class="returnText">Your mnemonics</text>
		</view>
		<view class="tipsCon">
			<view class="circle">
				
			</view>
			<text class="tipsInfo">It is the only voucher for your account</text>
		</view>
		<view class="tipsCon">
			<view class="circle">
				
			</view>
			<text class="tipsInfo">Eechat will not save your mnemonics. Once lost, it cannot be retrieved</text>
		</view>
		<view class="tipsCon">
			<view class="circle">
				
			</view>
			<text class="tipsInfo">Please record your mnemonics and keep them in a safe place</text>
		</view>
		
		
		
		<view class="mnemonic-words-area">
			<view class="mnemonic-words-item" v-for="item in mnemonicArr" :key="item">{{item}}</view>

		</view>
		<view class="copyArea">
			<text>Copy your mnemonics:</text><br />
			<text>{{registerInfo.mnemonic}}</text>
		</view>
		<button type="primary" class="nextStep" @click="goConfirm">next step</button>
	</view>
</template>

<script>
	const bip39 = require("bip39");
	const {
		hdkey
	} = require("ethereumjs-wallet");
	const util = require("ethereumjs-util");
	export default {
		data() {
			return {
				registerInfo: {
					mnemonic: "",
					publicKey: "",
					address: "",
				},
				mnemonicArr: []
			}
		},
		methods: {
			//生成私钥，公钥，账户
			async obtainAccount() {
				// 1.1 生成助记词 ;
				this.registerInfo.mnemonic = bip39.generateMnemonic();
				console.log(this.registerInfo.mnemonic)
				this.mnemonicArr = this.registerInfo.mnemonic.split(" ")
				//2.将助记词转成seed
				let seed = await bip39.mnemonicToSeed(this.registerInfo.mnemonic);
				//3.通过hdkey将seed生成HD Wallet
				let hdWallet = await hdkey.fromMasterSeed(seed);
				//4.生成钱包中在m/44'/60'/0'/0/0路径的keypair
				let key = await hdWallet.derivePath("m/44'/60'/0'/0/0");
				//5.从keypair中获取私钥
				console.log("私钥：" + util.bufferToHex(key._hdkey._privateKey));
				//6.从keypair中获取公钥
				this.registerInfo.publicKey = util.bufferToHex(key._hdkey._publicKey)
				console.log("公钥：" + util.bufferToHex(key._hdkey._publicKey));
				//7.使用keypair中的公钥生成地址
				let address = await util.pubToAddress(key._hdkey._publicKey, true);
				//编码地址
				this.registerInfo.address = address.toString("hex")
				console.log("账户地址",address.toString("hex"));
			},
			goLogin() {
				uni.navigateTo({
					url: './login'
				});
			},
			goConfirm() {
				this.$store.commit("getRegisterInfo", this.registerInfo)
				uni.navigateTo({
					url: './confirm'
				})
			}
		},
		created() {
			this.obtainAccount()
		},

	}
</script>

<style lang="scss" scoped>
	#register {
		background-image: url(../static/registerBackground.png);
		background-size: 100% 100%;
		padding: 0 48rpx;
		display: flex;
		flex-direction: column;

		.returnArea {
			display: flex;
			align-items: center;
			margin-top: 56rpx;
			margin-bottom: 40rpx;

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
		.tipsCon{
			display: flex;
			align-items: flex-start;
			margin-top: 12rpx;
			.circle{
				width: 10rpx;
				height: 10rpx;
				border-radius: 10rpx;
				background-color: #1D6BED;
				flex-shrink: 0;
				margin-top: 16rpx;
				margin-right: 14rpx;
			}
			.tipsInfo {
				font-size: 30rpx;
				font-weight: 400;
				color: #333333;
				
			}
		}
		

		.mnemonic-words-area {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 60rpx;

			.mnemonic-words-item {
				width: 260rpx;
				height: 60rpx;
				border-radius: 8rpx;
				box-shadow: 0 4rpx 10rpx 0 rgba(0, 69, 185, 0.46);
				text-align: center;
				line-height: 60rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				margin-bottom: 28rpx;
			}
		}

		.copyArea {
			margin-top: 66rpx;
			padding: 12rpx;
			border: 1px solid #ED1D1D;
			border-radius: 8rpx;
		}

		.nextStep {
			width: 294rpx;
			height: 68rpx;
			line-height: 68rpx;
			margin-top: 100rpx;
			margin-bottom: 180rpx;
		}




	}
</style>
