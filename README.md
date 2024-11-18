# Tank Wars

---

Легендарные танчики в стилистике Денди 90х

---

### При разработке были использованы следующие технологии:

- Vite
- React
- React Router
- Redux
- Typescript
- Axios
- SCSS
- ServiceWorkers

---

### Макет в [Figma](https://www.figma.com/design/eMv3lcr1Qd6j2XU3CQdZ7V/Untitled?node-id=510-62&node-type=frame&t=i29DLi5WkY4HXDji-0)
### [Документация](docs/README.md) к игре
### [Видео](https://disk.yandex.ru/i/8F2TLSE8j5IdTg)

---

### Установка

#### Перед первым запуском необходимо создать файл `.env` в корне проекта со следующим содержимым:

```
CLIENT_PORT=3000
SERVER_PORT=3001
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432

TRAEFIK_NETWORK_NAME=traefik_traefik
DOCKER_BUILDKIT=1 #Build only stages required for target
COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml
VITE_AUTH_URL='https://ya-praktikum.tech/api/v2'
VITE_SRC_URL='https://ya-praktikum.tech/api/v2/resources'
VITE_AUTH_PATHNAMES='/sign-in, /sign-up'
```
 
(также актульное содержимое файла `.env` всегда можно найти в корне проекта в файле `.env.sample`)

#### Для установки нужно выполнить следующие действия:

1. Склонировать данный репозиторий (git clone *ссылка на репозиторий*)
2. Убедитесь что у вас установлен `node`
3. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
4. Выполните команду `yarn install`
5. Выполните команду `yarn run dev` - для запуска режима разработки

#### Дополнительные команды:

- `yarn run lint` - Проверка типов и линтиг всего проекта
- `yarn run format` - Автоматическое форматирование

---

### Для работы с docker compose

1. Скопировать .env.sample в .env
2. Для просмотра в режиме prod = 
  .env -> 
  COMPOSE_FILE=docker-compose.yml ->
    terminal ->
      `docker compose build` -> 
      `docker compose up -d`
      Развернется проект на порте ${SERVER_PORT}
3. Для разработки в режиме dev =
  .env ->
  COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml ->
    terminal ->
      `docker compose build` ->
      `docker compose up -d`
      Развернется проект на порте ${SERVER_PORT} - будет работать nodemon с прослушкой файлов сервера и vite с прослушкой hmr
4. При работе с traefik добавить в /etc/hosts - 127.0.0.1 tanks.docker
5. Размонтировать docker compose down --remove-orphans

При разворачивании локально установить переменную POSTGRES_HOST - localhost/127.0.0.1, тк при работе в docker необходимо обращаться внутри контейнеров по имени сервисов.
