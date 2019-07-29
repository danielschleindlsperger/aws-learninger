import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { client } from '../db'
import { ServerError, Html } from '../utils/http'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { App } from '../components/app'
import { Note } from '../model/note'
import { getAsset } from '../utils/load-asset'

const tableName = process.env.TABLE_NAME as string

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = await client
      .scan({ TableName: tableName, ReturnConsumedCapacity: 'TOTAL' })
      .promise()

    const notes = result.Items as Note[]
    const html = renderToString(<App notes={notes} />)

    return Html(layout({ html, notes }))
  } catch (e) {
    console.error(e)
    return ServerError()
  }
}

const layout = ({ html, notes }: { html: string; notes: Note[] }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Notes</title>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap" rel="stylesheet">
  <script type="application/json" id="app-props">
    ${JSON.stringify(notes)}
  </script>
</head>
<body>
  <div id="app">${html}</div>
  <script defer src="${getAsset('show-notes-client.js')}"></script>
</body>
</html>
`
