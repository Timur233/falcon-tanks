/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
