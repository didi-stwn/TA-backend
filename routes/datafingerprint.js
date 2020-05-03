const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/', auth.checkToken, db.getDataFingerprint);
router.post('/create/', auth.checkToken, db.createDataFingerprint);
router.post('/update/', auth.checkToken, db.updateDataFingerprint);
router.post('/delete/', auth.checkToken, db.deleteDataFingerprint);

module.exports = router;
