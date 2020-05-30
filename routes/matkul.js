const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getMatkul);
router.post('/read/pengguna', auth.checkToken, db.getMatkulPengguna);
router.post('/read/ruangan', auth.checkToken, db.getMatkulRuangan);
router.post('/create/',auth.checkToken, db.createMatkul);
router.post('/update/', auth.checkToken, db.updateMatkul);
router.post('/delete/', auth.checkToken, db.deleteMatkul);
router.post('/tambahan/ruangan/read/', auth.checkToken, db.getMatkulTambahanByRuangan);
router.post('/tambahan/matkul/read/', auth.checkToken, db.getMatkulTambahanByMatkul);
router.post('/tambahan/create/', auth.checkToken, db.createMatkulTambahan);
router.post('/tambahan/delete/', auth.checkToken, db.deleteMatkulTambahan);

module.exports = router;
