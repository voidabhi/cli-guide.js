var restify       = require('restify'),
    child_process = require('child_process'),
    fs            = require('fs');

function respond(req, res, next) {
  //req.params.code
  child_process.exec('python hw.py', function (err, stdout, stderr){
      if (err) {
          console.log("child processes failed with error code: " +
              err.code);
      }
      console.log(stdout);
  });
  res.send('EXEC: ' + req.params.code);
  next();
}

function createFile(req, res, next){
  // create a new file
  fs.writeFile(req.body.filename, req.body.content, function(err) {
      if(err) {
        return res.send('ERROR: ' + err);
      } else {
        return res.send("OK");
      }
  });
  next();
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/code/:code', respond);

server.post('/create_file', createFile);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
