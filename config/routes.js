module.exports = app => {
    app.post('/signup', app.api.loja.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/loja')
       .all(app.config.passport.authenticate())
       .get(app.api.loja.getLoja)
       .put(app.api.loja.atualizaLoja)

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

    app.route('/produtos/:id_produtos')
       .all(app.config.passport.authenticate())
       .get(app.api.produto.getProdutosId)
       
       
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
         
      app.route('/itenspedidos')
         .all(app.config.passport.authenticate())
         .post(app.api.pedidos.getItensPedidos)

      app.route('/pedidostitle')
         .all(app.config.passport.authenticate())
         .get(app.api.pedidos.getpedidosTitle)   
      
      app.route('/vendas')
         .all(app.config.passport.authenticate())
         .get(app.api.pedidos.getvendas)    
      
       //atualiza todos os status do pedido referente ao usuario na data atual   
       app.route('/vendas/:id_usuario') ///toggle
          .all(app.config.passport.authenticate()) 
          .put(app.api.pedidos.updateStatus)  
          
          
      app.route('/retorno')
      .all(app.config.passport.authenticate())
      .get(app.api.pedidos.RetVendas)        
          

       
       
    //Metodos usuarios
    app.route('/usuario')
       .get(app.api.usuario.PesqUsuario)
       .post(app.api.usuario.save)  

    app.route('/usuario/:cpf')       
       .delete(app.api.usuario.remove)   

    app.route('/usuario/:cpf')        
       .put(app.api.usuario.toggleUsuario)         
       
   app.route('/usucpf')        
      .post(app.api.usuario.PesqUsuarioCpf)       
       
    //Metodos configurações do usuario
    app.route('/configuracao')
       .get(app.api.configuracao.PesqConfiguracao)
       .post(app.api.configuracao.toggleSave)  

    app.route('/configuracoes/:id_config')       
       .delete(app.api.configuracao.remove)   

    app.route('/configuracoes/:id_config')        
       .put(app.api.configuracao.toggleConfiguracao) 
       
       
    //Metodos tela home do usuario {produtos,fotos e valores}      
    app.route('/homeusu/:id_usuario')
       .get(app.api.homeusu.PesqHome)   
    //Metodo que trás todas as configurações relativo a 1 usuario especifico
    app.route('/ConfiguracoesUsuario')
       .get(app.api.configuracao.PesqConfiguracaoUsu)  
    
       //metodo confirma pedido
    app.route('/confirmapedido/:id_usuario')
       .put(app.api.homeusu.updatePedidoCompra)  
       
   app.route('/novopedido')
       .post(app.api.homeusu.savepedido)    
   
       //retorna quantidade ja pedida para o produto    
   app.route('/verificacao/:id_usuario')
      .post(app.api.homeusu.versavepedido)       
           
       
       
    //Filtros para front-end usuario   
    app.route('/listproducts')
       .get(app.api.filtros.getListProdutos) 
   
    //pedidos do usuario   
   //  app.route('/listpedidos')
   //     .get(app.api.filtros.getListPedidos)    
    
    //pedidos do usuario   
    app.route('/pedidocompra')
       .post(app.api.filtros.PedidoDeCompra)   
       
       
    //busca ultimo pedido do usuario    
    app.route('/atualizacao/:id_usuario')
       .get(app.api.filtros.getAtualizacao)       
    
     //busca os 20 ultimos pedidos do usuario    
     app.route('/lista/:id_usuario')
        .get(app.api.filtros.getListaPedidos)    

}