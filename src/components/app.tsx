import React from 'react'
import { Note } from '../model/note'
import { Notes } from './notes'
import { Box } from './box'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './style/theme'

export const App = ({ notes }: { notes: Note[] }) => (
  <ThemeProvider theme={theme}>
    <Notes notes={notes} />
  </ThemeProvider>
)
