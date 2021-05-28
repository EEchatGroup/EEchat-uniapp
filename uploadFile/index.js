// var CosAuth = require('./cos-auth.js');
import CosAuth from '../api/cos-auth.js'
import {
	tencent_cloud_storage_credential
} from '../api/index.js'
import store from '../store/index.js'


// 请求用到的参数
// var prefix = 'https://cos.' + config.Region + '.myqcloud.com/' + config.Bucket + '/'; // 这个是后缀式，签名也要指定 Pathname: '/' + config.Bucket + '/'
var prefix = 'https://echat-1302656840.cos.ap-chengdu.myqcloud.com/';

// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function(str) {
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A');
};

// 获取临时密钥
var stsCache;
var getCredentials = async function() {
	if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
		return stsCache.credentials;
	}

	let parameter = {}
	parameter.operationID = store.state.userInfo.address + await Date.now().toString();
	const result = await tencent_cloud_storage_credential(parameter)
	var data = result.data.data;
	var credentials = data.Credentials;
	if (credentials) {
		stsCache = data
	} else {
		console.log("失败")
	}
	return stsCache && stsCache.Credentials

	



};

// 计算签名
var getAuthorization = function(options, callback) {
	getCredentials(function(credentials) {
		callback({
			XCosSecurityToken: credentials.Token,
			Authorization: CosAuth({
				SecretId: credentials.TmpSecretId,
				SecretKey: credentials.tmpSecretKey,
				Method: options.Method,
				Pathname: options.Pathname,
			})
		});
	});
};

// 上传文件
var uploadFile = async function(filePath,suffix) {
	var Key = filePath.substr(filePath.lastIndexOf('/') + 1) + suffix; // 这里指定上传的文件名
	const credentials = await getCredentials()
	
	const AuthData = {
		XCosSecurityToken: credentials.Token,
		Authorization: CosAuth({
			SecretId: credentials.TmpSecretId,
			SecretKey: credentials.TmpSecretKey,
			Method: 'POST',
			Pathname: '/',
		})
	}
	var uploadTask = uni.uploadFile({
		url: prefix,
		filePath: filePath,
		name: 'file',
		formData: {
			'key': Key,
			'success_action_status': 200,
			'Signature': AuthData.Authorization,
			'x-cos-security-token': AuthData.XCosSecurityToken,
			'Content-Type': '',
		},
		success: (uploadFileRes) => {
			var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
			store.commit('getUpLoadImgUrl',url)
			console.log(url,'图片url');
		}
	});

};




module.exports = uploadFile;
