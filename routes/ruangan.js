const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getRuangan);
router.post('/create/',auth.checkToken, db.createRuangan);
router.post('/update/', auth.checkToken, db.updateRuangan);
router.post('/update/:koderuangan', auth.checkToken, db.updateLastseenRuangan);
router.post('/delete/', auth.checkToken, db.deleteRuangan);

module.exports = router;
