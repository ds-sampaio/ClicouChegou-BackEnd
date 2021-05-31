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
  
      app.route('/pedidoloja')
         .all(app.config.passport.authenticate())
         .get(app.api.pedidos.getpedidosloja)     
       
       
    //Metodos usuarios
    app.route('/usuario')
       .get(app.api.usuario.PesqUsuario)
       .post(app.api.usuario.save)  

    app.route('/usuario/:id_usuario')       
       .delete(app.api.usuario.remove)   

    app.route('/usuario/:id_usuario')        
       .put(app.api.usuario.toggleUsuario)    
       
    //Metodos configurações do usuario
    app.route('/configuracao')
       .get(app.api.configuracao.PesqConfiguracao)
       .post(app.api.configuracao.save)  

    app.route('/configuracoes/:id_config')       
       .delete(app.api.configuracao.remove)   

    app.route('/configuracoes/:id_config')        
       .put(app.api.configuracao.toggleConfiguracao) 
       
    //Metodos tela home do usuario {produtos,fotos e valores}      
    app.route('/homeusu')
       .get(app.api.homeusu.PesqHome)   
       
       
    //Filtros para front-end usuario   
    app.route('/listproducts')
       .get(app.api.filtros.getListProdutos) 
   
    //pedidos do usuario   
    app.route('/listpedidos')
       .get(app.api.filtros.getListPedidos)    
    
    //pedidos do usuario   
    app.route('/pedidocompra')
       .post(app.api.filtros.PedidoDeCompra)     
          


}