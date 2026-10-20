import type { Block } from 'payload'
export const FAQ: Block = { slug: 'faq', labels: { singular: 'Питання та відповіді', plural: 'Питання та відповіді' }, fields: [
  { name: 'title', type: 'text', required: true, maxLength: 140 },
  { name: 'items', type: 'array', required: true, minRows: 1, maxRows: 12, fields: [
    { name: 'question', type: 'text', required: true, maxLength: 160 }, { name: 'answer', type: 'textarea', required: true, maxLength: 600 },
  ] },
] }
