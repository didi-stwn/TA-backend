const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getMatkul);
router.post('/create/',auth.checkToken, db.createMatkul);
router.post('/update/', auth.checkToken, db.updateMatkul);
router.post('/delete/', auth.checkToken, db.deleteMatkul);

module.exports = router;
