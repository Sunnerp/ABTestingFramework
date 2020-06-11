const http = require('http'); //imports the http library
const fileSystem = require('fs')
const url = require("url")
const hostname = 'localhost'; // address name => LewisIsAChode does not work. Assuming it needs an IP or localhost name
const port = 3000; // which port the website is running on

const server = http.createServer((req, response) => {// creates the server
  response.statusCode = 200; // 200 ok is return to show its made a connection
 
   // what is currently being written on the website, end command is the last write command, allows one more write command within the prama.
  var path = req.url;
  path = path.replace('%20', ' ')

  if (path == '/ChodeAPI'){
    response.statusCode = 200;
     
    var apiJson = fileSystem.readFile('./api.json',function(error, data){
      response.end(data);
    });
    return;
  }
  
  if(path == '/')
    path = "/index.html"
  if(path.endsWith('.html')){
    response.setHeader('Content-Type', 'text/html'); // shows what type of file is being used e.g. can be changed to html when serving a html file
  }else if(path.endsWith('.js')){
    response.setHeader('Content-Type', 'application/javascript'); 
  }else if(path.endsWith('.css')){
    response.setHeader('Content-Type', 'text/css'); 
  }else if(path.endsWith('.png')){
    response.setHeader('Content-Type', 'image/png'); 
  }else if(path.endsWith('.jpg')||path.endsWith('.jpeg') ){
    response.setHeader('Content-Type', 'image/jpeg'); 
  }else if(path.endsWith('.woff')){
    response.setHeader('Content-Type', 'font/woff'); 
  }else if(path.endsWith('.woff2')){
    response.setHeader('Content-Type', 'font/woff2 '); 
  }else if(path.endsWith('.ttf')){
    response.setHeader('Content-Type', 'font/ttf'); 
  }else if(path.endsWith('.json')){
    response.setHeader('Content-Type', 'application/json'); 
  }
  else{
    response.statusCode = 404;
    response.end('Unkown format ' + path.split('.')[1]);
  }
   fileSystem.readFile('./Vision Website'+path, null , function(error,data){
    if(error){
      response.statusCode = 404;
      response.end('File Not Found!');
    }else if(data){
      response.end(data);
    }
  });
});

server.listen(port, hostname, () => { 
  console.log(`Server running at http://${hostname}:${port}/`);
})
