const express = require('express');
const app = express();
const port = 3333;

app.use(express.static('public'));

app.get('/', (request,response) => {
  response.render('index.html');
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})