import {createStore} from "vuex";
import UserModule from './User.js'
import ProjectModule from "./Project.js"
const store = createStore({//简单的分发
    modules:{
        User: UserModule, //用户模块，对应User.js
        Project: ProjectModule, //项目模块，对应Project.js
    },
})

export default store