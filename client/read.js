const fs = require('fs');

let chatHistory = [];

// Read chat history from file on startup
const readChatHistory = () => {
  try {
    const data = fs.readFileSync('data/chatHistory.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

chatHistory = readChatHistory();

// Write chat history to file after every message
const writeChatHistory = () => {
  fs.writeFileSync('data/chatHistory.json', JSON.stringify(chatHistory));
};

const handleMessage = (message) => {
  // Add message to chat history
  chatHistory.push(message);

  // Generate bot response
  const response = generateResponse(message);

  // Send response back to user
  sendResponse(response);

  // Save chat history to file
  writeChatHistory();
};
