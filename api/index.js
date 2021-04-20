import request from '@/utils/request';
import qs from 'qs'
//登录
export function loginApi(data) {
	return request({
		url: '/user/login',
		method: 'post',
		data: qs.stringify(data)
	})
}
//修改昵称
export function changeNickname(data) {
	return request({
		url:'/modify_user_info/change_nickname',
		method: 'post',
		data: qs.stringify(data)
	})
}
//设置备注
export function changeAlias(data) {
	return request({
		url:'/modify_user_info/change_alias',
		method: 'post',
		data: qs.stringify(data)
	})
}
//获取黑名单
export function getBlacklist(data) {
	return request({
		url:'/friend/get_blacklist',
		method: 'post',
		data: qs.stringify(data)
	})
}
//移除黑名单
export function removeBlacklist(data) {
	return request({
		url:'/friend/remove_blacklist',
		method: 'post',
		data: qs.stringify(data)
	})
}

