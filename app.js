// A importação de express, do array de produtos e instanciação do express no app
const express = require('express');

const app = express();

const rotaProdutos = require('./routes/routeProdutos')

const rotaUsuarios = require('./routes/routeUsuarios')

// independente do método (POST/PUT), vai cair nessa rota que faz a rtadução do body
app.use(express.json());

app.use('/produtos', rotaProdutos);

app.use('/user', rotaUsuarios);

app.use((req, res, next) => {
  res.status(404).send('Erro 404, not found');

  next();
})

app.listen(3001, () => {
  console.log('Servidor online');
})