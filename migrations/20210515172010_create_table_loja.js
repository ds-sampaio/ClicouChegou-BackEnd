
exports.up = function(knex, Promise) {
    return knex.schema.createTable('loja', table => {
        table.increments('id').primary()
        table.string('logradouro').notNull() 
        table.string('bairro').notNull() 
        table.string('numero').notNull() 
        table.string('telefone').notNull()         
        table.string('razao_social').notNull() 
        table.string('status').notNull() 
        table.string('password').notNull() 
        table.string('cnpj_cpf').notNull()    
        table.string('email').notNull()    
        
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('loja')
};
