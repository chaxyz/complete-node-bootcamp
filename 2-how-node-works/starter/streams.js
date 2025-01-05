const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1: Read file
  /*fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });*/

  // Solution 2: Read file useing Stream
  /*const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", () => {
    console.log("Error reading file");
    res.statusCode = 500;
    res.end("File not found");
  });*/

  // Solution 2: Read file useing Stream (fix backpressure)
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 3000");
});
