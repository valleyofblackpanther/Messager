const {Bot} = require("bard-builder");
const setup_flow = require("./flow.js");
const Gateway = require("./gateway.js");

const main = function() {

    const bot = new Bot({name: "Question and Answer Bot"});
    setup_flow(bot);

    bot.start();


 
    const gateway = new Gateway(8888, bot);
    gateway.pullProcess();

}

main();
