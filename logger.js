const {consumeFromQueue}  = require("./setup/rabbit-mq");

consumeFromQueue((data) => console.log(data));
