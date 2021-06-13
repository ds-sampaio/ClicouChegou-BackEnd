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
    
    //metodo para confirmar pedido
    const updatePedidoCompra = (req, res) => {                
        let now = new Date();
        let todayMonth;
        if (now.getMonth() < 10) {
            todayMonth = '0' + (now.getMonth() + 1);
        } else {
            todayMonth =  (now.getMonth() + 1);
        }
        let data =  now.getFullYear() + "-" + todayMonth + "-" +  now.getDate() 
        app.db('pedidos')
            .where({ id_cliente: req.params.id_usuario, //id_loja: req.body.id_loja,
                    'fechou' : false, 
                    'confirmacao' : false,
                    'datapedido': data})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
 
    //metodo para  inserir pedido
    const savepedido = (req, res) => {
        if (!req.body.id_produtos) {
            return res.status(400).send('Produto é um campo obrigatorio')
        }
        app.db('pedidos')
           .insert(req.body)
           .then(_ => res.status(204).send())
           .catch(err => res.status(400).json(err))
    }

    return { PesqHome ,updatePedidoCompra,savepedido}

}