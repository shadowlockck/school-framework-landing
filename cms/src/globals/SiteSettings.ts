import type { GlobalConfig } from 'payload'
import { editorOnly } from '../lib/fields'
export const SiteSettings: GlobalConfig = { slug: 'site-settings', access: { read: () => true, update: editorOnly }, fields: [
  { name: 'siteName', type: 'text', required: true, maxLength: 100 },
  { name: 'defaultTitle', type: 'text', required: true, maxLength: 120 },
  { name: 'defaultDescription', type: 'textarea', required: true, maxLength: 180 },
  { name: 'language', type: 'select', defaultValue: 'uk', required: true, options: [{ label: 'Українська', value: 'uk' }] },
] }
