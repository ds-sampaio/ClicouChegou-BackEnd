module.exports = app => {
    app.post('/signup', app.api.loja.save)
    app.post('/signin', app.api.auth.signin)


    app.route('/produtos')
       .all(app.config.passport.authenticate())
       .get(app.api.produto.getProdutos)
       .post(app.api.produto.save)

    app.route('/produtos/:id_produtos')
       .all(app.config.passport.authenticate()) 
       .delete(app.api.produto.remove)

    app.route('/produtos/:id_produtos') ///toggle
       .all(app.config.passport.authenticate()) 
       .put(app.api.produto.toggleProduto)  
       
       
   //Metodos pedidos {lado da empresa}
   
   app.route('/pedidos')
       .all(app.config.passport.authenticate())
       .get(app.api.pedidos.getPedidos)
       .post(app.api.pedidos.save)

    app.route('/pedidos/:id_pedido')
       .all(app.config.passport.authenticate()) 
       .delete(app.api.pedidos.remove)

    app.route('/pedidos/:id_pedido') ///toggle
       .all(app.config.passport.authenticate()) 
       .put(app.api.pedidos.togglePedidos)     


}