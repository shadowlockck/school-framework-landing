import type { Block } from 'payload'
export const Features: Block = { slug: 'features', labels: { singular: 'Можливості', plural: 'Можливості' }, fields: [
  { name: 'eyebrow', type: 'text', maxLength: 80 }, { name: 'title', type: 'text', required: true, maxLength: 140 },
  { name: 'intro', type: 'textarea', maxLength: 350 },
  { name: 'items', type: 'array', required: true, minRows: 1, maxRows: 12, fields: [
    { name: 'number', type: 'text', maxLength: 6 }, { name: 'title', type: 'text', required: true, maxLength: 80 }, { name: 'description', type: 'textarea', required: true, maxLength: 280 },
  ] },
] }
