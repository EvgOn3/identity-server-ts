import { HttpMethod, EnvVarName } from '../types/general'

export class httpMethods {
  static get: HttpMethod = 'get'
  static put: HttpMethod = 'put'
  static post: HttpMethod = 'post'
  static patch: HttpMethod = 'patch'
  static delete: HttpMethod = 'delete'
}

export class excludedFields {
  static __v = '__v'
  static timestamps = 'timestamps'
  static updatedAt = 'updatedAt'
  static createdAt = 'createdAt'
  //  _id: '_id'
}

export const envVarsNames = {
  JWT_ACCESS_KEY: 'JWT_ACCESS_KEY' as EnvVarName,
  DB_CONNECTION: 'DB_CONNECTION' as EnvVarName,
  JWT_REFRESH_EXPIRE: 'JWT_REFRESH_EXPIRE' as EnvVarName,
  JWT_ACCESS_EXPIRE: 'JWT_ACCESS_EXPIRE' as EnvVarName,
  PORT: 'PORT' as EnvVarName,
}
