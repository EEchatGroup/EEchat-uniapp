<template>
	<view id="setFriend">
		<button type="primary" @click="deleteFriend">删除好友</button>
	</view>
</template>

<script>
	import {
		delete_friend
	} from "../api"
	export default {
		data() {
			return {
				friendData: null
			}
		},
		onShow: function() {
			this.friendData = this.$store.state.setFriendData
			console.log(this.friendData, "好友设置信息")
		},
		methods: {
			async deleteFriend() {
				let parameter = {}
				parameter.operationID = this.$store.state.userInfo.address + await Date.now().toString();
				parameter.uid = this.friendData.uid
				delete_friend(parameter).then(res => {
					console.log(res, "删除返回值")
					if (res.data.data.errCode == 0) {
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#setFriend {}
</style>
