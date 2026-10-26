import './styles/base.css'
import './styles/layout.css'
import './styles/blocks.css'
import { loadContent } from './api'
import { header } from './components/header'
import { footer } from './components/footer'
import { renderBlocks } from './renderBlocks'
import { el, append } from './dom'
import { pagePath } from './sitePath'

const app = document.querySelector('#app')
async function show() {
  const main = el('main', 'loading'); main.id = 'main'; main.setAttribute('role', 'status'); main.textContent = 'Завантажуємо сторінку…'; app.replaceChildren(main)
  try {
    const [common, page] = await loadContent(pagePath(location.pathname))
    document.title = page.meta.title || common.site.title
    document.querySelector('meta[name="description"]').content = page.meta.description || common.site.description
    const content = el('main'); content.id = 'main'
    if (page.blocks?.length) content.append(renderBlocks(page.blocks))
    else content.append(el('p', 'container empty', 'На цій сторінці поки немає вмісту.'))
    app.replaceChildren(header(common.header), content, footer(common.footer, common.site))
  } catch (error) {
    const panel = el('div', 'state-panel')
    append(panel, el('h1', '', error.message === 'Сторінку не знайдено.' ? 'Сторінку не знайдено' : 'Не вдалося завантажити сторінку'), el('p', '', error.message))
    const retry = el('button', 'button button-primary', 'Спробувати ще раз'); retry.type = 'button'; retry.addEventListener('click', show); panel.append(retry)
    const content = el('main'); content.id = 'main'; content.append(panel); app.replaceChildren(content)
  }
}
show()
