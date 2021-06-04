const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            console.log(req.body)
            app.db('loja')
                .insert({ 
                    logradouro: req.body.logradouro,
                    bairro : req.body.bairro,
                    numero : req.body.numero,
                    telefone : req.body.telefone,
                    razao_social : req.body.razao_social,
                    status  : req.body.status, 
                    password ,
                    cnpj_cpf  : req.body.cnpj_cpf, 
                    email: req.body.email.toLowerCase(), 
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    const getLoja = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            app.db('loja')
            .where({id: req.user.id})
            .then(loja => res.json(loja))
            .catch(err => res.status(400).json(err))
        })
    }
    
    const atualizaLoja = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            console.log(req.user.id)
            app.db('loja')
            .where({id: req.user.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
        })
    }
   


    return { save ,getLoja, atualizaLoja}
}