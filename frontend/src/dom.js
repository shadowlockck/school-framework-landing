import { siteURL } from './sitePath'

export const el = (tag, className = '', content = '') => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (content) node.textContent = content
  return node
}
export const safeURL = (value) => {
  if (typeof value !== 'string' || !value.trim()) return null
  if (/^\/(?!\/)[^\s]*$/.test(value)) return siteURL(value)
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null } catch { return null }
}
export const anchor = (item, className = '') => {
  const url = safeURL(item?.url)
  if (!url || !item?.label) return null
  const a = el('a', className, item.label)
  a.href = url
  if (url.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener noreferrer' }
  return a
}
export const append = (parent, ...children) => { children.filter(Boolean).forEach((child) => parent.append(child)); return parent }
