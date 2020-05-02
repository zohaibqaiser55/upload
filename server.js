const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");


const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }
    //making sure that the port is number(int)
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

   // used to check that which type error occurs 
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

   
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};
// creating a port constant that will hold the value of the port 
const port = normalizePort(process.env.PORT || "3000");
//setting the app on port(3000)
app.set("port", port);

const server = http.createServer(app);
// listner used when error occured
server.on("error", onError);

server.on("listening", onListening);
server.listen(port);
