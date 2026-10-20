import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { Steps } from '../blocks/Steps'
import { FAQ } from '../blocks/FAQ'
import { CTA } from '../blocks/CTA'
import { editorOnly } from '../lib/fields'

export const normalizePath = (value: unknown): string => {
  if (typeof value !== 'string') throw new Error('Некоректний шлях')
  const path = value.trim().replace(/\/$/, '') || '/'
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(path)) throw new Error('Шлях має містити лише латинські літери, цифри, дефіс і одинарні слеші')
  return path
}

export const Pages: CollectionConfig = {
  slug: 'pages', admin: { useAsTitle: 'title' }, versions: { drafts: true },
  access: {
    create: editorOnly, update: editorOnly, delete: editorOnly,
    read: ({ req }) => req.user ? true : { _status: { equals: 'published' } },
  },
  fields: [
    { name: 'path', type: 'text', required: true, unique: true, index: true, defaultValue: '/', maxLength: 160,
      validate: (value: unknown) => { try { normalizePath(value); return true } catch (error) { return error instanceof Error ? error.message : 'Некоректний шлях' } },
      hooks: { beforeValidate: [({ value }) => { try { return normalizePath(value) } catch { return value } }] } },
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'seoDescription', type: 'textarea', required: true, maxLength: 180 },
    { name: 'layout', type: 'blocks', required: true, blocks: [Hero, Features, Steps, FAQ, CTA] },
  ],
}
