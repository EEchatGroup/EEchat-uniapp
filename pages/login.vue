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

    <input
      type="text"
      value=""
      class="inputArea"
      placeholder="Enter your mnemonics, separated by spaces"
      v-model="account"
    />
    <button type="primary" class="loginButton" @click="login">Sign in</button>
    <text class="register" @click="goRegiester">Sign up for a new account</text>
  </view>
</template>

<script>
const openSdk = uni.requireNativePlugin("OpenSDK");
const globalEvent = uni.requireNativePlugin("globalEvent");
const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const util = require("ethereumjs-util");
import qs from "qs";
import { loginApi, user_token } from "../api";
export default {
  data() {
    return {
      account: "sunsetintactgluerampperfectscaremeshwaspolivethrivebossupgrade",
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
    login() {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiJhYzZiMDg3OGNiYTQwMDBhNzk4Zjk5ZWI3ZjVjMTJmMCIsIlBsYXRmb3JtIjoiSU9TIiwiZXhwIjoxNjI0MDA1NzU1LCJpYXQiOjE2MjM0MDA5NTUsIm5iZiI6MTYyMzQwMDk1NX0.kFt7GqKtHhndrt-TkTbemol6sIeAulmn9e4_9JqS4_0";
      const uid = "ac6b0878cba4000a798f99eb7f5c12f0";
      openSdk.login(token, uid);

    },
    // async login() {
    // 	this.loginInfo.mnemonic = this.account.replace(/\s*/g, "");
    // 	//将助记词转成seed
    // 	let seed = await bip39.mnemonicToSeed(this.account);
    // 	//3.通过hdkey将seed生成HD Wallet
    // 	let hdWallet = await hdkey.fromMasterSeed(seed);
    // 	//4.生成钱包中在m/44'/60'/0'/0/0路径的keypair
    // 	let key = await hdWallet.derivePath("m/44'/60'/0'/0/0");
    // 	//6.从keypair中获取公钥
    // 	this.loginInfo.publicKey = util.bufferToHex(key._hdkey._publicKey)
    // 	let address = await util.pubToAddress(key._hdkey._publicKey, true);
    // 	//编码地址
    // 	this.loginInfo.address = address.toString("hex")
    // 	console.log(this.loginInfo, "账户信息1")
    // 	this.$store.commit("UserInfoValue", this.loginInfo)
    // 	let accountInfo = {}
    // 	accountInfo.secret = "tuoyun"
    // 	accountInfo.uid = this.loginInfo.address
    // 	accountInfo.platform = 5
    // 	user_token(accountInfo).then(async res => {

    // 		await sessionStorage.setItem('token', res.data.data.token)
    // 		await this.$store.commit('getToken', res.data.data.token)
    // 		await this.$store.commit('logOn')
    // 		await uni.setStorage({
    // 			key: 'token',
    // 			data: res.data.data.token,
    // 			success: function() {
    // 				console.log('setsuccess');

    // 			},
    // 			fail: function() {
    // 				console.log('setfail');

    // 			}
    // 		});
    // 		uni.switchTab({
    // 			url: './home'
    // 		})
    // 	})

    // },
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
