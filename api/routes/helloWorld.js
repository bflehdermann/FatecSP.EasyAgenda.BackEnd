module.exports = app => {
    const controller = require('../controllers/helloWorld')();
  
    app.route('/helloWorld')
      .get(controller.return);
  }