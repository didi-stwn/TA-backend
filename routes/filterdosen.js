const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getFilterDosen);
router.post('/read/:nip', auth.checkToken, db.getMatkulByNip);
router.post('/create/',auth.checkToken, db.createFilterDosen);
router.post('/delete/', auth.checkToken, db.deleteFilterDosen);

module.exports = router;