'use strict'

import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'
import fixtures from './fixtures/'
import pictures from '../pictures'

test.beforeEach(async t => {
    let srv = micro(pictures)
    t.context.url = await listen(srv)
})

test('GET /:id', async t => {

    let image = fixtures.getImage()    
    let url = t.context.url
    let body = await request({uri: `${url}/${image.publicId}`, json:true})
    t.deepEqual(body, image)
})

test('POST /', async t => {
    let image = fixtures.getImage()
    let url = t.context.url

    let options = {
        method: 'POST',
        uri: `${url}/`,
        json: true,
        body: {
            description: image.description,
            src: image.src,
            userId: image.userId
        },
        resolveWithFullResponse: true
    }

    let response = await request(options)
    t.is(response.statusCode, 201)
    t.deepEqual(response.body, image)

})

test('POST /:id/like', async t => {
    let image = fixtures.getImage()
    let url = t.context.url

    let options = {
        method: 'POST',
        uri: `${url}/${image.id}/like`,
        json: true
    }
    let body = await request(options)
    let newImage = JSON.parse(JSON.stringify(image))
    newImage.liked = true
    newImage.likes = 1
    t.deepEqual(body, newImage)

})

test('GET /list', async t => {
    let images = fixtures.getImages()
    let url = t.context.url

    let options = {
        method: 'GET',
        uri: `${url}/list`,
        json: true
    }

    let body = await request(options)
    t.deepEqual(body, images)

})

test('GET /tag/:tag', async t => {
    let images = fixtures.getImagesByTag()
    let url = t.context.url

    let options = {
        method: 'GET',
        uri: `${url}/tag/awesome`,
        json: true
    }

    let body = await request(options)
    t.deepEqual(body, images)
})