import request from '@/utils/request';
import qs from 'qs'
//注册
export function user_register(data) {
	return request({
		url: '/auth/user_register',
		method: 'post',
		data: data
	})
}

//登录
export function user_token(data) {
	return request({
		url: 'auth/user_token',
		method: 'post',
		data: data
	})
}
//获取最新seq
export function newest_seq(data) {
	return request({
		url: 'chat/newest_seq',
		method: 'post',
		data: data
	})
}
//拉取消息
export function pull_msg(data) {
	return request({
		url: 'chat/pull_msg',
		method: 'post',
		data: data
	})
}
//用户聊天接口
export function send_msg(data) {
	return request({
		url: 'chat/send_msg',
		method: 'post',
		data: data
	})
}
//修改昵称
export function changeNickname(data) {
	return request({
		url: '/modify_user_info/change_nickname',
		method: 'post',
		data: data
	})
}
//设置备注
export function changeAlias(data) {
	return request({
		url: '/modify_user_info/change_alias',
		method: 'post',
		data: data
	})
}
//获取黑名单
export function get_blacklist(data) {
	return request({
		url: 'friend/get_blacklist',
		method: 'post',
		data: data
	})
}
//加入黑名单
export function add_blacklist(data) {
	return request({
		url: '/friend/add_blacklist',
		method: 'post',
		data: data
	})
}
//移除黑名单
export function remove_blacklist(data) {
	return request({
		url: '/friend/remove_blacklist',
		method: 'post',
		data: data
	})
}
//获取好友列表
export function get_friend_list(data) {
	return request({
		url: '/friend/get_friend_list',
		method: 'post',
		data: data
	})
}
//查找好友
export function search_friend(data) {
	return request({
		url: '/friend/search_friend',
		method: 'post',
		data: data
	})
}
//删除好友
export function delete_friend(data) {
	return request({
		url: '/friend/delete_friend',
		method: 'post',
		data: data
	})
}
//添加好友
export function add_friend(data) {
	return request({
		url: '/friend/add_friend',
		method: 'post',
		data: data
	})
}
//回应添加好友
export function add_friend_response(data) {
	return request({
		url: '/friend/add_friend_response',
		method: 'post',
		data: data
	})
}
//获取好友请求列表
export function get_friend_apply_list(data) {
	return request({
		url: '/friend/get_friend_apply_list',
		method: 'post',
		data: data
	})
}
//腾讯云COS存储
export function tencent_cloud_storage_credential(data) {
	return request({
		url: '/third/tencent_cloud_storage_credential',
		method: 'post',
		data: data
	})
}

