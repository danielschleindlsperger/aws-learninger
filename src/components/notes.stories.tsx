import { storiesOf } from '@storybook/react'
import React from 'react'
import { Notes } from './notes'
import { Note } from '../model/note'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './style/theme'

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const notes: Note[] = [
  {
    id: String(Math.random()).slice(1, 10),
    title: 'Lorem Ipsum',
    body,
    createdAt: new Date(Date.now() - 53313).toISOString(),
  },
  {
    id: String(Math.random()).slice(1, 10),
    title: 'Lorem Ipsum',
    body: body
      .split('')
      .reverse()
      .join(''),
    createdAt: new Date(Date.now() - 212342).toISOString(),
  },
  {
    id: String(Math.random()).slice(1, 10),
    title: 'Lorem Ipsum',
    body,
    createdAt: new Date(Date.now() - 3838231).toISOString(),
  },
]

storiesOf('Notes', module)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add('Notes', () => <Notes notes={notes} />)
