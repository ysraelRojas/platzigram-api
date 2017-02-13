'use strict'

import {send, json} from 'micro'
import HttpHash from 'http-hash'
import Db from 'platzigram-db'
import config from './config'
import DbStub from './test/stub/db'

const env = process.env.NODE_ENV || 'production'
//let db = new Db(config.db)
let db = new DbStub()
//if(env === 'test'){
  // let db = new DbStub()
//}

const hash = HttpHash()

hash.set('POST /', async function getUser(req, res, params){
    let user = await json(req)
    await db.connect()
    let created = await db.saveUser(user)
    await db.disconnect()

    delete created.email
    delete created.password

    send(res, 201, created)
})

//GESTOR DE RUTAS main
export default async function main(req, res){
    let {method, url} = req
    let match = hash.get(`${method.toUpperCase()} ${url}`) 
    if(match.handler){
        try {
            await match.handler(req, res, match.params)    
        } catch (e) {
            send(res, 500, {error: e.message})
        }
        
    }else{
        send(res, 404, {error: 'route not found'})
    }
}