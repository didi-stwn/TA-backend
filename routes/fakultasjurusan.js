const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getFakultasJurusan);
router.post('/read/:fakultas', auth.checkToken, db.getFakultasJurusanByFakultas);
router.post('/create/',auth.checkToken, db.createFakultasJurusan);
router.post('/update/', auth.checkToken, db.updateFakultasJurusan);
router.post('/delete/', auth.checkToken, db.deleteFakultasJurusan);

module.exports = router;
