declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESS_KEY: string
      DB_CONNECTION: string
      JWT_REFRESH_EXPIRE: number
      JWT_ACCESS_EXPIRE: number
      PORT: number
    }
  }
  namespace Express {
    // interface AppRoute {
    //   path: string
    //   method: string
    //   action: Function
    // }
  }
  // type CallbackFunction = () => void
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
