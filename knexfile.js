// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: '123456',
      searchPath: ['knex', 'public']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 

};
