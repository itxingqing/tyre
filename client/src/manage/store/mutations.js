export default {
    setUserInfo(state, value){
        state.userInfo = value;
        window.sessionStorage.setItem('_userInfo', JSON.stringify(value));
    },

    clearUserInfo(state, value){
        state.userInfo = null;
        window.sessionStorage.removeItem('_userInfo');
    }
}