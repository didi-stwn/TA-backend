const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/readdosen/:kodematkul/:kelas/:offset', db.getDeviceDosen);
router.post('/read/', auth.checkToken, db.getDosen);
router.post('/read/:fakultas', auth.checkToken, db.getDosenByFakultas);
router.post('/create/',auth.checkToken, db.createDosen);
router.post('/update/', auth.checkToken, db.updateDosen);
router.post('/delete/', auth.checkToken, db.deleteDosen);

module.exports = router;