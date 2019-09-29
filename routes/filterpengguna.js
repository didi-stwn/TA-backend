const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getFilterPengguna);
router.post('/',auth.checkToken, db.createFilterPengguna);
router.delete('/', auth.checkToken, db.deleteFilterPengguna);

module.exports = router;
