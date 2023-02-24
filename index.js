/**********************
 * Title: Protfolio Website
 * Description: Personal Portfolio Website
 * Author: A. S. M. Sohag Abdullah
 * Date: 23rd Feb, 2023
 **********************/

//Dependecies
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');
const mailto = require('./mailto');


//Creating Server
const server = http.createServer((req, res) => {

  let parsedURL = url.parse(req.url, true);

  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  
  if (path == "") {
    path = "index.html";
  }

  if(req.method === "POST")
  {
    let body = '';
    
    // Read request body
    req.on('data', (data) => {
      body += data;
    });

    // Parse form data and handle it
    req.on('end', () => {
      const formData = qs.parse(body);
      mailto(formData)
    });
    res.writeHead(200);
  }

  let file = __dirname + "/public/" + path;

  //async read file function uses callback
  fs.readFile(file, function (err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(content);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening on port 3000");
});
