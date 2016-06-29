import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
import {UserService} from '../services/user.service'
import jsonwebtoken = require ('jsonwebtoken')

/* GET home page. */
router.post('/login', function(req: Request, res: Response, next: Function) {
    let username = req.body.username;
    let password = req.body.password;
    let user = UserService.findById(username);
    if(user && (password === user.password)) {
        res.set('jwt', jsonwebtoken.sign({sub: user.id}, 'secret'));
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

export default router;
