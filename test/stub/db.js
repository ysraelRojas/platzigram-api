'use strict'

import fixtures from '../fixtures/'

export default class Db{
    connect(){
        return Promise.resolve(true)
    }
    disconnect(){
        return Promise.resolve(true)
    }
    getImage(id){
        return Promise.resolve(fixtures.getImage())
    }
    getImages(){
        return Promise.resolve(fixtures.getImages())
    }
    saveImage(){
        return Promise.resolve(fixtures.getImage())
    }
    likeImage(id){
        let image = fixtures.getImage()
        image.liked = true
        image.likes = 1
        return Promise.resolve(image)
    }
    getImagesByTag(tag){
        return Promise.resolve(fixtures.getImagesByTag())
    }
    saveUser(user){
        return Promise.resolve(fixtures.getUser())
    }
    getUser(username){
        return Promise.resolve(fixtures.getUser())
    }
    authenticate(){
        return Promise.resolve(true)
    }
}