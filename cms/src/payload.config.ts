import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { commonEndpoint, pageEndpoint } from './endpoints/public'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const origins = (process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5173').split(',').map((value) => value.trim()).filter(Boolean)

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: dirname } },
  collections: [Users, Pages],
  globals: [Header, Footer, SiteSettings],
  endpoints: [commonEndpoint, pageEndpoint],
  cors: origins,
  csrf: origins,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' }, migrationDir: path.resolve(dirname, 'migrations'), push: false }),
  sharp,
})
