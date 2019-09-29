const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/', auth.checkToken, db.getFakultasJurusan);
router.get('/:fakultas', auth.checkToken, db.getFakultasJurusanByFakultas);
router.post('/',auth.checkToken, db.createFakultasJurusan);
router.put('/', auth.checkToken, db.updateFakultasJurusan);
router.delete('/', auth.checkToken, db.deleteFakultasJurusan);

module.exports = router;
