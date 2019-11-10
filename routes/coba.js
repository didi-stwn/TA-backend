const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getCoba);
router.post('/',auth.checkToken, db.createCoba);

module.exports = router;
