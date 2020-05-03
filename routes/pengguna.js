const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/countermatkul/:kodematkul/:kelas', auth.checkToken, db.getDeviceCounterMatkulPengguna);
router.get('/readmatkul/:koderuangan', auth.checkToken, db.getDeviceMatkulPengguna);
router.get('/readpengguna/:kodematkul/:kelas/:offset', auth.checkToken, db.getDevicePengguna);
router.get('/readasisten/:kodematkul/:kelas/:offset', auth.checkToken, db.getDeviceAsisten);
router.post('/read_all/', auth.checkToken, db.getAllPengguna);
router.post('/read/', auth.checkToken, db.getPengguna);
router.post('/read/:fakultas', auth.checkToken, db.getPenggunaByFakultas);
router.post('/create/',auth.checkToken, db.createPengguna);
router.post('/update/', auth.checkToken, db.updatePengguna);
router.post('/delete/', auth.checkToken, db.deletePengguna);

module.exports = router;
