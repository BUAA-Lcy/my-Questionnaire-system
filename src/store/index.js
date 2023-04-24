import {createStore} from "vuex";
import UserModule from './User.js'
import ProjectModule from "./Project.js"
const store = createStore({
    modules:{
        User: UserModule,
        Project: ProjectModule,
    },
})

export default store