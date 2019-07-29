import React from 'react'
import { Note } from '../model/note'

export const Notes = ({ notes }: { notes: Note[] }) => (
  <ul>
    {notes.map(note => (
      <li key={note.id}>
        {note.createdAt} - {note.title}
      </li>
    ))}
  </ul>
)
