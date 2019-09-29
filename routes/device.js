const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getDevice);
router.post('/',auth.checkToken, db.createDevice);
router.put('/', auth.checkToken, db.updateDevice);
router.delete('/', auth.checkToken, db.deleteDevice);

module.exports = router;
