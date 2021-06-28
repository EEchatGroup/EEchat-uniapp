<template>
	<!-- <view style="height: 100vh; background-color: #e8f2ff;" class=""> -->
	<view @click.stop="clickPage" class="chat-box">
		<view class="chat-content">
			<u-navbar>
				<view class="slot-wrap">
					<view class="nick-title">
						<text>Blooming</text>
						<view class="user-status">
							<text>Mobile Online</text>
							<u-icon name="arrow-right" size="14" />
						</view>
					</view>
				</view>
				<view slot="right" class="slot-right">
					<u-icon name="more-dot-fill" size="48" />
				</view>
			</u-navbar>
			<scroll-view :scroll-into-view="listItem" :style="{height:scrollHeight+'px'}" class="chat-list" scroll-y>
				<template v-for="msg in msgList">
					<!-- <OtherMsg :msg="tempmsg" :id="'test-item'"/> -->
					<OtherMsg v-if="msg.sendID==recvID" :percent="percent" :msg="msg" :key="msg.serverMsgID"
						:id="'msg'+msg.serverMsgID.slice(msg.serverMsgID.length-19)" />
					<MyMsg v-else :msg="msg" :percent="percent" :key="msg.serverMsgID"
						:id="'msg'+msg.serverMsgID.slice(msg.serverMsgID.length-19)" />
				</template>
			</scroll-view>
			<view class="bottom-bar">
				<u-icon @click="voice" size="51" name="../static/voice.png" />
				<u-input v-model="inputValue" height="58" placeholder="" class="bottom-input"></u-input>
				<u-icon @click="moreAction" size="51" name="../static/moreOperation.png" />
				<u-button class="bottom-btn" size="mini" @click="sendTextMsg">Send</u-button>
			</view>
			<view v-show="operationStatus" class="more-operation">
				<view @click="clickShot" class="operation-item">
					<u-icon size="51" name="../static/camera.png" />
					<text>shot</text>
				</view>
				<view @click="clickAlbum" class="operation-item">
					<u-icon size="51" name="../static/album.png" />
					<text>album</text>
				</view>
			</view>
			
		</view>
		<u-mask :mask-click-able="false" :show="showMask">
			<view class="mask-warp">
				<view class="voice-icon-box">
					<image class="icon-item" src="../static/press-voice.png" mode=""></image>
					<view class="interval-time"><text>{{intIntervalTime+'s'}}</text></view>
					<view class="bottom-icon" />
				</view>
				<view class="btn-list">
					<view class="action-btn">
						<u-button @click="cancelVoice" type="default" size="mini">cancel</u-button>
						<u-button @click="sendVoice" size="mini" type="default">send</u-button>
					</view>
					<view class="press-btn" @touchstart="startSpeack" @touchend="stopSpeack">long press when speacking
					</view>
				</view>
			</view>
		</u-mask>

		<u-action-sheet @click="imageOrVideo" :list="actionList" v-model="actionShow"></u-action-sheet>
	</view>
</template>

<script>
	import OtherMsg from "./comps/otherMsg.vue"
	import MyMsg from "./comps/myMsg.vue"
	import {
		asyncGetImgInfo
	} from '../utils/tools.js'
	import {requestAndroidPermission} from '../utils/permission.js'

	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	let _this = null
	export default {
		data() {
			return {
				nickname: "",
				scrollHeight: 0,
				inputValue:"",
				operationStatus: false,
				listItem: null,
				showMask: false,
				actionShow: false,
				voicePath: "",
				recvID: "",
				recorderManager: null,
				msgList:[],
				// msgList:[{"clientMsgID":"","serverMsgID":"2021-06-22 15:24:59-f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6-3534543132113072466","createTime":0,"sendTime":1624346699,"sessionType":1,"sendID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","recvID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"你好你好","seq":1,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 15:36:36-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-5220625613504645495","createTime":0,"sendTime":1624347396,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"123","seq":5,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 15:39:07-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-2221029477208656602","createTime":0,"sendTime":1624347547,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"456","seq":6,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 15:39:34-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-6057518649747809072","createTime":0,"sendTime":1624347574,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"789","seq":7,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 15:56:08-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-1008176001586657500","createTime":0,"sendTime":1624348568,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":200,"contentType":201,"platformID":0,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"isDisplay\":0,\"id\":\"\",\"text\":\"newUser asked to add you as a friend\"}","seq":8,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:03:59-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-2942568403268060681","createTime":0,"sendTime":1624349039,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":102,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"sourcePath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624349017034/compressed/1624349038126_1624349033312.jpg\",\"sourcePicture\":{\"uuid\":\"1624349039476259720-1721070109.jpg\",\"type\":\"image/jpeg\",\"size\":171946,\"width\":1500,\"height\":2000,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg\"},\"bigPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":0,\"height\":0,\"url\":\"\"},\"snapshotPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":200,\"height\":200,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg?imageView2/2/w/200/h/200\"}}","seq":9,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624349017034/compressed/1624349038126_1624349033312.jpg","sourcePicture":{"uuid":"1624349039476259720-1721070109.jpg","type":"image/jpeg","size":171946,"width":1500,"height":2000,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg"},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":200,"height":200,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624349039476259720-1721070109.jpg?imageView2/2/w/200/h/200"}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:05:59-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-1165505497730535314","createTime":0,"sendTime":1624349159,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":200,"contentType":201,"platformID":0,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"isDisplay\":0,\"id\":\"\",\"text\":\"newUser asked to add you as a friend\"}","seq":10,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:46:42-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-2428097508102645422","createTime":0,"sendTime":1624351602,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":102,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"sourcePath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624351572158/compressed/1624351601248_IMG20210622085412.jpg\",\"sourcePicture\":{\"uuid\":\"1624351602698027804-1597969999.jpg\",\"type\":\"image/jpeg\",\"size\":165649,\"width\":2000,\"height\":1500,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624351602698027804-1597969999.jpg\"},\"bigPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":0,\"height\":0,\"url\":\"\"},\"snapshotPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":200,\"height\":200,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624351602698027804-1597969999.jpg?imageView2/2/w/200/h/200\"}}","seq":11,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624351572158/compressed/1624351601248_IMG20210622085412.jpg","sourcePicture":{"uuid":"1624351602698027804-1597969999.jpg","type":"image/jpeg","size":165649,"width":2000,"height":1500,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624351602698027804-1597969999.jpg"},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":200,"height":200,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624351602698027804-1597969999.jpg?imageView2/2/w/200/h/200"}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:50:07-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-2506302999005183957","createTime":0,"sendTime":1624351807,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"123","seq":12,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:51:38-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-3273552291852778590","createTime":0,"sendTime":1624351898,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"yyy","seq":13,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:53:21-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-2648246060012929389","createTime":0,"sendTime":1624352001,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"uuu","seq":14,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:54:54-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-6214186172485225712","createTime":0,"sendTime":1624352094,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"qwe","seq":15,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:55:32-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-5988222028737266685","createTime":0,"sendTime":1624352132,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"iii","seq":16,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 16:59:11-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-5699727559728961194","createTime":0,"sendTime":1624352351,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"rer","seq":17,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:02:28-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-6611759962037576653","createTime":0,"sendTime":1624352548,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"ewee","seq":18,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:06:56-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-8431436239856630112","createTime":0,"sendTime":1624352816,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"fff","seq":19,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:10:01-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-7775510441726471801","createTime":0,"sendTime":1624353001,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"ggg","seq":20,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:12:06-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-3582223099473866554","createTime":0,"sendTime":1624353126,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"ddd","seq":21,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:12:37-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-8221967651528559462","createTime":0,"sendTime":1624353157,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"hhh","seq":22,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:12:53-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-3662924101711596521","createTime":0,"sendTime":1624353173,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"vvv","seq":23,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:14:51-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-5776797512148313427","createTime":0,"sendTime":1624353291,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"jjjjjk","seq":24,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:42:39-f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6-605394647632969758","createTime":0,"sendTime":1624354959,"sessionType":1,"sendID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","recvID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"嘿嘿","seq":25,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:49:39-f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6-8995016276575641803","createTime":0,"sendTime":1624355379,"sessionType":1,"sendID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","recvID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"来来来","seq":26,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:51:02-f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6-2873287401706343734","createTime":0,"sendTime":1624355462,"sessionType":1,"sendID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","recvID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"哦哦哦哦哦哦","seq":27,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:55:33-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-8267293389953062911","createTime":0,"sendTime":1624355733,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"yy","seq":28,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 17:56:39-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-4592022834646721379","createTime":0,"sendTime":1624355799,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":101,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"fff","seq":29,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 19:07:04-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-118298131398851786","createTime":0,"sendTime":1624360024,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":102,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"sourcePath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624359947934/compressed/1624360023733_IMG20210622085412.jpg\",\"sourcePicture\":{\"uuid\":\"1624360025195763966-1597969999.jpg\",\"type\":\"image/jpeg\",\"size\":165649,\"width\":2000,\"height\":1500,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624360025195763966-1597969999.jpg\"},\"bigPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":0,\"height\":0,\"url\":\"\"},\"snapshotPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":200,\"height\":200,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624360025195763966-1597969999.jpg?imageView2/2/w/200/h/200\"}}","seq":30,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../uniapp_temp_1624359947934/compressed/1624360023733_IMG20210622085412.jpg","sourcePicture":{"uuid":"1624360025195763966-1597969999.jpg","type":"image/jpeg","size":165649,"width":2000,"height":1500,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624360025195763966-1597969999.jpg"},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":200,"height":200,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624360025195763966-1597969999.jpg?imageView2/2/w/200/h/200"}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"2021-06-22 20:26:06-7eefe8fc74afd7c6adae6d0bc76929e90074d5bc-4740490797942876174","createTime":0,"sendTime":1624364766,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":104,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"videoPath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../../temp/compress_video_820911423.mp4\",\"videoUUID\":\"1624364766392280179-1721070109.mp4\",\"videoUrl\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624364766392280179-1721070109.mp4\",\"videoType\":\"mp4\",\"videoSize\":4581072,\"duration\":5,\"snapshotPath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/snapshot.jpg\",\"snapshotUUID\":\"\",\"snapshotSize\":5420,\"snapshotUrl\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624364766092000804-1597969999.jpg\",\"snapshotWidth\":150,\"snapshotHeight\":200}","seq":31,"isRead":false,"status":2,"remark":"","pictureElem":{"sourcePath":"","sourcePicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/../../temp/compress_video_820911423.mp4","videoUUID":"1624364766392280179-1721070109.mp4","videoUrl":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624364766392280179-1721070109.mp4","videoType":"mp4","videoSize":4581072,"duration":5,"snapshotPath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__F1D268F/doc/user/snapshot.jpg","snapshotUUID":"","snapshotSize":5420,"snapshotUrl":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624364766092000804-1597969999.jpg","snapshotWidth":150,"snapshotHeight":200},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}},{"clientMsgID":"","serverMsgID":"ff25195de188761581a726e5a68a3300","createTime":1624611306,"sendTime":1624611306,"sessionType":1,"sendID":"7eefe8fc74afd7c6adae6d0bc76929e90074d5bc","recvID":"f02eaf01e18e9cb7c2e2bd7d7340ff38f8d4a8d6","msgFrom":100,"contentType":102,"platformID":1,"forceList":null,"senderNickName":"","senderFaceUrl":"","groupID":"","content":"{\"sourcePath\":\"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__C117447/doc/user/../uniapp_temp_1624611199070/compressed/1624611305010_IMG20210622085412.jpg\",\"sourcePicture\":{\"uuid\":\"1624611306912662533-1721070109.jpg\",\"type\":\"image/jpeg\",\"size\":165649,\"width\":2000,\"height\":1500,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624611306912662533-1721070109.jpg\"},\"bigPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":0,\"height\":0,\"url\":\"\"},\"snapshotPicture\":{\"uuid\":\"\",\"type\":\"\",\"size\":0,\"width\":200,\"height\":200,\"url\":\"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624611306912662533-1721070109.jpg?imageView2/2/w/200/h/200\"}}","seq":0,"isRead":false,"status":3,"remark":"","pictureElem":{"sourcePath":"/storage/emulated/0/Android/data/io.dcloud.eechatUniapp/apps/__UNI__C117447/doc/user/../uniapp_temp_1624611199070/compressed/1624611305010_IMG20210622085412.jpg","sourcePicture":{"uuid":"1624611306912662533-1721070109.jpg","type":"image/jpeg","size":165649,"width":2000,"height":1500,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624611306912662533-1721070109.jpg"},"bigPicture":{"uuid":"","type":"","size":0,"width":0,"height":0,"url":""},"snapshotPicture":{"uuid":"","type":"","size":0,"width":200,"height":200,"url":"https://echat-1302656840.cos.ap-chengdu.myqcloud.com/1624611306912662533-1721070109.jpg?imageView2/2/w/200/h/200"}},"soundElem":{"uuid":"","soundPath":"","sourceUrl":"","dataSize":0,"duration":0},"videoElem":{"videoPath":"","videoUUID":"","videoUrl":"","videoType":"","videoSize":0,"duration":0,"snapshotPath":"","snapshotUUID":"","snapshotSize":0,"snapshotUrl":"","snapshotWidth":0,"snapshotHeight":0},"fileElem":{"filePath":"","uuid":"","sourceUrl":"","fileName":"","fileSize":0},"mergeElem":{"title":"","abstractList":null,"multiMessage":null},"RevokeMessage":{"serverMsgID":"","sendID":"","senderNickname":"","recvID":"","groupID":"","contentType":0,"sendTime":0}}],
				actionList: [{
						text: "图片",
					},
					{
						text: "视频",
					},
				],
				percent: 0,
				timer: null,
				isRecord: false,
				intervalTime: 0,
				voicePath:"",
				myList:[]

			}
		},
		computed: {
			intIntervalTime() {
				// 用于显示整数的秒数
				return Math.round(this.intervalTime);
			}
		},
		components: {
			OtherMsg,
			MyMsg
		},
		methods: {
			clickAlbum(){
				this.actionShow = true
			},
			getHistoryMessageList() {
				const reqData = {
					groupID: "",
					startMsg: null,
					count: 50,
					userID: this.$store.state.conversationUser
				};
				this.$openSdk.getHistoryMessageList(JSON.stringify(reqData), async data => {
					console.log(data);
					let tmpArr = JSON.parse(data.msg)
					// let newArr = tmpArr.filter(t => t.contentType.toString().charAt(0) === '1')
					// for (let i = 0; i < newArr.length; i++) {
					// 	if (newArr[i].contentType == 102) {
					// 		const res = await asyncGetImgInfo(newArr[i].pictureElem.snapshotPicture.url)
					// 		newArr[i].pictureElem.snapshotPicture.width = res.width + 'px'
					// 		newArr[i].pictureElem.snapshotPicture.height = res.height + 'px'
					// 	}
					// }
					console.log(tmpArr);
					this.msgList = tmpArr
					const tmpItem = this.msgList[this.msgList.length-1]
					this.listItem = "msg"+tmpItem.serverMsgID.slice(tmpItem.serverMsgID.length-19)
				})
			},
			
			newMsgListener() {
				this.$globalEvent.addEventListener("onRecvNewMessage", (params) => {
					let res = JSON.parse(params.msg)
					console.log(res);
					if (res.sendID == this.recvID) this.list.push(res);
				});
			},
			sendMessageListener() {
				this.$globalEvent.addEventListener("sendMessageSuccess", (params) => {
					const res = JSON.parse(params.msg);
					_this.myList.forEach(myMsg=>{
						if(myMsg.clientMsgID==res.clientMsgID){
							const tmpArr = Object.assign([],_this.msgList)
							const reversIndex = tmpArr.findIndex(t=>t.clientMsgID==myMsg.clientMsgID)
							const index = tmpArr.length - 1 - reversIndex
							_this.msgList[index].status = 2
						}
					})
					// console.log(params.msg, "发送成功");
				});
				this.$globalEvent.addEventListener("sendMessageFailed", (params) => {
					const res = JSON.parse(params.msg);
					_this.myList.forEach(myMsg=>{
						if(myMsg.clientMsgID==res.clientMsgID){
							const tmpArr = Object.assign([],_this.msgList)
							const reversIndex = tmpArr.findIndex(t=>t.clientMsgID==myMsg.clientMsgID)
							const index = tmpArr.length - 1 - reversIndex
							_this.msgList[index].status = 3
						}
					})
					// console.log(res, "发送失败");
				});
				this.$globalEvent.addEventListener("sendMessageProgress", (params) => {
					const res = JSON.parse(params.msg)
					_this.myList.forEach(myMsg=>{
						if(myMsg.clientMsgID==res.clientMsgID){
							const tmpArr = Object.assign([],_this.msgList)
							const reversIndex = tmpArr.findIndex(t=>t.clientMsgID==myMsg.clientMsgID)
							const index = tmpArr.length - 1 - reversIndex
							_this.msgList[index].percent = params.percent
						}
					})
				});
			},
			clickPage() {
				uni.$emit("clickPage")
			},
			getScreen() {
				this.scrollHeight = uni.getSystemInfoSync().safeArea.height - 101
			},
			moreAction() {
				this.listItem = "bottom-item"
				if (this.operationStatus) {
					this.scrollHeight = uni.getSystemInfoSync().safeArea.height - 101
					this.operationStatus = false
					this.listItem = null
				} else {
					this.scrollHeight = uni.getSystemInfoSync().safeArea.height - 201
					this.operationStatus = true
				}
			},
			imageOrVideo(index) {
				if (index === 0) {
					this.album();
				} else {
					uni.chooseVideo({
						sourceType: ["album"],
						success: (res) => {
							console.log(res.tempFilePath);
							console.log(res.duration);
							const fileIndex = res.tempFilePath.indexOf("__UNI__C117447") + 14
							const suffixIndex = res.tempFilePath.lastIndexOf(".") + 1
							const suffix = res.tempFilePath.slice(suffixIndex)
							let url = res.tempFilePath.slice(fileIndex)
							url = '../..' + url
							const snapshot = "snapshot.jpg"
							let newVideoMessage = _this.$openSdk.createVideoMessage(url, suffix, res.duration, snapshot);
							const clientMsgID = _this.$openSdk.sendMessage(
								newVideoMessage,
								_this.recvID,
								"",
								false
							);
							console.log(newVideoMessage);
							console.log(clientMsgID);
							let newVideoMessage2 = JSON.parse(newVideoMessage)
							newVideoMessage2.clientMsgID = clientMsgID
							_this.myList.push(newVideoMessage2)
							_this.msgList.push(newVideoMessage2)
						},
					});
				}
			},

			album() {
				uni.chooseImage({
					count: 9,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],
					success: function(res) {
						for(let i = 0;i<res.tempFilePaths.length;i++){
							const tempFilePath = res.tempFilePaths[i];
							const tmpPath = tempFilePath.slice(4);
							const contactPath = ".." + tmpPath;
							let newImgMessage = _this.$openSdk.createImageMessage(contactPath);
							const clientMsgID = _this.$openSdk.sendMessage(
								newImgMessage,
								_this.recvID,
								"",
								false
							);
							let newImgMessage2 = JSON.parse(newImgMessage)
							newImgMessage2.clientMsgID = clientMsgID
							console.log(newImgMessage2);
							_this.myList.push(newImgMessage2)
							_this.msgList.push(newImgMessage2);
						}
					},
				});
			},
			clickShot() {
				uni.chooseImage({
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],
					success: function(res) {
						const tempFilePaths = res.tempFilePaths[0];
						const tmpPath = tempFilePaths.slice(4);
						const contactPath = ".." + tmpPath;
						let newImgMessage = _this.$openSdk.createImageMessage(contactPath);
						const clientMsgID = _this.$openSdk.sendMessage(
							newImgMessage,
							_this.recvID,
							"",
							false
						);
						let newImgMessage2 = JSON.parse(newImgMessage)
						newImgMessage2.clientMsgID = clientMsgID
						_this.myList.push(newImgMessage2)
						_this.msgList.push(newImgMessage2);
					},
				});
			},
			async voice() {
				const num = await requestAndroidPermission("android.permission.RECORD_AUDIO")
				console.log(num);
				this.showMask = true
			},
			sendTextMsg(){
				if (this.inputValue) {
					let newTextMessage =this.$openSdk.createTextMessage(
						this.inputValue
					);
					const clientMsgID = this.$openSdk.sendMessage(
						newTextMessage,
						this.recvID,
						"",
						false
					);
					console.log(clientMsgID);
					let newTextMessage2 = JSON.parse(newTextMessage)
					newTextMessage2.clientMsgID = clientMsgID
					console.log(newTextMessage2);
					this.inputValue = "";
					this.myList.push(newTextMessage2)
					this.msgList.push(newTextMessage2);
				}
			},
			sendVoice(){
				if(this.voicePath=="") return false
				const tmpPath = this.voicePath.slice(4);
				const contactPath = ".." + tmpPath;
				let newVoiceMessage = _this.$openSdk.createSoundMessage(contactPath,this.intervalTime);
				const clientMsgID = _this.$openSdk.sendMessage(
					newVoiceMessage,
					_this.recvID,
					"",
					false
				);
				let newVoiceMessage2 = JSON.parse(newVoiceMessage)
				newVoiceMessage2.clientMsgID = clientMsgID
				newVoiceMessage2.soundElem.uuid = new Date().getTime()
				this.myList.push(newVoiceMessage2)
				this.msgList.push(newVoiceMessage2)
				this.showMask = false
			},
			cancelVoice(){
				this.showMask=false
				this.voicePath = ""
			},
			startTouch(){
				//获取录音权限
				console.log('startTouch')
			},
			startSpeack() {
				this.timer = setInterval(() => {
					_this.intervalTime += 0.5;
					if (_this.intervalTime >= 0.5 && !_this.isRecord) {
						//如果用户录制的时间太短,就不会去开启录音, 因为有个bug: recorderManager.stop()在短时间内开启在关闭的话,实际上他还在不停地录音,不知道你们有没有遇到过
						_this.isRecord = true;
						_this.intervalTime = 0;
						recorderManager.start({
							format: "wav"
						});
					}
				}, 500);
			},
			stopSpeack() {
				if (this.intervalTime <= 0.5) {
					console.log("录音太短了!!!");
				}
				clearInterval(this.timer);
				if (this.isRecord) {
					setTimeout(() => {
						recorderManager.stop();
						_this.isRecord = false;
					}, 500); //延迟小段时间停止录音, 更好的体验
				}
			},
		},
		beforeMount() {
			this.getScreen()
			this.getHistoryMessageList();
			this.newMsgListener();
			this.sendMessageListener()
		},
		onLoad: function(options) {
			_this = this
			recorderManager.onStop(function(res) {
				_this.voicePath = res.tempFilePath;
			});
			if (options.userID) {
				this.nickname = options.userID;
				this.recvID = options.userID;
			} else {
				this.nickname = "unknown";
			}
		}
	}
</script>

<style lang="scss">
	/deep/.u-slot-content {
		justify-content: center;
	}
// .chat-box{
// 	position: relative;
// 	.chat-content{
// 		position: relative;
// 		z-index: 0;
// 	}
// }

	.slot-wrap {
		display: flex;
		align-items: center;

		.nick-title {
			text-align: center;
			font-size: 36rpx;

			.user-status {
				font-size: 20rpx;
			}
		}
	}

	.slot-right {
		padding: 14rpx 26rpx 14rpx 14rpx;
	}

	.bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #e8f2ff;
		height: 57px;

		.bottom-input {
			background-color: #FFFFFF;
			border-radius: 12rpx;
			// height: 56rpx;
		}

		.bottom-btn {
			color: #FFFFFF;
			background-color: #1b72ec;
			font-size: 28rpx;
			margin-right: 16rpx;
		}

		.u-icon {
			margin: 0 16rpx;
		}
	}

	.chat-list {
		// height: calc(100vh - 202rpx);
		background-color: #FFFFFF;
	}

	.more-operation {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.operation-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.u-icon {
				margin-bottom: 12rpx;
			}
		}
	}


	.mask-warp {
		// width: 100%;
		// height: 100vh;
		// background-color: rgba(0, 0, 0, 0.2);
		// position: absolute;
		// z-index: 999;
		// top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.voice-icon-box {
			position: relative;
			width: 192px;
			height: 110px;
			background-color: white;
			margin-top: 40vh;
			text-align: center;
			line-height: 110px;

			.icon-item {
				width: 104px;
				height: 28px;
			}
			.interval-time{
				position: absolute;
				top: 24px;
				left: 50%;
				transform: translateX(-50%);
			}

			.bottom-icon {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border: 30rpx solid;
				border-color: white transparent transparent transparent;
			}
		}

		.btn-list {

			.action-btn {
				margin: 10vh 0 3vh 0;
				display: flex;
				justify-content: space-between;

				uni-button {
					margin: 0;
				}
			}

			// width: 252px;
		}

		.press-btn {
			background-color: #1B72EC;
			color: #FFFFFF;
			padding: 8px 14px;
			border-radius: 4px;
		}
	}
</style>
