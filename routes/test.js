const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

router.get('/read/', db.testread);
router.post('/create/', db.testcreate);
router.put('/update/', db.testupdate);
router.delete('/delete/', db.testdelete);

module.exports = router;