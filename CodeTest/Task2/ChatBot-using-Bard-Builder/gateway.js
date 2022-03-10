const {Message, MessageTypes} = require("bard-builder");
const express = require("express");

module.exports = class Gateway {
    constructor(port, bot) {
        this.port = port;
        this.bot = bot;



        this.message_broker = {
            sendMessage: (message) => console.log("Sending message:", message.data)
        };

        this.server = express();

        this.server.use(express.json());


        this.server.post("/recieve/message", (request, response) => {
            const body = request.body;
            const message = new Message(
                body.contact, body.session, body.origin,
                body.data, MessageTypes.TEXT
            );

            this.bot.push(message);
            return response.status(200).send("OK - Message received.");
        });
        this.server.listen(this.port);
    }
    pullProcess() {
        const message = this.bot.pull();

        if (message instanceof Error) {
            return setTimeout(() => this.pullProcess(), 500);
        }
        this.message_broker.sendMessage(message);

        return setImmediate(() => this.pullProcess());
    }
}