const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/:kodedevice', auth.checkToken, db.getFingerprint);
router.get('/check_device/:kodedevice', auth.checkToken, db.getFingerprintDevice);
router.post('/create/', auth.checkToken, db.createFingerprint);
router.post('/delete/', auth.checkToken, db.deleteFingerprint);

module.exports = router;
