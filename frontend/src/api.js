const base = (import.meta.env.VITE_CMS_URL ?? 'http://localhost:3000').replace(/\/$/, '')
async function get(route) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(`${base}/api/${route}`, { signal: controller.signal })
    if (response.status === 404) throw new Error('Сторінку не знайдено.')
    if (!response.ok) throw new Error('Не вдалося завантажити вміст. Спробуйте ще раз.')
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Сервер відповідає надто довго. Спробуйте ще раз.')
    if (error instanceof TypeError) throw new Error('Немає з’єднання з сервером вмісту. Спробуйте ще раз.')
    throw error
  } finally { clearTimeout(timer) }
}
export const loadContent = (path) => Promise.all([get('common'), get(`page?path=${encodeURIComponent(path)}`)])
