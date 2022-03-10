module.exports = function(deps) {
    return [
        (session, course) => {
            session.send("Good, it was great helping you with your relationship queries.");
            return session.end()
        }
    ];
}