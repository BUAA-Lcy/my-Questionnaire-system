import {createStore} from 'vuex'
const UserModule ={
    state: {
        login_or_not:false,
        user_name: "",
        user_id: 0 | null,
        user_email: ""
    },
    mutations: {
        loginSuccess(state, user){
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