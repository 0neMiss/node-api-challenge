const express = require('express');
const projectRouter = require('./Projects/projectRouter.js');
const actionRouter = require('./Actions/actionRouter.js');
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>initial get</h2>`);
});
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


//custom middleware
server.use(logger);
function logger(req, res, next) {
  console.log(`method: ${req.method}, url: ${req.url}, timestamp:${Date.now()}`);
  next();
}

module.exports = server;
