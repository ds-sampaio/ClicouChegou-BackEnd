const moment = require('moment')

module.exports = app => {
    const getPedidos = (req, res) => {
        app.db('pedidos')
           .where({ id_loja: req.user.id })
           .then(pedidos => res.json(pedidos))
           .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.id_produtos) {
            return res.status(400).send('Pedido é um campo obrigatorio')
        }
        
        req.body.id_loja  = req.user.id
  
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

    return { getPedidos, save, remove, togglePedidos,getpedidosloja }

}