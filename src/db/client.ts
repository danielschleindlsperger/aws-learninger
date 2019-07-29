import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { SharedIniFileCredentials } from 'aws-sdk'

const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME

export const client = new DocumentClient({
  credentials: isLambda ? undefined : new SharedIniFileCredentials({ profile: 'dev' }),
  httpOptions: { connectTimeout: 1000, timeout: 3000 },
})
