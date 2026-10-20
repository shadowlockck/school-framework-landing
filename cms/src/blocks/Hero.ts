import type { Block } from 'payload'
import { linkFields } from '../lib/fields'
export const Hero: Block = { slug: 'hero', labels: { singular: 'Головний екран', plural: 'Головні екрани' }, fields: [
  { name: 'eyebrow', type: 'text', maxLength: 80 },
  { name: 'title', type: 'text', required: true, maxLength: 140 },
  { name: 'subtitle', type: 'textarea', required: true, maxLength: 450 },
  { name: 'command', type: 'text', maxLength: 120 },
  { name: 'actions', type: 'array', maxRows: 2, fields: linkFields },
] }
