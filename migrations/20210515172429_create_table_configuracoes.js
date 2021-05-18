
exports.up = function(knex, Promise) {
    return knex.schema.createTable('configuracoes', table => {
        table.increments('id_config').primary()
        table.integer('id_protudos').notNull().references('id_produtos')
              .inTable('produtos').notNull     
        table.integer('id_usuario').notNull().references('id_usuario')
              .inTable('usuario').notNull     
        table.integer('id_loja').notNull().references('id')
              .inTable('loja').notNull     
        
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
