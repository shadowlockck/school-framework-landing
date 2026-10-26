import { el, anchor, append } from '../dom'
import { siteURL } from '../sitePath'
export function header(data = {}) {
  const root = el('header', 'site-header')
  const row = el('div', 'container header-row')
  const brand = el('a', 'brand'); brand.href = siteURL('/')
  append(brand, el('span', 'brand-symbol', 'S'), el('span', 'brand-name', data.brand || 'School Framework'))
  const nav = el('nav', 'nav'); nav.setAttribute('aria-label', 'Головна навігація')
  ;(data.navigation || []).forEach((item) => append(nav, anchor(item)))
  if (import.meta.env.VITE_DOCS_URL) {
    const docs = el('a', '', 'Документація')
    docs.href = import.meta.env.VITE_DOCS_URL
    nav.append(docs)
  }
  append(row, brand, nav, anchor(data.button, 'button button-small button-outline'))
  return append(root, row)
}
