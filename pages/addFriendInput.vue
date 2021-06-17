<template>
	<view id="addFriendInput">
		<view class="head">
			<input type="text" value="" v-model="searchValue" class="searchInput" placeholder="Please enter the account number"
				@input="noUser = false" />
			<image src="../static/eliminate.png" mode="" class="eliminate" v-show="searchValue.length>0" @click="eliminateValue"></image>
			<text class="cancel" @click="goBack">cancel</text>
		</view>

		<view class="searchResult" @click="searchFriend" v-show="searchValue.length>0 && noUser == false">
			<image src="../static/searchFriend.png" mode="" class="searchFriend"></image>
			<text class="searchFriendTitle">search:</text>
			<text class="searchFriendValue">{{searchValue}}</text>
		</view>
		<view class="searchResult2" v-show="noUser">
			<text class="noUserTitle">The user does not exist</text>
		</view>
	</view>
</template>

<script>
	import {
		search_friend
	} from "../api"
	import postLog from '@/utils/requestLog';
	const openSdk = uni.requireNativePlugin('OpenSDK');
	let _this=null
	export default {
		data() {
			return {
				searchValue: "ac6b0878cba4000a798f99eb7f5c12f0",
				noUser: false,
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			eliminateValue(){
				this.searchValue=""
			},
			searchFriend() {
				const reqData = {
					uidList:[this.searchValue]
				}
				postLog(reqData)
				openSdk.getUsersInfo(JSON.stringify(reqData))
				
				// let parameter = {}
				// parameter.uid = this.searchValue
				// parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				// search_friend(parameter).then(async res => {
				// 	console.log(res)
				// 	if (res.data.errCode == 0) {
				// 		await this.$store.commit("getSearchFriendData", res.data.data)
				// 		uni.navigateTo({
				// 			url: './addFriendDetail'
				// 		});
				// 	} else {
				// 		this.noUser = true
				// 	}
				// })
			},
		},
		onLoad() {
			_this = this
			globalEvent.addEventListener('getUsersInfoFailed',(params)=>{
				postLog(params)
			})
			globalEvent.addEventListener('getUsersInfoSuccess',(params)=>{
				// _this.userInfo = params
				postLog(params)
			})
		},
		onUnload() {
			
		}

	}
</script>

<style lang="scss" scoped>
	#addFriendInput {
		.head {
			height: 126rpx;
			background-color: rgba(138, 191, 255, 0.2);
			display: flex;
			align-items: center;
			position: relative;
			.searchInput {
				width: 400rpx;
				height: 82rpx;
				background-color: #fff;
				border-radius: 8rpx;
				background-image: url(../static/search2.png);
				background-size: 36rpx 36rpx;
				background-repeat: no-repeat;
				background-position: 20rpx 50%;
				padding-left: 76rpx;
				padding-right: 80rpx;
				margin-left: 44rpx;

			}

			.eliminate {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 36%;
				left: 72%;
			}

			.cancel {
				font-size: 36rpx;
				font-weight: 600;
				color: #1B72EC;
				margin-left: 34rpx;
			}
		}

		.searchResult {
			width: 750rpx;
			height: 120rpx;
			background: #E8F2FF;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 32rpx;

			.searchFriend {
				width: 60rpx;
				height: 60rpx;
				flex-shrink: 0;
				margin-left: 44rpx;
			}

			.searchFriendTitle {
				flex-shrink: 0;
				margin-left: 20rpx;
			}

			.searchFriendValue {
				word-wrap: break-word;
				flex: 1;
				width: 0;
				margin-left: 20rpx;
				margin-right: 30rpx;
			}


		}

		.searchResult2 {
			width: 750rpx;
			height: 152rpx;
			background: #E8F2FF;
			display: flex;
			align-items: center;
			justify-content: center;

			.noUserTitle {
				font-size: 32rpx;
				font-weight: 500;
				color: #666666;
			}
		}

	}
</style>
