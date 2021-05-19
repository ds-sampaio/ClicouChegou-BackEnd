const moment = require('moment')

module.exports = app => {
    const getConfiguracao = (req, res) => {
            app.db('configuracoes')
            .where({ id_config: req.body.id_config, id_usuario: req.body.id_usuario })
            .then(configuracoes => res.json(configuracoes))
            .catch(err => res.status(400).json(err))              
           
    }

    const PesqConfiguracao = (req, res) => {
        app.db('configuracoes')
           .where({id_config: req.body.id_config, id_usuario: req.body.id_usuario })
           .first()
           .then(configuracoes => {
               if (!configuracoes) {
                   const msg = `Configuracoes com id ${req.body.id_config} não encontrada.`
                   return res.status(400).send(msg) 
               }
               getConfiguracao(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.id_loja) {
            return res.status(400).send('Loja é um campo obrigatorio')
        }
        if (!req.body.id_produtos) {
            return res.status(400).send('Produto é um campo obrigatorio')
        }
        if (!req.body.id_usuario) {
            return res.status(400).send('É necessário que o usuario esteja cadastrado ')
        }
        
        app.db('produtos')
           .where({id_produtos: req.body.id_produtos, id_loja: req.body.id_loja})
           .first()
           .then(configuracoes => {
               if (!configuracoes) {
                   const msg = `Produto com id ${req.body.id_produtos} não encontrado.`
                   return res.status(400).send(msg) 
               }            
           })

           app.db('usuario')
           .where({id_usuario: req.body.id_usuario})
           .first()
           .then(usuario => {
               if (!usuario) {
                   const msg = `Usuario com id ${req.body.id_usuario} não encontrado.`
                   return res.status(400).send(msg) 
               }            
           })   
        

            app.db('configuracoes')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }


    const remove = (req, res) => {
        app.db('configuracoes')
           .where({id_config:  req.params.id_config,id_usuario: req.body.id_usuario})
           .del()
           .then(rowsDeleted => {
               if (rowsDeleted > 0) {
                   res.status(204).send()
               } else {
                   const msg = `Não foi encontrado configuração do produto com id ${req.parms.id_config}.`
                   res.status(400).send(msg)
               }
           }) 
           .catch(err => res.status(400).json(err))          
    }

    const updateConfiguracoesDoneAt = (req, res) => {
        app.db('configuracoes')
            .where({ id_config: req.params.id_config,id_usuario: req.body.id_usuario})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleConfiguracao = (req, res) => {
        app.db('configuracoes')
           .where({id_config: req.params.id_config,id_usuario: req.body.id_usuario})
           .first()
           .then(configuracoes => {
               if (!configuracoes) {
                   const msg = `Configuracao com id ${req.params.id_config} não encontrada.`
                   return res.status(400).send(msg) 
               }

               updateConfiguracoesDoneAt(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    return { PesqConfiguracao, save, remove, toggleConfiguracao }

}