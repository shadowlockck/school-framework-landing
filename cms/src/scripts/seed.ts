import { getPayload } from 'payload'
import config from '../payload.config'

const pypi = 'https://pypi.org/project/django-school-framework/'
const github = 'https://github.com/shadowlockck/framewrok-for-school'
const payload = await getPayload({ config })

const currentHeader = await payload.findGlobal({ slug: 'header' })
if (!currentHeader.brand) await payload.updateGlobal({ slug: 'header', data: {
  brand: 'Django School Framework', tagline: 'Основа для сайту школи',
  navigation: [{ label: 'Можливості', url: '/#mozhlyvosti' }, { label: 'Як почати', url: '/#start' }, { label: 'Питання', url: '/#faq' }],
  button: { label: 'Почати роботу', url: pypi },
} })
const currentFooter = await payload.findGlobal({ slug: 'footer' })
if (!currentFooter.description) await payload.updateGlobal({ slug: 'footer', data: {
  description: 'Відкритий Django-фреймворк для створення офіційних сайтів шкіл.',
  links: [{ label: 'Пакет на PyPI', url: pypi }, { label: 'Вихідний код', url: github }], socialLinks: [],
} })
const currentSettings = await payload.findGlobal({ slug: 'site-settings' })
if (!currentSettings.siteName) await payload.updateGlobal({ slug: 'site-settings', data: {
  siteName: 'Django School Framework', defaultTitle: 'Django School Framework — основа для сайту школи',
  defaultDescription: 'Створюйте офіційні сайти шкіл із Django School Framework: готові модулі, CLI, API та три стилі інтерфейсу.', language: 'uk',
} })

const data = {
  path: '/', title: 'Django School Framework — основа для сайту школи',
  seoDescription: 'Створюйте офіційні сайти шкіл із Django School Framework: готові модулі, CLI, API та три стилі інтерфейсу.',
  layout: [
    { blockType: 'hero', eyebrow: 'Відкритий фреймворк для освіти', title: 'Основа для сайту школи. Продумана до деталей.', subtitle: 'Зберіть офіційний сайт на Django: готові модулі, API, адмінка й три стартові стилі. Ваш контент і ваші рішення залишаються під вашим контролем.', command: 'pip install django-school-framework', actions: [{ label: 'Встановити пакет ↗', url: pypi }, { label: 'Переглянути код ↗', url: github }] },
    { blockType: 'features', eyebrow: 'Що входить', title: 'Інструменти для сайту, який працює щодня', intro: 'Від першого запуску до наповнення розділів — усе зібрано навколо реальних потреб школи.', items: [
      { number: '01', title: 'Швидкий старт із CLI', description: 'school-admin створює проєкт і допомагає розпочати роботу без порожньої структури.' },
      { number: '02', title: 'Шкільні модулі', description: 'Розділи для документів, вступу, харчування, безпеки, новин, розкладу та галереї.' },
      { number: '03', title: 'API та адмінка', description: 'Django API для власного інтерфейсу й адмінка для керування шкільним вмістом.' },
      { number: '04', title: 'Три стартові стилі', description: 'Обирайте classic, editorial або portal як основу для власного дизайну.' },
      { number: '05', title: 'Аудит відкритості', description: 'Вбудована перевірка допомагає знаходити прогалини у публікації інформації.' },
      { number: '06', title: 'Гнучка основа', description: 'Використовуйте готові можливості та розширюйте сайт під вимоги свого закладу.' },
    ] },
    { blockType: 'steps', eyebrow: 'Як почати', title: 'Від пакета до першої сторінки', items: [
      { title: 'Встановіть пакет', description: 'Додайте Django School Framework у Python-середовище вашого проєкту.', command: 'pip install django-school-framework' },
      { title: 'Створіть проєкт', description: 'Запустіть CLI і оберіть стартову структуру. За потреби додайте шаблон інтерфейсу.', command: 'school-admin startproject my_school' },
      { title: 'Наповніть і налаштуйте', description: 'Додайте шкільну інформацію в адмінці, перевірте відкритість і налаштуйте зовнішній вигляд.' },
    ] },
    { blockType: 'faq', title: 'Часті запитання', items: [
      { question: 'Це готовий сайт конкретної школи?', answer: 'Ні. Це фреймворк, з якого розробник створює сайт для свого закладу та налаштовує його під власні потреби.' },
      { question: 'Чи можна змінювати дизайн?', answer: 'Так. CLI пропонує три стартові стилі — classic, editorial і portal. Інтерфейс можна адаптувати далі.' },
      { question: 'Чи гарантує аудит юридичну відповідність?', answer: 'Ні. Аудит допомагає виявити пропуски, але остаточна відповідність залежить від конкретного сайту, його вмісту та перевірки відповідальними людьми.' },
      { question: 'Чим цей сайт відрізняється від фреймворку?', answer: 'Це інформаційний сайт про продукт. Його редактор в Payload CMS керує вмістом цієї сторінки; сам фреймворк працює на Django.' },
    ] },
    { blockType: 'cta', eyebrow: 'Створюйте на власній основі', title: 'Почніть із готової структури', description: 'Встановіть пакет і дослідіть можливості фреймворку у вихідному коді.', actions: [{ label: 'Перейти до пакета ↗', url: pypi }, { label: 'Відкрити GitHub ↗', url: github }] },
  ],
} as const

const existing = await payload.find({ collection: 'pages', where: { path: { equals: '/' } }, limit: 1, overrideAccess: true })
if (existing.docs[0]) console.log('Головна сторінка вже існує; редакторський вміст збережено.')
else {
  await payload.create({ collection: 'pages', data: { ...data, layout: data.layout as any, _status: 'published' }, overrideAccess: true })
  console.log('Головну сторінку створено.')
}
await payload.db.destroy?.()
