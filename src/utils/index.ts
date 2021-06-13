import jwt, {SignOptions} from 'jsonwebtoken'
import _ from 'lodash'

import type {JWT} from 'next-auth/jwt'

export function generateToken(
  payload: object = {},
  secret: string | Buffer,
  expiresIn?: number | string,
) {
  let jwtSecret = secret
  if (!secret) {
    jwtSecret = process.env.JWT_SECRET as string
  }

  const options: SignOptions = {
    algorithm: 'HS256',
  }

  if (expiresIn) {
    options.expiresIn = expiresIn
  }

  return jwt.sign(payload, jwtSecret, options)
}

export function decodeToken(token: string, secret: string | Buffer): JWT {
  let jwtSecret = secret
  if (!secret) {
    jwtSecret = String(process.env.JWT_SECRET)
  }
  return jwt.verify(token, jwtSecret, {algorithms: ['HS256']}) as JWT
}

export const wait: (fn: Function) => number = fn => setTimeout(fn, 500)
