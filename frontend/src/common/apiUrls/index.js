const domain = "http://localhost:8080"
const apiUrls = {
    signUp : {
       url: `${domain}/api/signup`,
         method: 'POST'
    } ,
    login : {
        url: `${domain}/api/login`,
        method: 'POST'
    },
    userDetails : {
        url: `${domain}/api/userDetails`,
        method: 'GET'
    },
    logout : {
        url: `${domain}/api/logout`,
        method: 'GET'
    },
    sendcode: {
        url: `${domain}/api/emailcode`,
        method: 'POST'
    },
    validatecode: {
        url: `${domain}/api/validatecode`,
        method: 'POST'
    },
    resetPassword: {
        url: `${domain}/api/resetPassword`,
        method: 'POST'
    },
    updateUserBasicDetails: {
        url: `${domain}/api/updateUserDetails`,
        method: 'PUT'
    }
}
export default apiUrls;