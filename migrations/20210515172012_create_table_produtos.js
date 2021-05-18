
exports.up = function(knex, Promise) {
    return knex.schema.createTable('produtos', table => {
        table.increments('id_produtos').primary()
        table.integer('id_loja').notNull().references('id')
              .inTable('loja').notNull
        table.string('descricao').notNull() 
        table.string('imagem').notNull() 
        table.string('preco').notNull()         
        table.string('cod_barras').notNull()      
        
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};
