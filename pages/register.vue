<template>
    <view id="register">
        <view class="returnArea" @click="goLogin">
            <image src="../static/return.png" mode="" class="returnIcon"></image><text class="returnText">您的助记词</text>
        </view>
        <text class="tipsInfo">它是您账户的唯一凭证</text>
        <text class="tipsInfo">EEchat不会保存您的助记词，一旦丢失无法找回</text>
        <text class="tipsInfo">请记录您的助记词，并保存在安全的地方</text>
        <view class="mnemonic-words-area">
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
            <view class="mnemonic-words-item">fwef</view>
        </view>
        <view class="copyArea">
            <text>复制您的助记词：</text><br />
            <text>noise noise noise noise noise noise noise noise noise noise noise noise </text>
        </view>
        <button type="primary" class="nextStep" @click="goConfirm">下一步</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            goLogin() {
                uni.navigateTo({
                    url: './login'
                });
            },
            goConfirm(){
                uni.navigateTo({
                    url:'./confirm'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        background-image: url(../static/registerBackground.png);
        background-size: 100% 100%;
        height: 100% !important;
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

        .tipsInfo {
            font-size: 30rpx;
            font-weight: 400;
            color: #333333;
            margin-top: 12rpx;
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
        }




    }
</style>
