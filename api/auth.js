const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

//modulo validador de login

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password){
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('loja')
              .where({ email: req.body.email})
              .first()
        //compara se senha da requisição é igual ao do banco de dados
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }

                const payload = { id: user.id }
                res.json({
                    logradouro: user.logradouro,
                    email: user.email,
                    bairro: user.bairro,
                    numero: user.numero,
                    telefone: user.telefone,
                    status: user.status,
                    razao_social: user.razao_social,
                    cnpj_cpf: user.cnpj_cpf,
                    token: jwt.encode(payload, authSecret),
                }) 

            })
        } else {
            res.status(400).send('Loja não cadastrada!')
        }     
    }

    return { signin }
}