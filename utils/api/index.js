import {get,post} from "./base.js"
const task = {
	position_orderedit(params) {//完成提交
		return post('/show/position_orderedit', params)
	},
	position_orderview(params) {//加载页面
		return post('/show/position_orderview', params)
	},
	position_arealist(params) {//展位
		return post('/show/position_arealist', params)
	},
	/* 
	 http://jnfzh.heima2009.cn/api/show/position_orderedit  -- area的name用半角逗号拼接传cont
	 http://jnfzh.heima2009.cn/api/show/position_orderview  -- telephone
	 http://jnfzh.heima2009.cn/api/show/position_arealist
	 */
}

export default {
	task
}
