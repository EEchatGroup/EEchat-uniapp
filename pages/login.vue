<template>
	<view id="login">
		<image src="../static/logo.png" mode="" class="logo"></image>
		<text class="title" @click="ddd">数字货币地址聊天 EEchat</text>
		<view class="tipsArea">
			<view class="blackDot"></view>
			<text>助记词登录，身份匿名</text>
		</view>
		<view class="tipsArea">
			<view class="blackDot"></view>
			<text>端到端加密，消息安全</text>
		</view>
		<input type="text" value="" class="inputArea" placeholder="输入您的助记词，并使用空格分隔" v-model="account" />
		<button type="primary" class="loginButton" @click="login">登录</button>
		<text class="register" @click="goRegiester">注册新账号</text>
	</view>

</template>

<script>
	const bip39 = require("bip39");
	const {
		hdkey
	} = require("ethereumjs-wallet");
	const util = require("ethereumjs-util");
	import qs from 'qs'
	import {
		loginApi,
		user_token
	} from "../api"
	export default {
		data() {
			return {
				account: "sunsetintactgluerampperfectscaremeshwaspolivethrivebossupgrade",
				loginInfo: {
					mnemonic: "",
					publicKey: "",
					address: "",
				},
			}
		},
		methods: {
			ddd(){
				uni.clearStorage();
			},
			async login() {
				this.loginInfo.mnemonic = this.account.replace(/\s*/g, "");
				//将助记词转成seed
				let seed = await bip39.mnemonicToSeed(this.account);
				//3.通过hdkey将seed生成HD Wallet
				let hdWallet = await hdkey.fromMasterSeed(seed);
				//4.生成钱包中在m/44'/60'/0'/0/0路径的keypair
				let key = await hdWallet.derivePath("m/44'/60'/0'/0/0");
				//6.从keypair中获取公钥
				this.loginInfo.publicKey = util.bufferToHex(key._hdkey._publicKey)
				let address = await util.pubToAddress(key._hdkey._publicKey, true);
				//编码地址
				this.loginInfo.address = address.toString("hex")
				console.log(this.loginInfo, "账户信息1")
				this.$store.commit("UserInfoValue", this.loginInfo)
				let accountInfo = {}
				accountInfo.secret = "tuoyun"
				accountInfo.uid = this.loginInfo.address
				accountInfo.platform = 5
				user_token(accountInfo).then(async res => {
					await sessionStorage.setItem('token', res.data.data.token)
					await this.$store.commit('getToken', res.data.data.token)
					await this.$store.commit('logOn', res.data.data.token)
					console.log(res.data.data.token)
					console.log(accountInfo.uid)
					await uni.setStorage({
						key: 'token',
						data: res.data.data.token,
						success: function() {
							console.log('setsuccess');
						},
						fail: function() {
							console.log('setfail');
						}
					});
					uni.switchTab({
						url: './home'
					})
				})

			},
			goRegiester() {
				uni.navigateTo({
					url: './register'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#login {
		background-image: url(../static/loginBackground.png);
		background-size: 100% 100%;
		height: 100% !important;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo {
			height: 220rpx;
			width: 220rpx;
			margin-top: 260rpx;
		}

		.title {
			font-size: 44rpx;
			font-weight: 600;
			color: #333333;
			margin-top: 30rpx;
			margin-bottom: 44rpx;
		}

		.tipsArea {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #333330;

			.blackDot {
				width: 16rpx;
				height: 16rpx;
				border-radius: 16rpx;
				background-color: #000;
				margin-right: 24rpx;
			}

		}

		.inputArea {
			width: 500rpx;
			font-weight: 500;
			color: #999999;
			padding: 0 50rpx 12rpx 50rpx;
			border-bottom: 1px solid #979797;
			margin-top: 120rpx;
		}

		.loginButton {
			width: 290rpx;
			height: 66rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 66rpx;
			box-shadow: 0 8rpx 26rpx rgba(0, 76, 203, 0.7);
			margin-top: 120rpx;
		}

		.register {
			font-size: 28rpx;
			font-weight: 600;
			color: #1D6BED;
			margin-top: 32rpx;
		}
	}
</style>
