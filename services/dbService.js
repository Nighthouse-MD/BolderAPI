import sqlite from 'better-sqlite3';
import { resolve } from 'path';
import config from '../config.js';
const db = new sqlite(resolve(config.DB_PATH), { fileMustExist: true });

function query(sql, params) {
    console.log(sql)
    return db.prepare(sql).all(params);
}

function run(sql, params) {
    return db.prepare(sql).run(params);
}

export {
    query,
    run
}