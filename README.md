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

### Для работы с докером

1. Скопировать .env.sample в .env
2. Проверить режим сборки сервиса client (preview, init, dev)
3. Установить зависимости docker compose build
4. Смонтировать контейнер docker compose up -d, приложение будет доступно по порту сервера env.SERVER_PORT
5. Размонтировать docker compose down --remove-orphans
6. Для работы с traefik добавить в .env `COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml`
