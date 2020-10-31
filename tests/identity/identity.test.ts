import {
  LoginResponse,
  AuthResponse,
  ErrorResponse,
} from './../../src/contracts/v1/responses'
import { IUser } from './../../src/types/userType'
import { identity } from './../../src/contracts/v1/routes'
import app from './index'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import db from '../../src/db/db'
import { isCompleteIntersection } from '../../src/utils/utils'
import User from '../../src/models/user/user'

const errResObj = new ErrorResponse('1')
const authResOnj = new AuthResponse('1', '2')
const loginResOnj = new LoginResponse(new User(), '1', '2')

const guid = uuid()
const email = `test_${guid}@test.ru`
const password = `test${guid}`
const fingerPrint = 'fingerPrint'
let refreshToken: string,
  jwt: string,
  user: IUser,
  userId: string,
  updatedRefreshToken: string,
  updatedJwt: string
const authJwtHeader = (token: string) => {
  return { Authorization: `Bearer ${token}` }
}
describe('Identity testing', () => {
  const checkResults = (
    res: request.Response,
    expectedCode: number,
    typeObj: Object,
    done: Function
  ) => {
    expect(res.status).toBe(expectedCode)
    expect(
      isCompleteIntersection(Object.keys(res.body), Object.keys(typeObj))
    ).toBe(true)
    done()
  }
  beforeAll(() => {
    db.connect()
  })
  it('Should register new user', async (done) => {
    const res = await request(app).post(identity.register).send({
      email,
      password,
      fingerPrint,
    })

    checkResults(res, 201, authResOnj, done)
  })
  it('Should fail register; email exists', async (done) => {
    const res = await request(app).post(identity.register).send({
      email: 'user1@kakaka.rur',
      password,
      fingerPrint,
    })

    checkResults(res, 400, errResObj, done)
  })
  it('Should fail register; fingerPrint required', async (done) => {
    const res = await request(app).post(identity.register).send({
      email,
      password,
    })

    checkResults(res, 400, errResObj, done)
  })
  it('Should fail register; too ez password', async (done) => {
    const res = await request(app).post(identity.register).send({
      email,
      password: '1',
      fingerPrint,
    })

    checkResults(res, 400, errResObj, done)
  })
  it('Should fail register; no password', async (done) => {
    const res = await request(app).post(identity.register).send({
      email,
      fingerPrint,
    })

    checkResults(res, 400, errResObj, done)
  })
  it('Should fail register; no email', async (done) => {
    const res = await request(app).post(identity.register).send({
      fingerPrint,
      password,
    })

    checkResults(res, 400, errResObj, done)
  })
  it('Should login new user', async (done) => {
    const res = await request(app).post(identity.login).send({
      email,
      password,
      fingerPrint,
    })

    const resBody = res.body as LoginResponse
    jwt = resBody.jwt
    refreshToken = resBody.refreshToken
    user = resBody.user
    checkResults(res, 200, loginResOnj, done)
  })
  it('Should fail login; invalid password', async (done) => {
    const res = await request(app).post(identity.login).send({
      email,
      password: 'password',
      fingerPrint,
    })
    checkResults(res, 400, errResObj, done)
  })
  it('Should fail login; no password passed', async (done) => {
    const res = await request(app).post(identity.login).send({
      email,
      fingerPrint,
    })
    checkResults(res, 400, errResObj, done)
  })
  it('Should fail login; user not found', async (done) => {
    const res = await request(app).post(identity.login).send({
      email: 'notfound@email.com',
      password,
      fingerPrint,
    })
    checkResults(res, 400, errResObj, done)
  })
  it('Should fail login; no email passed', async (done) => {
    const res = await request(app).post(identity.login).send({
      password,
      fingerPrint,
    })
    checkResults(res, 400, errResObj, done)
  })
  it('Should fail login; no fingerprint passed', async (done) => {
    const res = await request(app).post(identity.login).send({
      email,
      password,
    })
    checkResults(res, 400, errResObj, done)
  })
  it('Should logout user', async (done) => {
    const res = await request(app)
      .post(identity.logout)
      .set(authJwtHeader(jwt))
      .send()

    // const resBody = res.body as LoginResponse
    // jwt = resBody.jwt
    // refreshToken = resBody.refreshToken
    // user = resBody.user
    checkResults(res, 200, {}, done)
  })
  afterAll((done) => {
    db.disconnect(done)
  })
})
