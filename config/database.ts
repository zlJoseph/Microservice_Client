import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const connectCloud = (Env.get('NODE_ENV') !== 'production')?{ host: Env.get('MYSQL_HOST'), port: Env.get('MYSQL_PORT')}:{socketPath: Env.get('MYSQL_HOST')}

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),
  connections: {
    mysql: {
      client: 'mysql2',
      connection: { ...connectCloud,
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
