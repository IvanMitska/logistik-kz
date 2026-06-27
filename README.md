# logistics.kaz

Иммерсивный лендинг логистической компании — доставка товаров из Китая
в Казахстан и Россию контейнерами по ЖД с белой растаможкой.

Сайт построен на дизайн-системе студии Sintara (редакционная типографика
PP Neue Montreal + Schibsted Grotesk, expo-out анимации, плавный скролл
Lenis), перенастроенной под строгую деловую логистическую палитру
(графит + стальной синий + грузовой янтарь) с акцентом на скролл-иммерсивность.

## Стек

- **React 19** + **TypeScript** + **Vite**
- **styled-components** — стили и дизайн-токены (`src/styles/theme.ts`)
- **framer-motion** — reveal-анимации, параллакс, горизонтальный pin-скролл
- **lenis** — плавный скролл (desktop), нативный на touch
- **react-router-dom**

## Команды

```bash
npm install      # установка зависимостей
npm run dev      # дев-сервер (http://localhost:5179)
npm run build    # продакшн-сборка в dist/
npm run preview  # предпросмотр сборки
```

## Структура

```
src/
  styles/        дизайн-токены и глобальные стили
  components/    NavBar, Footer, Preloader, SmoothScroll, ui/* (примитивы)
  sections/      Hero, Stats, Manifesto, Services, Advantages, Process, LeadForm
  pages/         Home — сборка секций
  data/content.ts  весь контент и контакты — единый источник правды
  lib/lenis.ts   управление плавным скроллом + якорные переходы
```

## Контент и заявки

Все данные компании, услуги, преимущества и этапы вынесены в
`src/data/content.ts`. Форма заявки (`LeadForm`) собирает имя / телефон /
e-mail / описание груза и открывает почтовый клиент с готовым письмом на
`danilmiheilis@gmail.com` — бэкенд не требуется. Для интеграции с CRM или
Telegram-ботом замените обработчик `onSubmit` на POST-запрос.

## Шрифты

Дисплейный PP Neue Montreal лежит в `public/fonts/` (.woff2). Текстовый
Schibsted Grotesk и JetBrains Mono подключаются через Google Fonts в
`index.html`.
