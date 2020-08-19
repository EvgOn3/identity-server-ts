import { ILoginResponse } from './../../src/contracts/v1/responses'
import { IUserModel } from './../../src/types/userType'
import { identity } from './../../src/contracts/v1/routes'
import app from './index'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import db from '../../src/db/db'
import { IAuthResponse } from '../../src/contracts/v1/responses'
import { IUserRegistrationRequest } from '../../src/contracts/v1/requests'

const authFields = {
  jwt: 'jwt',
  refreshToken: 'refreshToken',
}

const guid = uuid()
const email = `test_${guid}@test.ru`
const password = `test${guid}`
const fingerPrint = 'fingerPrint'
const invalidFingerPrint = 'invalidFingerPrint'
let refreshToken: string,
  jwt: string,
  user: IUserModel,
  userId: string,
  updatedRefreshToken: string,
  updatedJwt: string

describe('Identity testing', () => {
  beforeAll(() => {
    db.connect()
  })
  it('Should register new user', async (done) => {
    const signUpResponse = await request(app).post(identity.register).send({
      email,
      password,
      fingerPrint,
    })
    const resBody = signUpResponse.body as IAuthResponse
    expect(signUpResponse.status).toBe(201)
    expect(resBody).toHaveProperty(authFields.jwt)
    expect(resBody).toHaveProperty(authFields.refreshToken)
    done()
  })
  it('Should sigIn new user', async (done) => {
    const singInResponse = await request(app).post(identity.login).send({
      email,
      password,
      fingerPrint,
    })

    const resBody = singInResponse.body as ILoginResponse
    jwt = resBody.refreshToken
    refreshToken = resBody.refreshToken
    expect(singInResponse.status).toBe(200)
    expect(resBody).toHaveProperty(authFields.jwt)
    expect(resBody).toHaveProperty(authFields.refreshToken)
    done()
  })
  afterAll((done) => {
    db.disconnect(done)
  })
})
