'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en": {
        "translation": {
            "COMPLIMENTS": [
                "You are awesome.",
                "You shine like a star",
                "You are the smartest.",
                "Short girls rock!",
                "Mirror Mirror on the wall, you aren't the fairest of them all."
            ],
            "SKILL_NAME" : "Compliment Buddy",
            "GET_COMPLIMENT_MESSAGE" : "Here's your compliment: ",
            "HELP_MESSAGE" : "You can say tell me a scompliment, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "COMPLIMENTS": [
                "You are awesome.",
                "You shine like a star",
                "You are the smartest.",
                "Short girls rock!",
                "Mirror Mirror on the wall, you aren't the fairest of them all."
            ],
            "SKILL_NAME" : "American Compliment Buddy"
        }
    },
    "en-GB": {
        "translation": {
            "COMPLIMENTS": [
                "You are awesome.",
                "You shine like a star",
                "You are the smartest.",
                "Short girls rock!",
                "Mirror Mirror on the wall, you aren't the fairest of them all."
            ],
            "SKILL_NAME" : "British Compliment Buddy"
        }
    },
    "de": {
        "translation": {
            "COMPLIMENTS": [
                "You are awesome.",
                "You shine like a star",
                "You are the smartest.",
                "Short girls rock!",
                "Mirror Mirror on the wall, you aren't the fairest of them all."
            ],
            "SKILL_NAME" : "Weltraumwissen auf Deutsch",
            "GET_COMPLIMENT_MESSAGE" : "Hier sind deine Fakten: ",
            "HELP_MESSAGE" : "Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetCompliment');
    },
    'GetNewComplimentIntent': function () {
        this.emit('GetCompliment');
    },
    'GetCompliment': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('COMPLIMENTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_COMPLIMENT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'UnhandledIntent': function(){
        this.emit(':ask', "I did not understand. Please try again");
    }
};