import dotenv from 'dotenv'
import path from 'path'
import { Client } from 'pg'

const PATH_TO_ENV_DEV = path.resolve(__dirname, '../../../.env')
const PATH_TO_ENV_PROD = path.resolve(__dirname, '../../.env')

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? PATH_TO_ENV_PROD : PATH_TO_ENV_DEV, // Путь к корневому .env файлу
})

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    return client
  } catch (e) {
    console.error('Database connection error:', e)
    return null
  }
}
