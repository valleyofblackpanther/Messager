module.exports = function(deps) {
    return [
        (session, course) => {
            const is_known = session.storage.get("known_greeting");

            let greeting_message = "Hi, I am a Question and Answer ChatBot 😁😀";
            if (is_known) greeting_message = "Hello Again. I know you!";

            session.send(greeting_message);

            session.storage.set("known_greeting", true);
            return course.replace("faq");
        }
    ]
}