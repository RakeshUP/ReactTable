const formidable = require('formidable');
const http = require('http');
const fs = require('fs');
const { serveStaticFiles } = require('./serveStaticFiles');

const PORT = 80;

const requestListener = async (request, response) => {
  if (request.method === 'GET') {
    serveStaticFiles(request, response);

  } else if (request.method === 'POST') {
    console.log('POST', request.url);

    const form = new formidable.IncomingForm();

    form.parse(request, function (err, fields, files) {
      if (err) {
        console.error(err.message);
        return;
      }
      fs.readFile(files.file.path, function (err, data) {
        response.end(data);
      });
    });
  } else {
    response.end();
  }
};

const server = http.createServer(requestListener);

server.on('listening', () => {
  console.log(`Server started in port ${PORT}`);
});

server.on('error', ex => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
});

server.listen(PORT);
