# Frontend часть прокта

Данный проект предназначен для решения кейса
**Часть корпоративного портала для предприятия закрытого
типа** от Вебпрактик

## Демо

### Демонстранция доступна на [https://hack.milkhunters.ru/](https://hack.milkhunters.ru/)

*Реквизиты для входу можно [посмотреть здесь](https://github.com/milkhunters/backend-hackathon-2023-1#%D0%B4%D0%B5%D0%BC%D0%BE)*

## Backend

Реализацию backend части можно найти в первом репозитории.

Взаимодействие между фронтом и бэком происходит по REST API.

## Запуск

Для запуска необходим запущенное приложение бэкенда.

Необходимо будет отредактировать адрес бэкенда в файле
`/src/lib/api/api.js`

### Локально

#### Установка зависимостей 

```shell
npm install
```

#### Запуск Dev

```shell
npm run dev
```

#### Сборка для прода

```shell
npm run build
```

### Докер

#### Build

```shell
docker build -t milk-front .
```

#### Запуск

```shell
docker run -p 9000:80 milk-front
```

## Архитектура и технологии

- [Vue.js](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- Голый CSS
