import Vue from 'vue'
import App from './App'



// import vuex from './common/vuex'
import prompt from 'utils/prompt.js'
import api from "utils/api/index.js"
import jsfun from "utils/index.js"
// import {pages,gotoPage} from './common/router'

Vue.prototype.$prompt = prompt
// Vue.prototype.$store = vuex;
Vue.prototype.$api = api
Vue.prototype.$jsfun = jsfun
// Vue.prototype.$navTo = gotoPage
// Vue.prototype.$pages = pages

Vue.config.productionTip = false
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
