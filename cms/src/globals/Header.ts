import type { GlobalConfig } from 'payload'
import { editorOnly, links, linkFields } from '../lib/fields'
export const Header: GlobalConfig = { slug: 'header', access: { read: () => true, update: editorOnly }, fields: [
  { name: 'brand', type: 'text', required: true, maxLength: 100 },
  { name: 'tagline', type: 'text', maxLength: 120 },
  links('navigation', 8),
  { name: 'button', type: 'group', fields: linkFields },
] }
