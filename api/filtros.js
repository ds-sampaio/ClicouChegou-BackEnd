const moment = require('moment')

module.exports = app => {
    const getListProdutos = (req, res) => {
        app.db('produtos')     
           .then(produtos => res.json(produtos))
           .catch(err => res.status(400).json(err))
    }
    

    const getListPedidos = (req, res) => {
        app.db('pedidos')
           .where({ id_cliente: req.body.id_usuario }) 
           .then(pedidos => res.json(pedidos))
           .catch(err => res.status(400).json(err))
    }

    const PedidoDeCompra = (req, res) => {
        if (!req.body.id_produtos) {
            return res.status(400).send('Pedido é um campo obrigatorio')
        }    
        
        app.db('produtos')
        .where({id_produtos: req.body.id_produtos, id_loja: req.body.id_loja})
        .first()
        .then(produtos => {
            if (!produtos) {
                const msg = `Produto com id ${req.body.id_produtos} não encontrado.`
                return res.status(400).send(msg) 
            } else {
                app.db('pedidos')
                   .insert(req.body)
                   .then(_ => res.status(204).send())
                   .catch(err => res.status(400).json(err))      
            }           
        })    

  
        
    }

    
    return { getListProdutos, getListPedidos, PedidoDeCompra }

}