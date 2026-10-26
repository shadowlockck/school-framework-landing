const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function pagePath(pathname) {
  if (!basePath) return pathname
  if (pathname === basePath || pathname === `${basePath}/`) return '/'
  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname
}

export function siteURL(path) {
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) return path
  return `${basePath}${path}`
}
