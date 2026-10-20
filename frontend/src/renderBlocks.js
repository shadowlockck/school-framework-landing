import { hero } from './blocks/hero'
import { features } from './blocks/features'
import { steps } from './blocks/steps'
import { faq } from './blocks/faq'
import { cta } from './blocks/cta'
import { el } from './dom'
const registry = { hero, features, steps, faq, cta }
export function renderBlocks(blocks = []) {
  const fragment = document.createDocumentFragment()
  blocks.forEach((block) => {
    const renderer = registry[block.type]
    if (renderer) fragment.append(renderer(block))
    else if (import.meta.env.DEV) fragment.append(el('p', 'unknown-block', `Невідомий блок: ${block.type || 'без типу'}`))
  })
  return fragment
}
