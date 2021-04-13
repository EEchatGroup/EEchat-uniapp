<template>
    <view id="confirm">
        <view class="returnArea" @click="goRegiester">
            <image src="../static/return.png" mode="" class="returnIcon"></image><text
                class="returnText">请确认您的助记词</text>
        </view>
        <text class="tipsInfo">请选择相应助记词，确保顺序正确</text>
        <button type="default" @click="goHome">登录</button>
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
            },
            goHome() {
                console.log("44444444")
                uni.switchTab({
                    url:'./home'
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    #confirm {
        background-image: url(../static/confirmBackground.png);
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
    }
</style>
