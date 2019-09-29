const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname,'..','controllers','queries'))
const config = require(path.join(__dirname,'..','config'));
const auth = require(path.join(__dirname,'..','controllers','auth'))
  
router.post('/', (req, res, next) => {
    var oldtoken = req.body.old_access_token;

    if (oldtoken) {
        jwt.verify(oldtoken, config.secret, (err, decoded) => {
            if (err) {
                console.log('Token not valid');
                return res.json({
                    status: 0,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                var newtoken = jwt.sign({oldtoken: oldtoken},
                config.secret,
                { expiresIn: '1h'});
                console.log('New token auth')
                return res.json({
                    status: 1,
                    message: 'Token updated',
                    date: new Date().toLocaleString(),
                    token: newtoken
              });
            }
        });
    } 
    else {
        console.log('Refresh token failed')
        res.send(400).json({
            status: 0,
            message: 'Authentication failed! Please check the request'
        });
    }
});

module.exports = router;