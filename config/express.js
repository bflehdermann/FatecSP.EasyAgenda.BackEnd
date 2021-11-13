require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')

const{status} = require('../api/presenters/http')
const language = require('../api/middlewares/language')
const error = require('../api/middlewares/error')

const medicoRouter = require('../api/routes/medico')
const loginRouter = require('../api/routes/login')
const pacienteRouter = require('../api/routes/paciente')
const especialidadeRouter = require('../api/routes/especialidades')

const horariosRouter = require('../api/routes/horarios')

module.exports = () => {
  const app = express();
  app.use(bodyParser.json())

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 3000);

  app.use(language())
  app.use(error())

  require('../api/routes/helloWorld')(app)

  app.use('/api', medicoRouter)
  app.use('/api', loginRouter)
  app.use('/api', pacienteRouter)
  app.use('/api', especialidadeRouter)
  app.use('/api', horariosRouter)

  app.disable('x-powered-by')

app.use((_, res) => {
    res._rt_send_error(status.NOT_FOUND, 'NOT_FOUND')
})

  return app;
};