const version = 'v1'
const identityRoute = `/${version}/identity`
export const identity = {
  register: `${identityRoute}/register`,
  login: `${identityRoute}/login`,
  refresh: `${identityRoute}/refresh`,
  logout: `${identityRoute}/logout`,
  logoutAll: `${identityRoute}/logoutAll`,
  update: `${identityRoute}/me`,
  delete: `${identityRoute}/me`,
  me: ``,
}
