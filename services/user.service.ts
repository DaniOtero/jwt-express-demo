import {User} from '../models/user';
import {Note} from '../models/note';
import * as _ from 'underscore';

export class UserService {
    private static users : [User] = [
        {id: "test", password: "1234"},
        {id: "test2", password: "1234"},
        {id: "test3", password: "1234"},
    ];

    static findById(id: string) : User {
        let user : User = _.find(this.users, (user)=> {
            return user.id === id;
        })
        return user;
    }

    static addNote(id: string, note: Note) {
        let user = this.findById(id);
        if(!user || !note) {
            console.log(user)
            console.log(note)
            throw new Error("Bad request");
        } else {
            if (!user.notes) {
                user.notes = [note];
            } else {
                user.notes.push(note);
            }
        }
    }
}
