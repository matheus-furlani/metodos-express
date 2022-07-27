const express = require('express');

const routes = express.Router();

let produtos = require('../produtos');

// Uma rota POST que não funciona, porque não identifica o body, precisa passar pelo express.json()
routes.post('/produtos1', (req, res) => {
  const content = req.body;

  const newProducts = [...produtos, content];

  res.status(201).json(newProducts);
})

// Vai pegar e responder com todos os produtos
routes.get('/', (req, res) => {
  res.status(200).json(produtos);
});

routes.get('/name', (req, res) => {
  const { name, marca } = req.query;
  console.log(req.query);
  res.status(200).json({ product: {nome: name, marca} });
});

function validatePrice (req, res, next) {
  const { price } = req.body;

  if (price && price >= 0) {
    next();
  }

  return res.status(400).send('Produto com preço invalido')
}

function createUser(req, res, next) {
  res.locals.user = {
    nome: 'Matheus',
    admin: false
  }

  next();
  // res = {
  //   prop: 1
  //   nome:
  //   local: {
  //     user:
  //   }
  // }
}

function authUser ( req, res, next) {
  const { user } = res.locals;
  console.log(res.locals);
  if(user.admin) {
    next()
  }

  return res.status(403).send('Usuario não é admin')
}

// Adiciona um produto, esse funciona, pq passou pelo express.json()
routes.post('/', createUser, authUser, (req, res) => {
  const content = req.body;

  produtos = [...produtos, content];

  return res.status(201).json(produtos);
})


// Ele pega a informação de um único produto, e os paraâmetro de details é opcional
routes.get('/:id/:details?', (req, res) => {
  const id = Number(req.params.id);

  const details = req.params.details || 'Sem descrição';
  console.log(details);

  const product = produtos.find((produto) => produto.id === id)

  res.status(200).json(product);
})

// PUT faz a atualização de um objeto de acordo com o ID
routes.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const content = req.body;

  const product = produtos.find((produto) => produto.id === id);

  if (!product) {
    return res.status(400).json({ "message": "Produto não encontrado" })
  }

  const produtoAtualizado = produtos.map((produto) => {
    if (produto.id === id) return content;

    return produto;
  })

  produtos = produtoAtualizado;

  res.status(200).json(produtos);
})

// DELETE deleta o produto de id que seja o igual ao da parametro
routes.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const product = produtos.find((produto) => produto.id === id);

  if (!product) {
    return res.status(400).json({ "message": "Produto não encontrado" })
  }

  produtos = produtos.filter((produto) => produto.id !== id );

  return res.status(200).json(produtos);
})

module.exports = routes;