<template>
    <view id="my">
        <view class="head">
            <view class="headCircle">
                <view class="lastname">陈</view>
            </view>
            <view class="headInfo">
                <text>陈华山</text>
                <text>公钥地址:</text>
                <text>0111111111111111155555551dsadsadadasdsa10555adasd 555555</text>
            </view>
        </view>
        <view class="funtionArea">
            <uni-list>
                <uni-list-item thumb="/static/edit.png" title="修改昵称" clickable @click="goEditNickname"></uni-list-item>
                <uni-list-item thumb="/static/nameList.png" title="屏蔽名单" clickable @click="goBlockList"></uni-list-item>
                <uni-list-item thumb="/static/link.png" title="生成会话链接" clickable @click="showLinkPopup"></uni-list-item>
                <uni-list-item thumb="/static/exit.png" title="退出登录" clickable @click="logoutConfirm"></uni-list-item>
            </uni-list>
        </view>
        <uni-popup ref="popup">
            <view class="linkPopup">
                <text>生成链接</text>
                <text>下一步将链接发送给小伙伴</text>
                <input type="text" value="" v-model="linkValue" />
                <view class="buttonArea">
                    <button type="primary" @click="cancel">取消</button>
                    <button type="primary" @click="copyLink">复制链接</button>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="logoutPopup">
            <view class="logout">
                <text>确定退出登录吗</text>
                <view class="buttonArea">
                    <button type="primary" @click="logoutCancel">取消</button>
                    <button type="primary" @click="logout">确定</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                linkValue: "1111122222222211111"
            }
        },
        methods: {
            goEditNickname() {
                uni.navigateTo({
                    url: './edit-nickname'
                })
            },
            goBlockList() {
                uni.navigateTo({
                    url: './blockList'
                })
            },
            logoutConfirm() {
                this.$refs.logoutPopup.open()
            },
            showLinkPopup() {
                this.$refs.popup.open()
            },

            cancel() {
                this.$refs.popup.close()
            },
            copyLink() {
                //创建一个input框
                const input = document.createElement("input");
                //将指定的DOM节点添加到body的末尾
                document.body.appendChild(input);
                //设置input框的value值为直播地址
                input.setAttribute("value", this.linkValue);
                //选取文本域中的内容
                input.select();
                //copy的意思是拷贝当前选中内容到剪贴板
                //document.execCommand（）方法操纵可编辑内容区域的元素
                //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
                if (document.execCommand("copy")) {
                    document.execCommand("copy");
                }
                //删除这个节点
                document.body.removeChild(input);
                this.$refs.popup.close()
            },
            logoutCancel() {
                this.$refs.logoutPopup.close()
            },
            logout() {
				this.$refs.logoutPopup.close()
                uni.navigateTo({
                    url: './login'
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    #my {
        height: 100% !important;
        background-color: #F0F6FF;

        .head {
            height: 268rpx;
            background-color: #fff;
            display: flex;
            align-items: center;

            .headCircle {
                width: 120rpx;
                height: 120rpx;
                border-radius: 120rpx;
                background-image: linear-gradient(to right bottom, #74FAD4, #0B8597);
                margin-left: 44rpx;
                margin-right: 40rpx;

                .lastname {
                    font-size: 48rpx;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 120rpx;
                    text-align: center;
                }
            }

            .headInfo {
                display: flex;
                flex-direction: column;
                width: 480rpx;
                white-space: normal;
                word-break: break-all;
                overflow: hidden;

                text:nth-of-type(1) {
                    font-size: 40rpx;
                    font-weight: 500;
                    color: #333333;
                }

                text:nth-of-type(2) {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #666666;
                    margin-top: 18rpx;
                }

                text:nth-of-type(3) {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #666666;
                }

            }

        }

        .funtionArea {
            margin-top: 28rpx;
        }

        .linkPopup {
            width: 448rpx;
            height: 250rpx;
            border-radius: 20rpx;
            background-color: #fff;
            padding: 26rpx 40rpx;
            display: flex;
            flex-direction: column;

            text:nth-of-type(1) {
                font-size: 32rpx;
                font-weight: 500;
                color: #1B72EC;
                margin: 0 auto;
            }

            text:nth-of-type(2) {
                font-size: 24rpx;
                font-weight: 500;
                color: #999999;
                margin-top: 30rpx;
            }

            input {
                width: 438rpx;
                height: 56rpx;
                background-color: #F0F6FF;
                margin-top: 8rpx;
                font-size: 20rpx;
                font-weight: 500;
                color: #333333;
                padding-left: 10rpx;
            }

            .buttonArea {
                display: flex;
                margin-top: 30rpx;

                button:nth-of-type(1) {
                    width: 104rpx;
                    height: 42rpx;
                    font-size: 24rpx;
                    padding: 0;
                    line-height: 42rpx;
                    margin-left: 0rpx;
                    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
                }

                button:nth-of-type(2) {
                    width: 134rpx;
                    height: 42rpx;
                    font-size: 24rpx;
                    padding: 0;
                    line-height: 42rpx;
                    margin-right: 0rpx;
                    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
                }
            }
        }

        .logout {
            width: 528rpx;
            height: 300rpx;
            background-color: #fff;
            border-radius: 20rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

            text {
                font-size: 34rpx;
                font-weight: 500;
                color: #333333;
                margin-top: 90rpx;
            }

            .buttonArea {
                width: 100%;
                display: flex;
                margin-top: 70rpx;

                button:nth-of-type(1) {
                    width: 104rpx;
                    height: 42rpx;
                    font-size: 24rpx;
                    padding: 0;
                    line-height: 42rpx;
                    margin-left: 70rpx;
                    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
                }

                button:nth-of-type(2) {
                    width: 104rpx;
                    height: 42rpx;
                    font-size: 24rpx;
                    padding: 0;
                    line-height: 42rpx;
                    margin-right: 70rpx;
                    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
</style>
