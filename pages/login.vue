<template>
    <view id="login">
        <image src="../static/logo.png" mode="" class="logo"></image>
        <text class="title">数字货币地址聊天 EEchat</text>
        <view class="tipsArea">
            <view class="blackDot"></view>
            <text>助记词登录，身份匿名</text>
        </view>
        <view class="tipsArea">
            <view class="blackDot"></view>
            <text>端到端加密，消息安全</text>
        </view>
        <input type="text" value="" class="inputArea" placeholder="输入您的助记词，并使用空格分隔" />
        <button type="primary" class="loginButton">登录</button>
        <text class="register" @click="goRegiester">注册新账号</text>
    </view>

</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
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
