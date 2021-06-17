<template>
	<view id="login">
		<image src="../static/logo.png" mode="" class="logo"></image>
		<text class="title" @click="ddd">EEchat</text>
		<text class="childTitle">Digital currency address chat</text>
		<view class="tipsArea">
			<view class="tipsAreaItem">
				<view class="blackDot"></view>
				<text>Mnemonic login, anonymous identity</text>
			</view>
			<view class="tipsAreaItem">
				<view class="blackDot"></view>
				<text>End to end encryption, message security</text>
			</view>
		</view>

		<input type="text" value="" class="inputArea" placeholder="Enter your mnemonics, separated by spaces"
			v-model="account" />
		<button type="primary" class="loginButton" @click="login">Sign in</button>
		<text class="register" @click="goRegiester">Sign up for a new account</text>
	</view>
</template>

<script>
	const openSdk = uni.requireNativePlugin("OpenSDK");
	const globalEvent = uni.requireNativePlugin("globalEvent");
	const bip39 = require("bip39");
	const {
		hdkey
	} = require("ethereumjs-wallet");
	const util = require("ethereumjs-util");


	export default {
		data() {
			return {
				account: "seminar fetch expand melody fog exist pill devote change swift idle eye",
				loginInfo: {
					mnemonic: "",
					publicKey: "",
					address: "",
				},
			};
		},
		methods: {
			ddd() {
				uni.clearStorage();
				console.log("清除存储");
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


				uni.request({
					url: "http://47.112.160.66:10000/auth/user_token",
					method: 'POST',
					data: accountInfo,
					success(res) {
						console.log(res, "465456")
						uni.setStorage({
							key: 'token',
							data: res.data.data.token,
							success: function() {
								console.log('setsuccess');

							},
							fail: function() {
								console.log('setfail');

							}
						});
						// openSdk.login(res.data.data.token, res.data.data.uid);
						const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiJjOTNiYzhiMTcxY2NlN2I5ZDFiZWZiMzg5YWJmZTUyZiIsIlBsYXRmb3JtIjoiSU9TIiwiZXhwIjoxNjI0NDIwMTAxLCJpYXQiOjE2MjM4MTUzMDEsIm5iZiI6MTYyMzgxNTMwMX0.sk1U5kCITPkFR-EAlRL38yY1nz653ZIvwycG2A3XU_s"
						const uid = "c93bc8b171cce7b9d1befb389abfe52f"
						openSdk.login(uid, token)
					},
					fail() {

					}
				})



				// user_token(accountInfo).then(async res => {
				// 	console.log(res,"454564");
				// 	const token = res.data.data.token;
				// 	openSdk.login(token, res.data.data.uid);

				// 	await sessionStorage.setItem('token', res.data.data.token)
				// 	await this.$store.commit('getToken', res.data.data.token)
				// 	await this.$store.commit('logOn')
				// 	await uni.setStorage({
				// 		key: 'token',
				// 		data: res.data.data.token,
				// 		success: function() {
				// 			console.log('setsuccess');

				// 		},
				// 		fail: function() {
				// 			console.log('setfail');

				// 		}
				// 	});

				// })

			},
			goRegiester() {
				uni.navigateTo({
					url: "./register",
				});
			},
		},
	};
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
			font-size: 52rpx;
			font-weight: 600;
			color: #333333;
			margin-top: 10rpx;
		}

		.childTitle {
			font-size: 38rpx;
			font-weight: 500;
			color: #333333;
			margin-top: 18rpx;
		}

		.tipsArea {
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			margin-left: 30rpx;

			.tipsAreaItem {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333330;

				.blackDot {
					width: 10rpx;
					height: 10rpx;
					border-radius: 10rpx;
					background-color: #666;
					margin-right: 24rpx;
				}
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
			color: #ffffff;
			line-height: 66rpx;
			box-shadow: 0 8rpx 26rpx rgba(0, 76, 203, 0.7);
			margin-top: 120rpx;
		}

		.register {
			font-size: 28rpx;
			font-weight: 600;
			color: #1d6bed;
			margin-top: 32rpx;
		}
	}
</style>
