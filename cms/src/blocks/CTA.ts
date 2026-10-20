import type { Block } from 'payload'
import { linkFields } from '../lib/fields'
export const CTA: Block = { slug: 'cta', labels: { singular: 'Заклик до дії', plural: 'Заклики до дії' }, fields: [
  { name: 'eyebrow', type: 'text', maxLength: 80 }, { name: 'title', type: 'text', required: true, maxLength: 140 },
  { name: 'description', type: 'textarea', maxLength: 350 }, { name: 'actions', type: 'array', maxRows: 2, fields: linkFields },
] }
