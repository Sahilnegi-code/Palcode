const express = require("express");
const router =   express.Router();
const {googleAuth} = require("../controller/authController");
router.get('/google',googleAuth)
// const { protect } = require("../middlewares/authMiddleware");
// console.log(deleteNote)
// console.log(updatNote)
// router.route('/').get(protect,getNotes);
// router.route('/create').post( protect ,createNote);
// router.route('/:id').get(getNoteById).put(protect,updatNote).delete(protect,deleteNote)

module.exports = router;