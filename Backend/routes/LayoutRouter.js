const express = require("express");
const router =   express.Router();
const { loadLayout , saveLayout } = require('../controller/layoutController')
router.post('/savelayout',saveLayout)
router.post('/loadlayout',loadLayout )
module.exports = router;