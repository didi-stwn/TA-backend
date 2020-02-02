const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/', db.getDevicePengguna);
router.post('/read/', auth.checkToken, db.getPengguna);
router.post('/read/:fakultas', auth.checkToken, db.getPenggunaByFakultas);
router.post('/create/',auth.checkToken, db.createPengguna);
router.post('/update/', auth.checkToken, db.updatePengguna);
router.post('/delete/', auth.checkToken, db.deletePengguna);

module.exports = router;
