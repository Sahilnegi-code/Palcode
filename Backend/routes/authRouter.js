const express = require("express");
const router =   express.Router();
const {googleAuth} = require("../controller/authController");
const {sendOtpVerificationEmail , verifyOtp,fetchAllPlaylists} = require('../controller/userController')
router.get('/google',googleAuth)
router.post('/signIn',sendOtpVerificationEmail)
router.post('/verifyOtp',verifyOtp)
router.get('/fetchPrivatePlaylist',fetchAllPlaylists)


module.exports = router;