import React from 'react'
import { Note } from '../model/note'
import { Notes } from './notes'
import { Box } from './box'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './style/theme'

export const App = ({ notes }: { notes: Note[] }) => (
  <ThemeProvider theme={theme}>
    <Box p="3" mx="auto" width="12" fontFamily="sans">
      <h1>Notes</h1>
      <button onClick={() => alert('bubu')}>waddup</button>
      <Notes notes={notes} />
    </Box>
  </ThemeProvider>
)
