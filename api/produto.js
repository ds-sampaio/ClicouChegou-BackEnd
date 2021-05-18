const moment = require('moment')

module.exports = app => {
    const getProdutos = (req, res) => {
        app.db('produtos')
           .where({ id_loja: req.user.id })
           .then(produtos => res.json(produtos))
           .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.descricao.trim()) {
            return res.status(400).send('Descrição é um campo obrigatorio')
        }
        
        req.body.id_loja  = req.user.id
  
        app.db('produtos')
           .insert(req.body)
           .then(_ => res.status(204).send())
           .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('produtos')
           .where({ id_produtos: req.params.id_produtos, id_loja: req.user.id})
           .del()
           .then(rowsDeleted => {
               if (rowsDeleted > 0) {
                   res.status(204).send()
               } else {
                   const msg = `Não foi encontrado produto com id ${req.parms.id_produtos}.`
                   res.status(400).send(msg)
               }
           }) 
           .catch(err => res.status(400).json(err))          
    }

    const updateProdutoDoneAt = (req, res) => {
        app.db('produtos')
            .where({ id_produtos: req.params.id_produtos, id_loja: req.user.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleProduto = (req, res) => {
        app.db('produtos')
           .where({id_produtos: req.params.id_produtos, id_loja: req.user.id})
           .first()
           .then(produtos => {
               if (!produtos) {
                   const msg = `Protudo com id ${req.params.id_produtos} não encontrada.`
                   return res.status(400).send(msg) 
               }

               const doneAt = produtos.doneAt 
               updateProdutoDoneAt(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    return { getProdutos, save, remove, toggleProduto }

}