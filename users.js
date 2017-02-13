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

hash.set('GET /:username', async function traerUser(req, res, params){
    let username = params.username
    await db.connect()
    let user = await db.getUser(username)    
    await db.disconnect()

    delete user.email
    delete user.password
    
    send(res, 200, user)
})

hash.set('POST /', async function insertUser(req, res, params){
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