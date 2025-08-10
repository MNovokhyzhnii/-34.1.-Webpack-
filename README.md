# Webpack Starter (optimized)

Індивідуальна збірка Webpack з:
- **contenthash** для файлів (боротьба з кешем),
- підтримкою **локальних шрифтів**,
- роботою із **зображеннями** (asset modules),
- інтеграцією **CSS** (MiniCssExtract + PostCSS/Autoprefixer),
- оптимізацією **зовнішніх бібліотек** — `lodash` винесено у CDN через `externals`, що зменшує розмір бандла.

## Скрипти
```bash
npm run dev     # dev-сервер на http://localhost:5173
npm run build   # продакшн-збірка у dist/
npm run preview # локальний перегляд dist/
```

## Технічні нотатки
- **Кешування**: `filename: [contenthash]`, `splitChunks: { chunks: 'all' }`, `runtimeChunk: 'single'`.
- **Зовнішні бібліотеки**: `externals: { lodash: '_' }` + підключення з CDN у HTML (менший бандл).
- **Шрифти**: поклади свої *.woff2 у `src/assets/fonts` і відредагуй `@font-face` у `src/styles/main.css`.
- **Зображення**: імпортуй у JS/CSS/HTML — Webpack сам вирішить, інлайнити чи винести у файл.

## Як розгорнути
```bash
npm install
npm run dev
```

## Структура
```
src/
  index.html
  index.js
  styles/
    main.css
  assets/
    images/logo.svg
    fonts/Inter-Variable.woff2
```
