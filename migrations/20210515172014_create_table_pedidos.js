
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pedidos', table => {
        table.increments('id_pedido').primary()
        table.integer('id_loja').notNull().references('id')
             .inTable('loja').notNull()
        table.integer('id_cliente').notNull().references('id_usuario')
             .inTable('usuario').notNull  
        table.integer('id_produtos').notNull().references('id_produtos')
             .inTable('produtos').notNull
        table.string('status').notNull() 
        table.datetime('datapedido').notNull() 
         
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('pedidos')
};
