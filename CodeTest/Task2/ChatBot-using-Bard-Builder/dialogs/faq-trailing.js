module.exports = function(deps) {
    return [
        (session, course) => {
            const have_answer = session.storage.get("answer");
            if (have_answer) return course.next();

            session.send("How can i help you?");
            return course.wait();
        },
        (session, course) => {
            const have_answer = session.storage.get("answer");
            if(!have_answer) {
                let max_tries = session.storage.get("answer_max_tries") || 0;
                if(max_tries >=2){
                    session.send("Sorry unable to understand you.");

                    session.storage.set("answer_max_tries", 0);
                    return course.replace("GoodBye");
                }
                session.send("Sorry, i am unable to process your question.");
                session.storage.set("answer_max_tries", ++max_tries);
                return course.replace("faq");
            }
            session.storage.set("answer_max_tries", 0);

            session.send(have_answer);
            session.storage.set("answer", null);

            return course.next();
        },
        (session, course) => {
            const response = session.getMessage().data;
            if (response !="yes" && response != "y") {
                session.send("Alright");
                return course.replace("GoodBye");
            }
            return course.replace("faq");
        }
    ];
}