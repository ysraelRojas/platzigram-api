'use strict'

import {send, json} from 'micro'
import HttpHash from 'http-hash'
import Db from 'platzigram-db'
import config from './config'
import DbStub from './test/stub/db'
import utils from './lib/utils'

const env = process.env.NODE_ENV || 'production'
//let db = new Db(config.db)
let db = new DbStub()
//if(env === 'test'){
  // let db = new DbStub()
//}

const hash = HttpHash()

hash.set('POST /', async function authenticate(req, res, params){
    let credentials = await json(req)
    await db.connect()
    let auth = await db.authenticate(credentials.username, credentials.password)
    await db.disconnect()

    if(!auth){
        return send(res, 401, {error: 'invalid credentials'})
    }

    let token = await utils.signToken({
        username: credentials.username
    }, config.secret)

    send(res, 200, token)
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