import store from '../common/vuex/index.js'

const check_login = ()=>{
	return store.getters.user_id!=0 ? true :false
}
const village_id = ()=>{
	return store.getters.village_id
}
export {
	check_login,
	village_id
}