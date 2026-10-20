import { el, anchor, append } from '../dom'
export function hero(data) {
  const section = el('section', 'hero section')
  const content = el('div', 'container hero-grid')
  const copy = el('div', 'hero-copy')
  append(copy, el('p', 'eyebrow', data.eyebrow), el('h1', '', data.title), el('p', 'hero-subtitle', data.subtitle))
  const actions = el('div', 'actions')
  ;(data.actions || []).forEach((item, index) => append(actions, anchor(item, `button ${index ? 'button-light' : 'button-primary'}`)))
  copy.append(actions)
  const visual = el('div', 'hero-visual'); visual.setAttribute('aria-hidden', 'true')
  const window = el('div', 'visual-window')
  append(window, el('div', 'window-top', 'school-admin  /  startproject'), el('div', 'window-line', `$ ${data.command || 'pip install django-school-framework'}`), el('div', 'window-line muted', '$ school-admin startproject my_school'), el('div', 'visual-divider'), el('div', 'visual-card', '01  Контент та модулі'), el('div', 'visual-card', '02  API та адмінка'), el('div', 'visual-card', '03  Власний дизайн'))
  append(visual, window); append(content, copy, visual); section.append(content)
  return section
}
