import request from '@/utils/request';
import qs from 'qs'
//登录
export function loginApi(data) {
	console.log(qs.stringify(data))
	return request({
		url: '/user/login',
		method: 'post',
		data: qs.stringify(data)
		// data: data
	})
}
