type RecordValue = Record<string, any>
const string = (value: unknown) => typeof value === 'string' ? value : ''
const link = (value: RecordValue) => ({ label: string(value.label), url: string(value.url) })
const links = (value: unknown) => Array.isArray(value) ? value.map(link) : []

export function commonDTO(header: RecordValue, footer: RecordValue, settings: RecordValue) {
  return {
    header: { brand: string(header.brand), tagline: string(header.tagline), navigation: links(header.navigation), button: header.button ? link(header.button) : null },
    footer: { description: string(footer.description), links: links(footer.links), socialLinks: links(footer.socialLinks), contactEmail: string(footer.contactEmail) },
    site: { name: string(settings.siteName), title: string(settings.defaultTitle), description: string(settings.defaultDescription), language: 'uk' },
  }
}

export function pageDTO(page: RecordValue) {
  const blocks = Array.isArray(page.layout) ? page.layout.map((block: RecordValue) => {
    const type = string(block.blockType)
    if (type === 'hero' || type === 'cta') return { type, eyebrow: string(block.eyebrow), title: string(block.title), subtitle: string(block.subtitle), description: string(block.description), command: string(block.command), actions: links(block.actions) }
    if (type === 'features') return { type, eyebrow: string(block.eyebrow), title: string(block.title), intro: string(block.intro), items: (block.items || []).map((item: RecordValue) => ({ number: string(item.number), title: string(item.title), description: string(item.description) })) }
    if (type === 'steps') return { type, eyebrow: string(block.eyebrow), title: string(block.title), items: (block.items || []).map((item: RecordValue) => ({ title: string(item.title), description: string(item.description), command: string(item.command) })) }
    if (type === 'faq') return { type, title: string(block.title), items: (block.items || []).map((item: RecordValue) => ({ question: string(item.question), answer: string(item.answer) })) }
    return { type: 'unknown' }
  }) : []
  return { meta: { title: string(page.title), description: string(page.seoDescription), path: string(page.path) }, blocks }
}
