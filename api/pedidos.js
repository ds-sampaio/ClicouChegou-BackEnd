const moment = require('moment')

module.exports = app => {
    const getPedidos = (req, res) => {
        app.db('pedidos')
           .where({ id_loja: req.user.id })
           .then(pedidos => res.json(pedidos))
           .catch(err => res.status(400).json(err))
    }
     
    const getItensPedidos = (req, res) => {
        let now = new Date();
        let todayMonth;
        if (now.getMonth() < 10) {
            todayMonth = '0' + (now.getMonth() + 1);
        } else {
            todayMonth =  (now.getMonth() + 1);
        }
        let data =  now.getFullYear() + "-" + todayMonth + "-" +  now.getDate() 
        // console.log(todayMonth)
        app.db('pedidos')
           .innerJoin('produtos', 'pedidos.id_produtos', '=', 'produtos.id_produtos') 
           .where({ 'pedidos.id_loja': req.user.id, 
                    'pedidos.id_cliente': req.body.id_usuario, 
                    'pedidos.fechou' : req.body.fechou, 
                    'pedidos.confirmacao' : true,
                    'pedidos.datapedido': data})
           .then(pedidos => res.json(pedidos))
           .catch(err => res.status(400).json(err))
    } 
   

    const save = (req, res) => {
        if (!req.body.id_produtos) {
            return res.status(400).send('Produto é um campo obrigatorio')
        }
        
        req.body.id_loja  = req.user.id
        
        // const produtos = req.body.produtos
        
        // const Listproduto = produtos.map(item => {
        //     return item
        // })
        // console.log(Listproduto)
  
        app.db('pedidos')
           .insert(req.body)
           .then(_ => res.status(204).send())
           .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('pedidos')
           .where({ id_pedido: req.params.id_pedido, id_loja: req.user.id})
           .del()
           .then(rowsDeleted => {
               if (rowsDeleted > 0) {
                   res.status(204).send()
               } else {
                   const msg = `Não foi encontrado pedidos com id ${req.parms.id_pedido}.`
                   res.status(400).send(msg)
               }
           }) 
           .catch(err => res.status(400).json(err))          
    }

    const updatePedidosDoneAt = (req, res) => {        
        app.db('pedidos')
            .where({ id_pedido: req.params.id_pedido, id_loja: req.user.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const togglePedidos = (req, res) => {
        console.log(req.body)
        app.db('pedidos')
           .where({id_pedido: req.params.id_pedido, id_loja: req.user.id})
           .first()
           .then(pedidos => {
               if (!pedidos) {
                   const msg = `Pedido com id ${req.params.id_pedido} não encontrada.`
                   return res.status(400).send(msg) 
               }

               const doneAt = pedidos.doneAt 
               updatePedidosDoneAt(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }


    const getpedidosloja = (req, res) => {       
        app.db('pedidos')
               .innerJoin('produtos', 'pedidos.id_produtos', '=', 'produtos.id_produtos') 
               .innerJoin('usuario', 'usuario.id_usuario', '=', 'pedidos.id_cliente') 
               .where({ 'pedidos.id_loja': req.user.id })
               .then(pedidos => res.json(pedidos))
               .catch(err => res.status(400).json(err))     }  
   
    //não esta funcionando           
    const getpedidosTitle = (req, res) => {       
        app.db('pedidos')
           .select('id_loja','id_cliente')  
           .max({ id_pedido: 'id_pedido', 
                id_produtos: 'id_produtos', datapedido : 'datapedido', 
                doneat : 'doneat', descricao: 'descricao'})                              
                .innerJoin('produtos', 'pedidos.id_produtos', '=', 'produtos.id_produtos') 
                .innerJoin('usuario', 'usuario.id_usuario', '=', 'pedidos.id_cliente') 
                .groupBy('pedidos.id_cliente')
                .where({ 'pedidos.id_loja': req.user.id })
                .then(pedidos => res.json(pedidos))
                .catch(err => res.status(400).json(err))     }  
                
                

    const getvendas = (req, res) => {       
        app.db('vendas')
                .innerJoin('produtos', 'vendas.id_produtos', '=', 'produtos.id_produtos') 
                .innerJoin('usuario', 'usuario.id_usuario', '=', 'vendas.id_cliente') 
                .where({ 'vendas.id_loja': req.user.id })
                .then(pedidos => res.json(pedidos))
                .catch(err => res.status(400).json(err))     }  

    const RetVendas = (req, res) => {       
        app.db('retornos')
                .where({ 'retornos.id_loja': req.user.id })
                .limit(30)
                .then(pedidos => res.json(pedidos))
                .catch(err => res.status(400).json(err))     }  
                        



    const updateStatus = (req, res) => {                
        let now = new Date();
        let todayMonth;
        if (now.getMonth() < 10) {
            todayMonth = '0' + (now.getMonth() + 1);
        } else {
            todayMonth =  (now.getMonth() + 1);
        }
        let data =  now.getFullYear() + "-" + todayMonth + "-" +  now.getDate() 
        app.db('pedidos')
            .where({ id_cliente: req.params.id_usuario, id_loja: req.user.id,
                    'fechou' : false, 
                    'confirmacao' : true,
                    'datapedido': data})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }            
                           

    return { getPedidos, save, remove, togglePedidos,getpedidosloja, getItensPedidos,getpedidosTitle,getvendas,updateStatus, RetVendas }

}