import { el, anchor, append } from '../dom'
export function footer(data = {}, site = {}) {
  const root = el('footer', 'site-footer')
  const inner = el('div', 'container footer-grid')
  const info = el('div')
  append(info, el('strong', 'footer-brand', site.name || 'Django School Framework'), el('p', '', data.description || 'Інструменти для створення шкільного сайту.'))
  const nav = el('nav', 'footer-links'); nav.setAttribute('aria-label', 'Посилання у футері')
  ;[...(data.links || []), ...(data.socialLinks || [])].forEach((item) => append(nav, anchor(item)))
  if (typeof data.contactEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) { const email = el('a', '', data.contactEmail); email.href = `mailto:${data.contactEmail}`; nav.append(email) }
  append(inner, info, nav)
  append(root, inner, el('div', 'container footer-bottom', `© ${new Date().getFullYear()} ${site.name || 'Django School Framework'}`))
  return root
}
