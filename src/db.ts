import Dexie, {Table} from 'dexie';
import {Party} from "./_types/Party";

import {Params} from "./_types/Params";
export class MyAppDatabase extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    party!:Table<Party>;
    params!:Table<Params>;
    constructor() {
        super('loto');
        this.version(1).stores({
            party: '++id, title, params', // Primary key and indexed props
            params: '++id, viewType', // Primary key and indexed props
    })
}
}

export const db = new MyAppDatabase();