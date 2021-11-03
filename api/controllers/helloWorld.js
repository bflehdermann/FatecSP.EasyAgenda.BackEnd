module.exports = () => {
    
    const controller = {};
  
    controller.return = (req, res) => res.status(200).json('Hello World!');
  
    return controller;
  }