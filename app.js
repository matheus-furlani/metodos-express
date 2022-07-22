const express = require('express');

let produtos = require('./produtos');

const app = express();

app.post('/produtos1', (req, res) => {
  const content = req.body;

  const newProducts = [...produtos, content];

  res.status(201).json(newProducts);
})

app.use(express.json());

app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

app.post('/produtos', (req, res) => {
  const content = req.body;

  produtos = [...produtos, content];

  res.status(201).json(produtos);
})

app.get('/produtos/:id/:details?/:nome', (req, res) => {
  const id = Number(req.params.id);

  const details = req.params.details || 'Sem descrição';
  console.log(details);

  const nome = req.params.nome;
  console.log(nome)

  const product = produtos.find((produto) => produto.id === id)

  res.status(200).json(product);
})

app.put('/produtos/:id', (req, res) => {
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

app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const product = produtos.find((produto) => produto.id === id);

  if (!product) {
    return res.status(400).json({ "message": "Produto não encontrado" })
  }

  produtos = produtos.filter((produto) => produto.id !== id );

  res.status(200).json(produtos);
})

app.listen(3001, () => {
  console.log('Servidor online');
})