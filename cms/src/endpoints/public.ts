import type { Endpoint } from 'payload'
import { headersWithCors } from 'payload'
import { normalizePath } from '../collections/Pages'
import { commonDTO, pageDTO } from '../lib/dto'

const json = (req: Parameters<NonNullable<Endpoint['handler']>>[0], data: unknown, status = 200) => Response.json(data, { status, headers: headersWithCors({ headers: new Headers({ 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }), req }) })

export const commonEndpoint: Endpoint = { path: '/common', method: 'get', handler: async (req) => {
  const [header, footer, settings] = await Promise.all([
    req.payload.findGlobal({ slug: 'header', overrideAccess: false, req }),
    req.payload.findGlobal({ slug: 'footer', overrideAccess: false, req }),
    req.payload.findGlobal({ slug: 'site-settings', overrideAccess: false, req }),
  ])
  return json(req, commonDTO(header, footer, settings))
} }

export const pageEndpoint: Endpoint = { path: '/page', method: 'get', handler: async (req) => {
  let path: string
  try { path = normalizePath(new URL(req.url || 'http://localhost').searchParams.get('path')) }
  catch { return json(req, { error: 'Некоректний шлях сторінки.' }, 400) }
  const result = await req.payload.find({ collection: 'pages', where: { and: [{ path: { equals: path } }, { _status: { equals: 'published' } }] }, draft: false, limit: 1, depth: 0, overrideAccess: false, req })
  const page = result.docs[0]
  return page ? json(req, pageDTO(page)) : json(req, { error: 'Сторінку не знайдено.' }, 404)
} }
