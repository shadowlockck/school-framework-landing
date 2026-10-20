import { el, append } from '../dom'
export function features(data) {
  const section = el('section', 'section features'); section.id = 'mozhlyvosti'
  const wrap = el('div', 'container')
  append(wrap, el('p', 'eyebrow', data.eyebrow), el('h2', 'section-title', data.title), el('p', 'section-intro', data.intro))
  const grid = el('div', 'features-grid')
  ;(data.items || []).forEach((item, index) => {
    const card = el('article', 'feature-card')
    append(card, el('span', 'feature-number', item.number || String(index + 1).padStart(2, '0')), el('h3', '', item.title), el('p', '', item.description))
    grid.append(card)
  })
  const architecture = el('div', 'architecture')
  append(architecture, el('div', 'architecture-label', 'Як поєднуються частини'), el('div', 'architecture-flow'))
  const flow = architecture.querySelector('.architecture-flow')
  ;['Django + модулі', 'API та адмінка', 'Сайт вашої школи'].forEach((label, index) => {
    if (index) flow.append(el('span', 'architecture-arrow', '→'))
    flow.append(el('span', 'architecture-node', label))
  })
  append(wrap, grid, architecture); section.append(wrap); return section
}
