const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {        
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }
    //payload vem do module auth.js
    const strategy = new Strategy(params, (payload, done) => {
        app.db('loja')
            .where({ id: payload.id })
            .first()
            .then(user => {
                if (user) {
                    done(null, {id: user.id, 
                                email: user.email, 
                                cnpj_cpf: user.cnpj_cpf,
                                razao_social: user.razao_social,
                                logradouro: user.logradouro,
                                bairro: user.bairro,
                                numero: user.numero,
                                status: user.status})
                } else {
                    done(null, false)
                }
            })
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false}),
    }
}