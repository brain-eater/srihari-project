const amqp = require("amqplib/callback_api");
const QUEUE = "users"
const url = "amqp://user-manager:user-manager@localhost/user-manager"

const postToUserQueue = function(id) {
    amqp.connect(url, function(err, conn) {
        conn.createChannel(on_open);
        function on_open(err, ch) {
            if (err != null) bail(err);
            ch.assertQueue(QUEUE);
            ch.sendToQueue(QUEUE, Buffer.from(id.toString()));
        }
    });
}

function consumeFromUserQueue(callback) {
    amqp.connect(url, function(err, conn) {
        conn.createChannel(on_open);
        function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue(QUEUE);
        ch.consume(QUEUE, function(msg) {
            if (msg !== null) {
                callback(msg.content.toString());
                ch.ack(msg);
            }
          });
        }
    });
}

module.exports = {postToUserQueue, consumeFromQueue: consumeFromUserQueue}
