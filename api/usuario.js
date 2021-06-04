const moment = require('moment')

module.exports = app => {
    const getUsuario = (req, res) => {
            app.db('usuario')
            .where({ id_usuario: req.body.id_usuario })
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))              
           
    }

    const PesqUsuario = (req, res) => {
        app.db('usuario')
           .where({id_usuario: req.body.id_usuario})
           .first()
           .then(usuario => {
               if (!usuario) {
                   const msg = `Usuario com id ${req.body.id_usuario} não encontrada.`
                   return res.status(400).send(msg) 
               }

               getUsuario(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    const getUsuCpf = (req, res) => {
        app.db('usuario')
        .where({ cpf: req.body.cpf})
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json(err))              
       
}

    const PesqUsuarioCpf = (req, res) => {
        app.db('usuario')
           .where({cpf: req.body.cpf})
           .first()
           .then(usuario => {
               if (!usuario) {
                   const msg = `Usuario com id ${req.body.cpf} não encontrada.`
                   return res.status(400).send(msg) 
               }

               getUsuCpf(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatorio')
        }
        if (!req.body.cpf.trim()) {
            return res.status(400).send('CPF é um campo obrigatorio')
        }
        if (!req.body.tel_cuidador) {
            return res.status(400).send('Telefone do cuidador é um campo obrigatorio')
        }
        
        console.log(req.body)
        app.db('usuario')
           .insert(req.body)
           .then(_ => res.status(204).send())
           .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('usuario')
           .where({id_usuario:  req.params.id_usuario})
           .del()
           .then(rowsDeleted => {
               if (rowsDeleted > 0) {
                   res.status(204).send()
               } else {
                   const msg = `Não foi encontrado usuario com id ${req.parms.id_usuario}.`
                   res.status(400).send(msg)
               }
           }) 
           .catch(err => res.status(400).json(err))          
    }

    const updateUsuarioDoneAt = (req, res) => {
        app.db('usuario')
            .where({ id_usuario: req.params.id_usuario})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleUsuario = (req, res) => {
        app.db('usuario')
           .where({id_usuario: req.params.id_usuario})
           .first()
           .then(usuario => {
               if (!usuario) {
                   const msg = `Usuario com id ${req.params.id_usuario} não encontrada.`
                   return res.status(400).send(msg) 
               }

               const doneAt = usuario.doneAt 
               updateUsuarioDoneAt(req, res, req.body)
           })
           .catch(err => res.status(400).json(err))
    }

    return { PesqUsuario, save, remove, toggleUsuario, PesqUsuarioCpf }

}