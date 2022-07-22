const express = require('express');

const app = express();

app.get('/produtos', (req, res) => {
  res.send('Que essa é a rota de produtos')
})

app.listen(3001, () => {
  console.log('Servidor online');
})