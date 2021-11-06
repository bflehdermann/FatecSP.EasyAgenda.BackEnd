require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')

const userRoutes = require('../api/routes/user')

module.exports = () => {
  const app = express();
  app.use(bodyParser.json())

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 3000);

  require('../api/routes/helloWorld')(app)

  app.use('/api', userRoutes)

  return app;
};