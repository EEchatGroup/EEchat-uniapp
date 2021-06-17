export default function (data={msg:"is null"},method="POST"){
	return uni.request({
				url:"http://172.16.20.51:3000/log",
				method,
				data:data,
				success(res) {
					
				},
				fail() {
					
				}
			})
}