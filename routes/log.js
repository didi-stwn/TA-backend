const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.post('/read/', auth.checkToken, db.getLog);
router.post('/read/:nim', auth.checkToken, db.getLogByNimDate);
router.post('/statistikmatkul/:kodematkul', auth.checkToken, db.getStatistikMatkul);
router.post('/logmatkul/:kodematkul/:kelas', auth.checkToken, db.getLogMatkul);
router.post('/statistik_all/:nim', auth.checkToken, db.getStatistikAll);
router.post('/statistik/:nim', auth.checkToken, db.getStatistikByNimDate);
router.post('/pengajar/:nim', auth.checkToken, db.getLogPengajarByNimDate);
router.post('/solve_mahasiswa/read', auth.checkToken, db.getSolveMahasiswa);
router.post('/solve_mahasiswa/create', auth.checkToken, db.createSolveMahasiswa);
router.post('/solve_mahasiswa/delete', auth.checkToken, db.deleteSolveMahasiswa);
router.post('/konfigurasi_mahasiswa/read', auth.checkToken, db.getKonfigurasiMahasiswa);
router.post('/konfigurasi_mahasiswa/create', auth.checkToken, db.createKonfigurasiMahasiswa);
router.post('/konfigurasi_mahasiswa/edit', auth.checkToken, db.updateKonfigurasiMahasiswa);
router.post('/konfigurasi_mahasiswa/delete', auth.checkToken, db.deleteKonfigurasiMahasiswa);
router.post('/create/', auth.checkToken, db.createLog);
router.post('/delete/', auth.checkToken, db.deleteLog);

module.exports = router;