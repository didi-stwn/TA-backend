const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getLog);
router.post('/read/:nim', auth.checkToken, db.getLogByNimDate);
router.post('/create/',auth.checkToken, db.createLog);
router.post('/delete/', auth.checkToken, db.deleteLog);

module.exports = router;
