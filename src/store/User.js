import {createStore} from 'vuex'
const UserModule ={
    state: {
        login_or_not:false, //是否已经登录，可能用于懒加载项目信息
        user_name: "",//用户名
        user_id: 0 | null,//用户ID
        user_email: ""//用户邮箱，以上是目前用的，未完待续
    },
    mutations: {
        loginSuccess(state, user){//登录时更改用户状态
            state.login_or_not = true;
            state.user_name = user.user_name;
            state.user_id = user.user_id;
            state.user_email = user.user_id;
        }
    },
    actions: {

    }
}
export default UserModule