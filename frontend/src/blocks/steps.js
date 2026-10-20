import { el, append } from '../dom'
export function steps(data) {
  const section = el('section', 'section steps'); section.id = 'start'
  const wrap = el('div', 'container')
  append(wrap, el('p', 'eyebrow', data.eyebrow), el('h2', 'section-title', data.title))
  const grid = el('div', 'steps-grid')
  ;(data.items || []).forEach((item, index) => {
    const card = el('article', 'step-card')
    append(card, el('span', 'step-number', `0${index + 1}`), el('h3', '', item.title), el('p', '', item.description))
    if (item.command) append(card, el('code', 'command', item.command))
    grid.append(card)
  })
  append(wrap, grid); section.append(wrap); return section
}
