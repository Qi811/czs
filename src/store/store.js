import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	namespaced:true,
	modules:{

	},
	state:{
    url:''
	},
	mutations:{
    getUrl(state,url){
      state.url = url
    }
	},
	actions:{

	},
	getters:{

	},
})

export default store
