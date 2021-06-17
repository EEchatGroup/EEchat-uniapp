<template>
	<view id="setFriend">
		<uni-nav-bar left-icon="back" title="Friends settings" @clickLeft="goBack"></uni-nav-bar>
		<view class="main">
			<view class="mainHead">
				<view class="imageCon">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						mode="" class="headIcon"></image>
				</view>
				<text>{{friendData.uid}}</text>

			</view>
			<view class="operationSet">
				<view class="operationSetItem">
					<text>Friends settings</text>
					<image src="../static/arrow.png" mode="" class="arrow"></image>
				</view>
				<view class="operationSetItem">
					<text>Top contact</text>
					<switch @change="topContact" />
				</view>
				<view class="operationSetItem">
					<text>Join the blacklist</text>
					<u-switch @change="changeBlockStatus" v-model="friendData.blackStatus" :active-value="1" :inactive-value="0"></u-switch>
					<!-- <switch :checked="friendData.isInBlackList===1" @change="changeBlockStatus" /> -->
				</view>
				<view class="operationSetItem" @click="deleteRecord">
					<text>Empty chat record</text>
					<image src="../static/arrow.png" mode="" class="arrow"></image>
				</view>

			</view>

		</view>






		<view class="deleteBtn" @click="deleteFriend">
			Delete friend
		</view>

		<uni-popup ref="deleteConfirm">
			<view class="confirm">
				<view class="titleArea">
					<text class="titleInfo">Are you sure to delete"{{friendData.name}}"?</text>
				</view>
				<view class="footerArea">
					<view type="primary" @click="confirmCancel" class="confirmCancel">cancel</view>
					<view type="primary" @click="deleteConfirm" class="deleteConfirm">delete</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="blockConfirm">
			<view class="confirm">
				<view class="titleArea">
					<text class="titleInfo">Are you sure to blacklist"{{friendData.name}}"?</text>
				</view>
				<view class="footerArea">
					<view type="primary" @click="blockCancel" class="confirmCancel">cancel</view>
					<view type="primary" @click="addBlockConfirm" class="deleteConfirm">determine</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="deleteRecordConfirm">
			<view class="confirm">
				<view class="titleArea">
					<text class="titleInfo">Are you sure you want to delete the chat
						with"{{friendData.name}}"?</text>
				</view>

				<view class="footerArea">
					<view type="primary" @click="confirmCancel3" class="confirmCancel">cancel</view>
					<view type="primary" @click="deleteConfirm" class="deleteConfirm">empty</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		delete_friend
	} from "../api"
	export default {
		data() {
			return {
				friendData:this.$store.state.setFriendData,
				listers:{}
			}
		},
		// computed:{
		// 	blackStatus(){
		// 		return this.$store.state.setFriendData.isInBlackList===0?false:true
		// 	}
		// },
		// onShow: function() {
		// 	this.friendData = this.$store.state.setFriendData
		// 	console.log(this.friendData)
		// },
		methods: {
			topContact(e) {
				console.log(e);
				if (e.target.value) {
					console.log("qqq")
				}
			},
			changeBlockStatus(val) {
				// console.log(e.target.value);
				console.log(val);
				if(val===1){
					this.$refs.blockConfirm.open()
				}else{
					const reqData = {
						uid:this.friendData.uid
					}
					this.$openSdk.deleteFromBlackList(JSON.stringify(reqData))
				}
				// console.log(this.friendData.isInBlackList);
				// if (e.target.value) {
					
				// }
			},
			deleteFriend() {
				this.$refs.deleteConfirm.open()

			},
			addBlockConfirm(){
				const reqData = {
					uid:this.friendData.uid
				}
				this.$openSdk.addToBlackList(JSON.stringify(reqData))
			},
			addBlockListener(){
				const _this = this
				this.$globalEvent.addEventListener('addToBlackListSuccess',params=>{
					console.log(params);
					_this.$u.toast("拉入黑名单成功！")
					_this.$refs.blockConfirm.close()
				})
				this.$globalEvent.addEventListener('addToBlackListFailed',params=>{
					console.log(params);
				})
			},
			removeBlackListener(){
				this.$globalEvent.addEventListener('deleteFromBlackListSuccess',params=>{
					console.log(params);
				})
				this.$globalEvent.addEventListener('deleteFromBlackListFailed',params=>{
					console.log(params);
				})
			},
			deleteListener(){
				this.$globalEvent.addEventListener('deleteFromFriendListSuccess',params=>{
					console.log(params);
					const _this = this
					_this.$u.toast("删除成功！")
					_this.$refs.deleteConfirm.close()
					
				})
				this.$globalEvent.addEventListener('deleteFromFriendListFailed',params=>{
					console.log(params);
				})
			},
			deleteRecord() {
				this.$refs.deleteRecordConfirm.open()
			},
			confirmCancel() {
				this.$refs.deleteConfirm.close()
			},
			blockCancel() {
				this.friendData.blackStatus=false
				this.$refs.blockConfirm.close()
			},
			confirmCancel3() {
				this.$refs.deleteRecordConfirm.close()
			},

			deleteConfirm() {
				const reqData = {
					uid:this.friendData.uid
				}
				this.$openSdk.deleteFromFriendList(JSON.stringify(reqData))
				// let parameter = {}
				// parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				// parameter.uid = this.friendData.uid
				// delete_friend(parameter).then(res => {
				// 	console.log(res, "删除返回值")
				// 	if (res.data.errCode == 0) {
				// 		uni.navigateBack()
				// 	}
				// })
			},
			goBack() {
				uni.navigateBack()
			},

		},
		mounted() {
			this.addBlockListener()
			this.removeBlackListener()
			this.deleteListener()
		},
		onUnload() {
			this.$globalEvent.removeEventListener("deleteFromBlackListSuccess")
			this.$globalEvent.removeEventListener("deleteFromBlackListFailed")
		}
	}
</script>

<style lang="scss" scoped>
	#setFriend {

		.confirm {
			width: 500rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			text-align: center;

			.titleArea {
				padding: 28rpx 50rpx;

				.titleInfo {
					height: 140rpx;
				}

			}


			.footerArea {
				height: 92rpx;
				display: flex;
				line-height: 92rpx;
				font-size: 32rpx;
				font-weight: 400;
				border-top: 1px solid rgba(151, 151, 151, 0.5);

				.confirmCancel {
					width: 50%;
					color: #333333;
					border-right: 1px solid rgba(151, 151, 151, 0.5);
				}

				.deleteConfirm {
					width: 50%;
					color: #1B72EC;
					background-color: #E8F2FF;
					border-bottom-right-radius: 12rpx;
				}
			}
		}

		.main {
			.mainHead {
				height: 324rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-bottom: 2rpx solid rgba(153, 153, 153, 0.4);

				.imageCon {
					width: 160rpx;
					height: 160rpx;
					border-radius: 160rpx;
					border: 6rpx solid #C0DCFF;

					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 10rpx;
					font-size: 36px;
					font-weight: 500;
					color: #333333;

					.headIcon {
						width: 114rpx;
						height: 114rpx;
						border-radius: 114rpx;
					}
				}

			}

			.operationSet {
				.operationSetItem {
					height: 88rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 44rpx;
					background-color: #fff;
					border-bottom: 2rpx solid rgba(153, 153, 153, 0.4);
					font-size: 32rpx;
					font-weight: 400;
					color: #333333;

					.arrow {
						width: 20rpx;
						height: 34rpx;
					}
				}
			}

		}

		.deleteBtn {
			margin-top: 310rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: 100%;
			height: 90rpx;
			background: #1B72EC;
			text-align: center;
			line-height: 90rpx;
		}

		.deleteBtn:active {
			background: #1B72EC;
			color: #FFFFFF;
		}
	}
</style>
