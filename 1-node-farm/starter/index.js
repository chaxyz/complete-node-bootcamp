const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require(`./modules/replaceTemplate`);

////////////////////// FILE ////////////////
// SYCHO
/*const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);*/

// ASYCHO
/*fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("write success");
      });
    });
  });
});*/

/////////////////////// SERVER //////////////////
const overviewTemp = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const cardTemp = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview
  if (pathname == '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHtml = dataObj
      .map((data) => replaceTemplate(cardTemp, data))
      .join('');
    const output = overviewTemp.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);
    //Product page
  } else if (pathname == '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(productTemp, product);
    res.end(output);

    //API
  } else if (pathname == '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('Page not found!');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
