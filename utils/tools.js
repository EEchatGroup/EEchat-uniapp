export const calculateDiffTime = (start_time) => {
	if (!parseInt(start_time)) return "-";
	const endTime = Math.round(new Date() / 1000);

	const timeDiff = endTime - start_time
	const day = parseInt(timeDiff / 86400);
	// const hour = parseInt((timeDiff % 86400) / 3600);
	// const minute = parseInt((timeDiff % 3600) / 60);
	return day;
}

export const formatDate = (timestamp) => {
	const now = new Date(timestamp*1000)
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds();
	const str1 = year + "-" + month + "-" + date
	const str2 = hour + ":" + minute + ":" + second
	return [str1, str2];
}

export const asyncGetImgInfo = (url) =>{
	return new Promise((resolve,reject)=>{
		uni.getImageInfo({
			src:url,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}


export const moveToDoc = (tempFilePaths) =>{
	return Promise((resolve,reject)=>{
		plus.io.resolveLocalFileSystemURL(tempFilePaths,
		(tmpEntry)=>{
			plus.io.resolveLocalFileSystemURL("_doc/",
			(docEntry)=>{
				caEntry.getDirectory("file",{create:true},
				(fileEntry)=>{
					tmpEntry.moveTo(fileEntry,_,(entrys)=>{
						resolve(entrys)
					})
				},(err)=>{
					console.log(err);
					reject(err)
				})
			},
			(err)=>{
				console.log(err);
				reject(err)
			})
		},
		(err)=>{
			console.log(err);
			reject(err)
		})
	})
}

export const randomString = (len)=> {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for ( let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}