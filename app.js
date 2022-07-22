const express = require('express');

const produtos = require('./produtos');

const app = express();

app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

app.get('/produtos/:id/:details?/:nome', (req, res) => {
  const id = Number(req.params.id);

  const details = req.params.details || 'Sem descrição';
  console.log(details);

  const nome = req.params.nome;
  console.log(nome)

  const product = produtos.find((produto) => produto.id === id)

  res.status(200).json(product);
})

app.listen(3001, () => {
  console.log('Servidor online');
})