const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getMatkul);
router.post('/',auth.checkToken, db.createMatkul);
router.put('/', auth.checkToken, db.updateMatkul);
router.delete('/', auth.checkToken, db.deleteMatkul);

module.exports = router;
