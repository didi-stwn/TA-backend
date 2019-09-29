const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getRuangan);
router.post('/',auth.checkToken, db.createRuangan);
router.put('/', auth.checkToken, db.updateRuangan);
router.delete('/', auth.checkToken, db.deleteRuangan);

module.exports = router;
