const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/:kodedevice', db.getFingerprint);
router.post('/create/', db.createFingerprint);
router.post('/delete/', db.deleteFingerprint);

module.exports = router;
