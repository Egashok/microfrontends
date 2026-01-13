# Microfrontends (single-spa)

Небольшой демо‑проект микрофронтендов на single-spa: Angular и React живут на
одной странице и разделяют общий store.

## Быстрый старт

1. Установить зависимости:
   `npm install`
   или
   `yarn`
2. Запустить dev-сервер:
   `npm start`
   или
   `yarn start`
3. Открыть: `http://localhost:3000`

## Скрипты

-   `npm start` / `yarn start` — webpack-dev-server (development).
-   `npm run build` / `yarn build` — production сборка.
-   `npm run build:debug` / `yarn build:debug` — development сборка.

## Структура проекта

-   `src/main.js` — регистрация microfrontends в single-spa.
-   `src/store/index.js` — простой общий store для обоих приложений.
-   `src/react/` — React microfrontend (TSX).
-   `src/angular/` — Angular microfrontend (TS).
-   `src/index.html` — контейнеры `#react` и `#angular`.

## Общий store

Store доступен в `window.store`:

-   `count` — общий счетчик кликов.
-   `language` — выбранный язык.
-   `increment()` — увеличить счетчик.
-   `setLanguage(code)` — сменить язык.
-   `subscribe(fn)` — подписка с возвратом функции отписки.

Каждый микрофронтенд подписывается и синхронизируется через `subscribe()`.

## Почему в консоли нет ругани от Babel

Добавлен `babel.config.js` с пресетами для JS/TS/TSX. Это устраняет предупреждения
о конфигурации Babel при сборке.

## Подсказки

-   Если вы удалите контейнеры `#react` или `#angular` из `src/index.html`,
    микрофронтенды создадут их автоматически.
