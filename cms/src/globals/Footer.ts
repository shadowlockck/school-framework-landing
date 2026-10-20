import type { GlobalConfig } from 'payload'
import { editorOnly, links } from '../lib/fields'
export const Footer: GlobalConfig = { slug: 'footer', access: { read: () => true, update: editorOnly }, fields: [
  { name: 'description', type: 'textarea', maxLength: 350 },
  links('links', 8), links('socialLinks', 5),
  { name: 'contactEmail', type: 'email', validate: (value: unknown) => !value || typeof value === 'string' && value.length <= 180 || 'Максимум 180 символів' },
] }
