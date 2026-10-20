import type { Block } from 'payload'
export const Steps: Block = { slug: 'steps', labels: { singular: 'Кроки', plural: 'Кроки' }, fields: [
  { name: 'eyebrow', type: 'text', maxLength: 80 }, { name: 'title', type: 'text', required: true, maxLength: 140 },
  { name: 'items', type: 'array', required: true, minRows: 1, maxRows: 5, fields: [
    { name: 'title', type: 'text', required: true, maxLength: 100 }, { name: 'description', type: 'textarea', required: true, maxLength: 280 }, { name: 'command', type: 'text', maxLength: 180 },
  ] },
] }
