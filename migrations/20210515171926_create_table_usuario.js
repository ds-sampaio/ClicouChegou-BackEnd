
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuario', table => {
      table.increments('id_usuario').primary()
      table.string('nome_cuidador').notNull()
      table.string('tel_cuidador').notNull() 
      table.string('cpf_cuidador').notNull()
      table.string('email_cuidador').notNull() 
      table.string('nome').notNull() 
      table.string('cpf').notNull() 
      table.string('logradouro').notNull() 
      table.string('bairro').notNull() 
      table.string('numero').notNull() 
      table.integer('forma_pagamento').notNull() 
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario')
};
