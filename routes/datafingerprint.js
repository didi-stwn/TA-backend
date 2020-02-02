const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/', db.getDataFingerprint);
router.post('/create/', db.createDataFingerprint);
router.post('/update/', db.updateDataFingerprint);
router.post('/delete/', db.deleteDataFingerprint);

module.exports = router;
