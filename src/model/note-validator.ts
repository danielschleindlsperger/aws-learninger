import Joi, { ValidationError } from '@hapi/joi'
import { Note } from './note'

const NoteSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string()
    .min(3)
    .required(),
  body: Joi.string().required(),
  createdAt: Joi.string().required(),
})

export const formatError = (error: ValidationError) => error.details.map(d => d.message)

export const validateNote = (maybeNote: any) =>
  Joi.validate<Note>(maybeNote, NoteSchema, { stripUnknown: true })
