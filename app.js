// A importação de express, do array de produtos e instanciação do express no app
const express = require('express');

let produtos = require('./produtos');

const app = express();

// Uma rota POST que não funciona, porque não identifica o body, precisa passar pelo express.json()
app.post('/produtos1', (req, res) => {
  const content = req.body;

  const newProducts = [...produtos, content];

  res.status(201).json(newProducts);
})

// independente do método (POST/PUT), vai cair nessa rota que faz a rtadução do body
app.use(express.json());

// Vai pegar e responder com todos os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// Adiciona um produto, esse funciona, pq passou pelo express.json()
app.post('/produtos', (req, res) => {
  const content = req.body;

  produtos = [...produtos, content];

  res.status(201).json(produtos);
})


// Ele pega a informação de um único produto, e os paraâmetro de details é opcional
app.get('/produtos/:id/:details?', (req, res) => {
  const id = Number(req.params.id);

  const details = req.params.details || 'Sem descrição';
  console.log(details);

  const product = produtos.find((produto) => produto.id === id)

  res.status(200).json(product);
})

// PUT faz a atualização de um objeto de acordo com o ID
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

// DELETE deleta o produto de id que seja o igual ao da parametro
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const product = produtos.find((produto) => produto.id === id);

  if (!product) {
    return res.status(400).json({ "message": "Produto não encontrado" })
  }

  produtos = produtos.filter((produto) => produto.id !== id );

  return res.status(200).json(produtos);
})

app.listen(3001, () => {
  console.log('Servidor online');
})