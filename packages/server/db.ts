import { Client } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    /**
     * This we will communicate with db
     * for Example
     * const res = await client.query('SELECT NOW()')
     */

    await client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}
