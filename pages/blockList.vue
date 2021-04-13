<template>
    <view id="blockList">
        <uni-nav-bar left-icon="back" title="屏蔽名单" @clickLeft="goBack"></uni-nav-bar>

        <view class="">
            <view class="list-item">
                <view class="headCircle">
                    <text class="lastname">
                        奥
                    </text>
                </view>
                <view class="infoArea">
                    <text class="name">奥尼克李姐</text>
                    <button type="primary" class="removeButton">移除</button>
                </view>
            </view>
            <view class="list-item">
                <view class="headCircle">
                    <text class="lastname">
                        奥
                    </text>
                </view>
                <view class="infoArea">
                    <text class="name">奥尼克李姐</text>
                    <button type="primary" class="removeButton">移除</button>
                </view>
            </view>
            <view class="list-item">
                <view class="headCircle">
                    <text class="lastname">
                        奥
                    </text>
                </view>
                <view class="infoArea">
                    <text class="name">奥尼克李姐</text>
                    <button type="primary" class="removeButton">移除</button>
                </view>
            </view>
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
            goBack() {
                uni.switchTab({
                    url: './my'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #blockList {
        background-image: linear-gradient(#FFFFFF, #FFFFFF, #E4F3FF);
        height: 100% !important;
        .list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 130rpx;

            .headCircle {
                width: 80rpx;
                height: 80rpx;
                border-radius: 80rpx;
                background-image: linear-gradient(to right bottom, #A8C0FF, #3F2B96);
                margin-left: 44rpx;
                .lastname {
                    font-size: 36rpx;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 80rpx;
                    margin-left: 22rpx;
                }
            }

            .infoArea {
                width: 600rpx;
                height: 130rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #E5EBFF;
                margin-left: 28rpx;
                .name {
                    font-size: 32rpx;
                    font-weight: 600;
                    color: #333333;
                    border-bottom: none !important;
                }

                .removeButton {
                    width: 84rpx;
                    height: 46rpx;
                    padding: 0;
                    font-size: 24rpx;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 46rpx;
                    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
                    margin-right: 44rpx;
                }
            }
        }




    }
</style>
