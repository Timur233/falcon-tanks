/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')


// проверка на существование файла .env
if (!fs.existsSync('.env')) {
  fs.copyFileSync('.env.sample', '.env')
}

fs.mkdirSync('tmp/pgdata', { recursive: true })
