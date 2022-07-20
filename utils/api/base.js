import {
	baseUrl,
	uploadUrl
} from '../../global/config.js'
import prompt from '../prompt.js'
// import vuex from '../../common/vuex/index.js'

const get = (path, data) => {
	return request(path, "GET", data);
}

const post = (path, data,showErrMsg=true) => {
	return request(path, "POST", data,{},showErrMsg);
}
function request(path, method, data, header = {},showErrMsg=true) {
	let url = baseUrl + path
	// let token = vuex.getters.token
	// let user_data = vuex.getters.user_data
	return new Promise((resolve, reject) => {
		let postData=data;
		// if(postData)
		// {
		// 	postData.token=token;
		// 	postData.user_data=user_data;
		// }
		// else
		// {
		// 	postData={token:token,user_data:user_data};
		// }
		uni.request({
			url: url,
			method: method,
			data: postData,
			header: {
				"content-type": "application/x-www-form-urlencoded" ,// 默认值,
				// 'Authorization' : 'Bearer '/*  + token */
			},
			success: function(res) {
				if (res.data.statecode == 0 || res.data.statecode >=9000 ) {
					resolve(res.data);
				} else {
					if (res.data.statecode == 1) {
						console.log(res.data.message);
						// #ifdef MP-WEIXIN
						if(showErrMsg)
						{
							res.data.message ? prompt.showMsg(res.data.message) : prompt.hideToast(); 
						}
						// #endif
						// #ifdef MP-ALIPAY
						if(res.data.message){
							prompt.hideToast()
							prompt.showMsg(res.data.message)
						}else{
							prompt.hideToast()
						}
						// #endif
						
						reject(res.data)
					} else {
						handleError(res)
					}
				}
			},
			fail: function(res) {
				if (res.statusCode == 200) {
					handleError(res)
					reject(res.data)
				} else {
					handleError(res)
				}
			},
			complete: function() {

			}
		});
	})
}

function handleError(res) {
	res.data && res.data.message ? prompt.showMsg(res.data.message) : prompt.showMsg('网络错误，请稍后重试~')
}

export {
	post,
	get
}
