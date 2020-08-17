import { identity } from './../../src/contracts/v1/routes'
import app from './index'
import request from 'supertest'
//import db from '../../src/db/dbDev'

/**
 * @jest-environment node
 */

describe('Identity testing', () => {
  it('Should register new user', async (done) => {
    const signUpResponse = await request(app).post(identity.register).send({
      test: 'test',
    })
    expect(signUpResponse.status).toBe(201)
    expect(signUpResponse.body).toHaveProperty('register')
    done()
  })
})
