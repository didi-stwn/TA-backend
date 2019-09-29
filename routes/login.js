const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname,'..','controllers','queries'))
const config = require(path.join(__dirname,'..','config'));

// router.get('/', (req, res, next) => {
//     res.render('login')
// })
  
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var getusername = config.username_login
    var getpassword = config.password_login

    if (username && password) {
        if (username === getusername && password === getpassword) {
            var token = jwt.sign({username: username},
                        config.secret,
                        { expiresIn: '900000'});
            console.log('New token auth')
            // return the JWT token for the future API calls
            res.json({
                status: 1,
                message: 'Authentication successful!',
                date: new Date().toLocaleString(),
                token: token
            });
        } else {
            console.log('Login failed')
            res.send(403).json({
                status: 0,
                message: 'Incorrect username or password'
            });
        }
    } 
    else {
        console.log('Login failed')
        res.send(400).json({
            status: 0,
            message: 'Authentication failed! Please check the request'
        });
    }
});

module.exports = router;