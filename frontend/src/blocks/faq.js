import { el, append } from '../dom'
export function faq(data) {
  const section = el('section', 'section faq'); section.id = 'faq'
  const wrap = el('div', 'container faq-grid')
  append(wrap, el('h2', 'section-title', data.title))
  const list = el('div', 'faq-list')
  ;(data.items || []).forEach((item) => {
    const details = el('details', 'faq-item')
    append(details, el('summary', '', item.question), el('p', '', item.answer)); list.append(details)
  })
  append(wrap, list); section.append(wrap); return section
}
