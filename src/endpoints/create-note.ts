import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import uuid from 'uuid/v4'
import { client } from '../db'
import { validateNote, formatError } from '../model/note-validator'
import { Json, ServerError, BadRequest } from '../utils/http'

const tableName = process.env.TABLE_NAME

const parsePayload = (payload: any) => {
  try {
    return JSON.parse(payload)
  } catch (e) {
    return {}
  }
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const note = {
      ...parsePayload(event.body),
      id: uuid(),
      createdAt: new Date().toISOString(),
    }

    const { error, value } = validateNote(note)

    if (error) {
      return BadRequest({ errors: formatError(error) })
    }

    await client
      .put({ TableName: tableName, ReturnConsumedCapacity: 'TOTAL', Item: value })
      .promise()

    return Json(value)
  } catch (e) {
    console.error(e)
    return ServerError()
  }
}
