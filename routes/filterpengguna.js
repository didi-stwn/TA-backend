const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getFilterPengguna);
router.post('/create/',auth.checkToken, db.createFilterPengguna);
router.post('/delete/', auth.checkToken, db.deleteFilterPengguna);

module.exports = router;
