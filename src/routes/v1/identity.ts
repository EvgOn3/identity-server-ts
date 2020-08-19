import { httpMethods } from '../../constants/constants'
import { AppRoute } from '../../types/general'
import { identity } from './../../contracts/v1/routes'
import {
  registerAction,
  loginAction,
} from '../../controllers/v1/IdentityController'

const identityRoutes: AppRoute[] = [
  {
    path: identity.register,
    method: httpMethods.post,
    action: registerAction,
  },
  {
    path: identity.login,
    method: httpMethods.post,
    action: loginAction,
  },
]

export default identityRoutes
