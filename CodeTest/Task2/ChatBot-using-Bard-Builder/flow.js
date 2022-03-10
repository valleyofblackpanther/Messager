const root_trailing = require("./dialogs/root-trailing");
const faq_trailing = require("./dialogs/faq-trailing");
const bye_trailing = require("./dialogs/bye-trailing");
const intent_incoming = require("./dialogs/intent-incoming");

module.exports = function(bot) {
    const deps = {};

    bot.trailing("root", root_trailing(deps));
    bot.trailing("faq", faq_trailing(deps));
    bot.trailing("bye", bye_trailing(deps));
    bot.incoming("intent", intent_incoming(deps));
}
