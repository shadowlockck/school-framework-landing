import { el, anchor, append } from '../dom'
export function cta(data) {
  const section = el('section', 'section cta')
  const wrap = el('div', 'container cta-inner')
  append(wrap, el('p', 'eyebrow', data.eyebrow), el('h2', '', data.title), el('p', '', data.description))
  const actions = el('div', 'actions')
  ;(data.actions || []).forEach((item, index) => append(actions, anchor(item, `button ${index ? 'button-outline-light' : 'button-primary'}`)))
  append(wrap, actions); section.append(wrap); return section
}
