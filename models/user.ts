import {Note} from './note';

export interface User {
    id : string
    password: string,
    notes?: [Note]
}
