import React from 'react'
import { hydrate } from 'react-dom'
import { App } from './components/app'

const props = JSON.parse(document.querySelector('#app-props')!.innerHTML)
const app = document.querySelector('#app')

hydrate(<App notes={props} />, app)
