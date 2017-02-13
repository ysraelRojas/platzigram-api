'use strict'

import jwt from 'jsonwebtoken'
import bearer from 'token-extractor'

export default{
    async signToken(payload, secret, options){
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err)

                resolve(token) 
            })
        })
    },
    
    async verifyToken(token, secret, options){
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, options, (err, decode) => {
                if(err) return reject(err)

                resolve(decode)
            })
        })
    },

    async extractToken(req){
        return new Promise((resolve, reject) => {
            bearer(req, (err, token) => {
                if(err) return reject(err)

                resolve(token)
            })
        })
    }
}