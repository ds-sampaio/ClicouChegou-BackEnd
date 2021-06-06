const moment = require('moment')

module.exports = app => {
    
    const getHome = (req, res) => {
        app.db('configuracoes')
        .innerJoin('produtos', 'configuracoes.id_produtos', '=', 'produtos.id_produtos') 
        .where({id_usuario:  req.params.id_usuario})                                 
        .then(configuracoes => res.json(configuracoes))
        .catch(err => res.status(400).json(err))              
       
    }   
     const PesqHome = (req, res) => {
         app.db('configuracoes')
            .where({id_usuario: req.params.id_usuario })
            .first()
            .then(configuracoes => {
                if (!configuracoes) {
                    const msg = `Configuracoes com id ${req.params.id_usuario} não encontrada.`
                    return res.status(400).send(msg) 
                }
                 getHome(req, res, req.body)
            })
            .catch(err => res.status(400).json(err))
    }

    return { PesqHome }

}