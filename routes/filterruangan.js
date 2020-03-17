const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/:koderuangan', auth.checkToken, db.getFilterRuangan);
router.get('/time/:koderuangan', db.getFilterTime);
router.post('/create/',auth.checkToken, db.createFilterRuangan);
router.post('/delete/', auth.checkToken, db.deleteFilterRuangan);

module.exports = router;
