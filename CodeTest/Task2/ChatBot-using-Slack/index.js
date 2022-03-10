const botkit = require('botkit')
const NLP = require('natural');
const classifier = new NLP.LogisticRegressionClassifier();
const fs = require('fs');




require('dotenv').config();

const scopes = [
    'direct_mention',
    'direct_message',
    'mention'
];

const token = process.env.SLACK_API_TOKEN;

const Bot = botkit.slackbot({
    debug: true,
    storage: undefined
});

function handleMessage(speech, message) {
    console.log(speech, message);
    speech.reply(message, "Hi I am AI chatbot.");
}

Bot.hears('.*', scopes, handleMessage); //'.*' means to match any message test.
Bot.spawn({
    token: token
}).startRTM();


//Function to parse a json file to a javascript object.
function parseTrainingData(filepath) {
    const trainingFile = fs.readFileSync('./trainData.json');
    return JSON.parse(trainingFile);
}

function trainClassifier(classifier, label, phrases) {
    console.log('Teaching set', label, phrases);
    phrases.forEach((phrase) => {
        console.log(`Teaching single ${label}: ${phrase}`);
        classifier.addDocument(phrase.toLowerCase(), label);
    });
}

function interpret(phrase) {
    console.log('interpret', phrase);
    const guesses = classifier.getClassifications(phrase.toLowerCase());
    console.log('guesses', guesses);
    const guess = guesses.reduce((x,y) => x && x.value >
    y.value ? x : y);
    return {
        probabilities: guesses,
        guess: guess.value > (0.7) ? guess.label : null
    };
}

async function handleMessage(message) {
    const interpretation = interpret(message.text);
    console.log('ChatBot heard:', message.text);
    console.log('ChatBot Interpretation:', interpretation);

    if (interpretation.guess && trainData[interpretation.guess]) {
        console.log('Found answer');
        await rtm.sendMessage(trainData[interpretation.guess].answer, message.channel);
    } else {
        console.log('Could not match any phrase, sorry.')
        await rtm.sendMessage('Sorry, I\'m not sure what you mean', message.channel);

    }
}

const trainData = parseTrainingData("./trainData.json");

var i=0;
Object.keys(trainData).forEach((element, key) => {
   trainClassifier(classifier, element, trainData[element].questions);
   i++;
   if (i === Object.keys(trainData).length) {
    classifier.train();
    const filePath = './classifier.json';
    classifier.save(filePath, (err, classifier) => {
        if (err) {
            console.error(err);
        }
        console.log('Created a Classifier file in ', filePath);
    });
}
});

Bot.hears('.*', scopes, handleMessage);

Bot.spawn({
    token: token
}).startRTM();