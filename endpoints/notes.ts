import {UserService} from '../services/user.service';
import {Note} from '../models/note';

import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use(passport.authenticate('jwt', { session: false}))


/* GET home page. */
router.get('/', (req: Request, res: Response, next: Function) => {
    try {
        let notes = UserService.findById(req.user.id).notes;
        res.json({notes: notes});
    } catch(err) {
        res.sendStatus(400);
    }
});

router.post('/', (req: Request, res: Response, next: Function) => {
    let handleError = () => {
        res.sendStatus(400);
    }

    let note : Note = req.body.note;
    try {
        UserService.addNote(req.user.id, note);
        res.sendStatus(201);
    } catch(err) {
        handleError();
    }
})

export default router;
