'use strict'

import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'
import fixtures from './fixtures/'
import users from '../users'

test.beforeEach(async t => {
    let srv = await micro(users)
    t.context.url = await listen(srv)
})

test('POST /', async t => {
    let user = fixtures.getUser()
    let url = t.context.url

    let options = {
        method: 'POST',
        uri: `${url}/`,
        json: true,
        body: {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        },
        resolveWithFullResponse: true
    }
    delete user.email
    delete user.password

    let response = await request(options)   

    t.is(response.statusCode, 201)
    t.deepEqual(response.body, user)

})