const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getFilterRuangan);
router.post('/',auth.checkToken, db.createFilterRuangan);
router.delete('/', auth.checkToken, db.deleteFilterRuangan);

module.exports = router;
