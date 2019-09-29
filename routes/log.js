const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getLog);
router.get('/:nim', auth.checkToken, db.getLogByNimDate);
router.post('/',auth.checkToken, db.createLog);
router.delete('/', auth.checkToken, db.deleteLog);

module.exports = router;
