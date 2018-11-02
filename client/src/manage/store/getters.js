export default {
    userInfo(state) {
        let userInfo = state.user,
            sessionUserInfo = window.sessionStorage.getItem('_userInfo');

        if (!userInfo && sessionUserInfo) {
            userInfo = JSON.parse(sessionUserInfo);
            state.user = userInfo;
        }
        return userInfo || {};
    }
}