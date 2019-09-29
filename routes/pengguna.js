const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getPengguna);
router.get('/:fakultas', auth.checkToken, db.getPenggunaByFakultas);
router.post('/',auth.checkToken, db.createPengguna);
router.put('/', auth.checkToken, db.updatePengguna);
router.delete('/', auth.checkToken, db.deletePengguna);

module.exports = router;
