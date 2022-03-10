const questions_list = {
    "I don't have a girlfriend.": "Aww..that's sad. Don't worry you'll find her at the right time. As i got the developer who coded me. Believe Yourself.",
    "How to flirt with a girl?": "Just try to be yourself. If she likes you the way you are then you are lucky.",
    "How to ask out a girl on a date?": "Just be confident, smell good for that day for godsakes, and tell what you feel. And leave it her, she'll decide if she wants to be in a relationship with you or not."
};

module.exports = function(deps) {
    return [
        (session, course) => {
            const user_input = session.getMessage().data;
            if(!(user_input && user_input.length)) {
                return course.next();
            }
            const answer = question_list[user_input.toLowerCase()];
            if (answer) {
                session.storage.set("answer", answer);
                return course.replace("faq");    
            }
           
            return course.next();
        }
    ];
}