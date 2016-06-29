import {Request, Response} from "express";
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


import users from './endpoints/user';
import notes from './endpoints/notes';

var passportModule = require('passport');
import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import {UserService} from './services/user.service'
const app = express();

let apiVersion = 'v1'

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/' + apiVersion + '/user', users);
app.use('/' + apiVersion + '/notes', notes);

// Configure passport js
let opts : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret'
}

let passport = passportModule.use(new Strategy(opts, (jwtPayload, done) => {
    let user = UserService.findById(jwtPayload.sub);
    if(!user) {
        return done(null, false);
    } else {
        done(null, user);
    }
}))

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err: any, req: Request, res: Response, next: Function) {
    console.log(err.message);
    res.sendStatus(err.status || 500);
});

export default app;
