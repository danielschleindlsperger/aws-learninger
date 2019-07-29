export type Headers = Record<string, string>

export const Html = (html: string, headers: Headers = {}) => ({
  statusCode: 200,
  body: html,
  headers: {
    'content-type': 'text/html; charset=utf-8',
    ...headers,
  },
  isBase64Encoded: false,
})

export const Json = (payload: any, headers: Headers = {}) => ({
  statusCode: 200,
  body: JSON.stringify(payload),
  headers: {
    'content-type': 'application/json; charset=utf-8',
    ...headers,
  },
  isBase64Encoded: false,
})

export const BadRequest = (payload: any, headers: Headers = {}) => ({
  statusCode: 400,
  body: JSON.stringify(payload),
  headers: {
    'content-type': 'application/json; charset=utf-8',
    ...headers,
  },
  isBase64Encoded: false,
})

export const ServerError = (headers: Headers = {}) => ({
  statusCode: 500,
  body: JSON.stringify({ message: 'Whoops! Internal server error' }),
  headers: {
    'content-type': 'application/json; charset=utf-8',
    ...headers,
  },
  isBase64Encoded: false,
})
