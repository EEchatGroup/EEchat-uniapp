<script>
	import store from "store/index.js";
	// import ws from './websockets/index.js'
	export default {
		data() {
			return {
				title: "Hello",
				flag: false,
				syncReturn: "",
				listener: "",
				dbDir: "",
				userId: "",
				userInfo: "",
				loginStatus: "",
			};
		},
		methods: {
			fileInfo() {
				let _this = this;
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					// fs.root是根目录操作对象DirectoryEntry
					fs.root.getDirectory(
						"user", {
							create: true,
						},
						(entry) => {
							_this.initAsync(entry.fullPath);
							console.log(entry.fullPath,"路径");
						},
						(error) => {
							console.log('getPathFailed----------');
							console.log(error);
						}
					);
				});
			},
			initAsync(dbDir) {
				const obj = {
					platform: 1,
					ipApi: "http://47.112.160.66:10000",
					ipWs: "47.112.160.66:17778",
					dbDir,
				};
				this.flag = this.$openSdk.initSDK(JSON.stringify(obj));
				console.log(this.flag);
			},
			initFriendListener() {
				this.$openSdk.setFriendListener();
			},
			setFriendListener() {
				this.$globalEvent.addEventListener("onBlackListAdd", (params) => {
					console.log(params);
				});
				this.$globalEvent.addEventListener("onBlackListDeleted", (params) => {
					console.log(params);
				});
				this.$globalEvent.addEventListener(
					"onFriendApplicationListAccept",
					(params) => {
						console.log(params);
					}
				);
				this.$globalEvent.addEventListener(
					"onFriendApplicationListAdded",
					(params) => {
						console.log(params);
					}
				);
				this.$globalEvent.addEventListener(
					"onFriendApplicationListDeleted",
					(params) => {
						console.log(params);
					}
				);
				this.$globalEvent.addEventListener(
					"onFriendApplicationListReject",
					(params) => {
						console.log(params);
					}
				);
				this.$globalEvent.addEventListener("onFriendListAdded", (params) => {
					console.log(params);
				});
				this.$globalEvent.addEventListener("onFriendListDeleted", (params) => {
					console.log(params);
				});
			},

			//深拷贝
			deepClone(obj) {
				let _obj = JSON.stringify(obj);
				return JSON.parse(_obj);
			}
		},
		mounted() {},
		onLaunch: function() {
			this.$openSdk.setConversationListener()
			
			this.$openSdk.addAdvancedMsgListener()
			this.fileInfo();
			this.initFriendListener();
			this.setFriendListener();

		},
		onShow: function() {},
		onHide: function() {},

	};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	page {
		height: 100% !important;
	}

	.uni-navbar {
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
	}
</style>
