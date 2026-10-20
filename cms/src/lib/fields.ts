import type { Field } from 'payload'

export const editorOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, maxLength: 80 },
  { name: 'url', type: 'text', required: true, maxLength: 500, validate: (value: unknown) => typeof value === 'string' && (/^\/(?!\/)[^\s]*$/.test(value) || /^https:\/\/[^\s]+$/i.test(value)) || 'Вкажіть внутрішній шлях або HTTPS URL' },
]
export const links = (name: string, maxRows = 8): Field => ({ name, type: 'array', maxRows, fields: linkFields })
