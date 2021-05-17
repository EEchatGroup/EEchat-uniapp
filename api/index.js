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
		data: qs.stringify(data)
	})
}
//设置备注
export function changeAlias(data) {
	return request({
		url: '/modify_user_info/change_alias',
		method: 'post',
		data: qs.stringify(data)
	})
}
//获取黑名单
export function getBlacklist(data) {
	return request({
		url: '/friend/get_blacklist',
		method: 'post',
		data: qs.stringify(data)
	})
}
//移除黑名单
export function removeBlacklist(data) {
	return request({
		url: '/friend/remove_blacklist',
		method: 'post',
		data: qs.stringify(data)
	})
}
