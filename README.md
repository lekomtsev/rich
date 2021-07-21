
# Изучение JS в рамках Летней Кухни (Picom)

## Как запустить
  - Убедиться что установлен node.js (node -v) (https://nodejs.org/en/)
  - npm install
  - npm run start
  - npm run build (подробнее package.json)

## Проделанная работа
  1. Создали виджет валют
  2. Подгрузка изображений по кнопке Загрузить еще
  3. Создание мини плагина для вывода Модального окна

[Ссылка на работающий проект](https://jsmaster.ru/picom/summer21/js/)

## Структура проекта

```shell
rich/
├── assets/                 # 
│   ├── fonts/              # шрифты
│   ├── html/               # шаблоны HTML файлов
│   │  ├── partials/        # части HTML кода
│   │  │  └── [...]
│   │  ├── 404.html         # 404
│   │  └── index.html       # главная страница
│   │  └── detail.html      # страница детального просмотра (скелет)
│   ├── images/             # изображения
│   │  └── [...]
│   ├── scripts/            # javascript файлы
│   │  ├── helpers/         # вспомогательные скрипты
│   │  ├── pages/           # скрипты для отдельных страниц
│   │  ├── vendor/          # библиотеки и внешние файлы
│   │  │  └── [...]         # Bootstrap, FontAwesome, jQuery
│   │  └── main.js          # точка входа для JS
│   ├── scss/               # стили
│   │  ├── base             # базовые стили
│   │  ├── components       # стили для компонентов
│   │  ├── [...]            # и тд
│   │  └── main.scss        # точка входа для стилей
│   ├── index.js            # точка входа для все проекта
│   └── [...]               # и тд
├── dist/                   # готовый проект
├── node_modules/           # пакеты Node.js (не редактируем!)
│   └── [...]
├── .babelrc                # конфиг Babel
├── .eslintrc.js            # конфиг ESLint
├── .stylelintrc            # конфиг Stylelintrc
├── package.json            # скрипты и зависимости Node.js
├── webpack.config.js       # конфиг Webpack
├── package-lock.json       # зависимотси Node.js
└── [...]                   # other...
```
