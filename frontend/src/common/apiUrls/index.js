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
    },
    paymentOptionUpdate: {
        url: `${domain}/api/paymentOptionUpdate`,
        method: 'PUT'
    },
    shippingAddressUpdate: {
        url: `${domain}/api/shippingAddressUpdate`,
        method: 'PUT'
    },
    updatePassword:{
        url: `${domain}/api/updatePassword`,
        method: 'PUT'
    },
    becomeSeller: {
        url: `${domain}/api/becomeSeller`,
        method: 'PUT'
    },
    deleteUser: {
        url: `${domain}/api/deleteUser`,
        method: 'DELETE'
    },
    createOrUpdateStore: {
        url: `${domain}/api/createOrUpdateStore`,
        method: 'POST'
    },
    fatchStoreDetails: {
        url: `${domain}/api/fatchStoreDetails`,
        method: 'GET'
    },
    createProduct: {
        url: `${domain}/api/createProduct`,
        method: 'POST'
    },
    getAllProductsOfStore: {
        url: `${domain}/api/getAllProductsOfStore`,
        method: 'GET'
    },
}
export default apiUrls;