const AWS = require('aws-sdk');

// Route the incoming request based on intent.
const accounts = [
  {
    type: 'Free',
    verificationCode: '1234',
    date: '20-Apr-2021',
  },
  {
    type: 'Premium',
    verificationCode: '1234',
    date: '21-May-2022',
  },
  {
    type: 'Student',
    verificationCode: '1234',
    date: '22-June-2023',
  },
];

// Check to see if an account matches for the account type and also that the pin number for that
// account matches the array
const getAccount = (type, verificationCode) => {
  const result = accounts.find(account => account.type.toLowerCase() === type.toLowerCase()
  && account.verificationCode === verificationCode);
  return result;
};

const deadlineIntent = (intentRequest, callback) => {
  const { slots } = intentRequest.currentIntent;
  const sessionAttributes = { ...intentRequest.sessionAttributes, ...slots };
  const account = getAccount(slots.SubscriptionType, slots.VerificationCode);

  if (!account) {
    callback(elicitSlot(sessionAttributes, 'GetBalanceCheck', slots, 'VerificationCode', {
      contentType: 'PlainText',
      content: 'Invalid verification code please re-enter your verification code',
    }));
  } else {
    callback(close(sessionAttributes, 'Fulfilled', {
      contentType: 'PlainText',
      content: `Your subscription ends on ${account.date}`,
    }));
  }
};

const deadlineIntentError = (intentRequest, callback) => {
  const { slots } = intentRequest.currentIntent;
  const sessionAttributes = { ...intentRequest.sessionAttributes, ...slots };
  const account = getAccount(slots.SubscriptionType, slots.VerificationCode);
  callback(close(sessionAttributes, 'Fulfilled', {
    contentType: 'PlainText',
    content: `Your subscription ends on ${account.date}, is there anything I can help you with?`,
  }));
};

// This a simple example to demonstrate how lambda can work with the flow
const simpleResponse = (intentRequest, callback) => {
  const { slots } = intentRequest.currentIntent;
  const $msg = `Thank you for using the lambda function.
  You submitted the following values AccountType:${slots.SubscriptionType}
  VerificationCode ${slots.VerificationCode}. Now it's time to make it actually do something!`;
  callback(close({}, 'Fulfilled', {
    contentType: 'PlainText',
    content: $msg,
  }));
};

// Called when the user specifies an intent for this skill.
const dispatch = (intentRequest, callback) => {
  console.log(JSON.stringify(intentRequest, null, 2));
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'GetBalanceCheck') {
  
    //return simpleResponse(intentRequest, callback);
     //return deadlineIntentError(intentRequest, callback);
    return deadlineIntent(intentRequest, callback);
  }
  return {};
};

const loggingCallback = (response, originalCallback) => {
  console.log('lambda response:\n', JSON.stringify(response, null, 2));
  originalCallback(null, response);
};

// The handler function is the one that gets called by lambda as it is invoked
exports.handler = (event, context, callback) => {
  try {
    console.log(`event.bot.name=${event.bot.name}`);
    dispatch(event, response => loggingCallback(response, callback));
  } catch (err) {
    callback(err);
  }
};


// --------------- Helpers that build all of the responses -----------------------
// continue dialog with the customer, expressing that the user will select another intent after
// she hears this response
const nextIntent = (sessionAttributes, message) => {
  console.log(`nextIntent:  ${JSON.stringify(message)}`);
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitIntent',
      message,
    },
  };
};

const elicitSlot = (sessionAttributes, intentName, slots, slotToElicit, message) => ({
  sessionAttributes,
  dialogAction: {
    type: 'ElicitSlot',
    intentName,
    slots,
    slotToElicit,
    message,
  },
});


const confirmIntent = (sessionAttributes, intentName, slots, message) => ({
  sessionAttributes,
  dialogAction: {
    type: 'ConfirmIntent',
    intentName,
    slots,
    message,
  },
});


const close = (sessionAttributes, fulfillmentState, message) => ({
  sessionAttributes,
  dialogAction: {
    type: 'Close',
    fulfillmentState,
    message,
  },
});

const delegate = (sessionAttributes, slots) => ({
  sessionAttributes,
  dialogAction: {
    type: 'Delegate',
    slots,
  },
});

