import { AppRoute } from '../../types/general'
import { identity } from './../../contracts/v1/routes'
import {
  registerAction,
  loginAction,
  logoutAction,
} from '../../controllers/v1/IdentityController'

const identityRoutes: AppRoute[] = [
  {
    path: identity.register,
    method: 'post',
    action: registerAction,
  },
  {
    path: identity.login,
    method: 'post',
    action: loginAction,
  },
  {
    path: identity.logout,
    method: 'post',
    action: logoutAction,
  },
]

export default identityRoutes
