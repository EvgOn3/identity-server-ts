import { HttpMethod } from '../types/general'
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
