<template>
    <view id="home">
        <view class="head">
            <text class="title">EEchat</text>
        </view>
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
    #home{
        background-color: #E8E8E8;
        height: 100% !important;
        .head{
            height: 90rpx;
            background-color: #fff;
            .title{
                font-size: 44rpx;
                font-weight: 500;
                color: #1B72EC;
                line-height: 90rpx;
                margin-left: 44rpx;
            }
        }
    }
</style>
