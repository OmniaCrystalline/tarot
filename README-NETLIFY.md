<!-- @format -->

# Налаштування для Netlify

## Репозиторій

https://github.com/OmniaCrystalline/tarot

## Крок 1: Додайте змінні середовища

1. Зайдіть в Netlify Dashboard
2. Виберіть ваш сайт
3. Перейдіть в **Site settings** → **Environment variables**
4. Додайте наступні змінні:
   - `OPENROUTER_API_KEY` = `sk-or-v1-ваш-ключ-тут`
   - `SITE_URL` = `https://ваш-домен.netlify.app` (або ваш кастомний домен)

## Крок 2: Деплой

1. Завантажте всі файли на GitHub репозиторій: https://github.com/OmniaCrystalline/tarot
2. Підключіть репозиторій до Netlify
3. Netlify автоматично виявить функції в папці `netlify/functions/`

## Структура файлів:

```
tarot/
├── netlify/
│   └── functions/
│       └── tarot-reading.js  ← Serverless function
├── netlify.toml              ← Конфігурація Netlify
├── index.html
├── script.js
├── styles.css
└── ...
```

## Переваги:

✅ API ключ прихований в змінних середовища Netlify
✅ Не потрібен окремий сервер
✅ Безкоштовний план Netlify включає 125,000 викликів функцій на місяць
✅ Автоматичний деплой з GitHub

## Примітка:

Якщо ви хочете використовувати кастомний URL для API (наприклад `/api/tarot-reading`),
файл `netlify.toml` вже налаштований для цього через redirects.
