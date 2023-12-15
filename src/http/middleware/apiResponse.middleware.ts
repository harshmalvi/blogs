import { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'
import messageConstant from '../../constants/message.constant'
import httpStatusConstant from '../../constants/httpStatus.constant'
import apiStatusConstant from '../../constants/apiStatus.constant'

/**
 * attach success and fail response handler to response object
 * @param {Request} _req
 * @param {Request} res
 * @param {NextFunction} next
 * @return {Response}
 */
const apiResponseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // success response handler
  res.successResponse = (
    code: number = httpStatusConstant.OK,
    message: string | null = null,
    data: any = null,
    statusCode: any = apiStatusConstant.success
  ) => {
    message = !message ? messageConstant.SUCCESS : message
    return res.status(code).json({ status: statusCode, message, data })
  }

  // fail response handler
  res.failResponse = (
    code: number = httpStatusConstant.BAD_REQUEST,
    message: string = messageConstant.FAIL,
    error: any = null,
    statusCode: string = apiStatusConstant.fail
  ) => {
    if (code === httpStatusConstant.INTERNAL_SERVER_ERROR) {
      message = messageConstant.INTERNAL_SERVER_ERROR
      if (error) {
        console.error(`${messageConstant.INTERNAL_SERVER_ERROR}  ==>  ${error.message}`)
      }
      console.error(
        JSON.stringify({
          path: req.originalUrl,
          params: req.params,
          body: req.body,
          status: statusCode,
          message
        })
      )
    }
    return res.status(code).json({ status: statusCode, message })
  }
  next()
}

/**
 * joi error handler
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Response}
 */
const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): any => {
  if (isCelebrateError(error)) {
    let errorDetails = null
    if (error.details.get('body')) {
      const { details } = error.details.get('body') || {};
      errorDetails = details
    }
    if (error.details.get('query')) {
      const { details } = error.details.get('query') || {};
      errorDetails = details
    }
    if (error.details.get('params')) {
      const { details } = error.details.get('query') || {};
      errorDetails = details
    }
    if (errorDetails) {
      const message = errorDetails
        .map((i: { message: string }) => i.message.replace(/['"]+/g, ''))
        .join(',')
      return res.status(httpStatusConstant.BAD_REQUEST).send({
        status: apiStatusConstant.fail,
        message
      })
    }
  }
  console.error(`Unhandled Error ==> ${JSON.stringify(error)}`)
  next()
}

export { apiResponseHandler, errorHandler }
