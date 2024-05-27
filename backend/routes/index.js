const express = require('express')
const userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn')
const authenticationToken = require('../middleware/authentication')
const userDetailController = require('../controller/userDetail')
const logoutUserControllser = require('../controller/logoutUser')
const {emailCodeSendingController, emailCodeValidationController} = require("../controller/emailCodeValidation")
const resetPasswordController = require('../controller/resetPassword')
const updateUserBasicDetailsController = require('../controller/updateUserDetails')
const router = express.Router()

router.post('/signup', userSignUpController)
router.post('/login', userSignInController)
router.get('/userDetails',authenticationToken, userDetailController)
router.get('/logout', logoutUserControllser)
router.post('/emailcode', emailCodeSendingController)
router.post('/validatecode',emailCodeValidationController)
router.post('/resetPassword', resetPasswordController)
router.put('/updateUserDetails',authenticationToken, updateUserBasicDetailsController)

module.exports = router