export {}
declare global {
  namespace Express {
    interface Request {
      userData: {
        userId: string
        userName: string
        email: string
        userTypeId: number
      }
    }
    interface Response {
      successResponse: any
      failResponse: any
    }
  }
}
