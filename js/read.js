const fs = require('fs');

let chatHistory = [
  { message: 'Hello', sender: 'user' },
  { message: 'Hi there!', sender: 'bot' },
];

// Write chat history to file
const writeChatHistory = (data) => {
  fs.writeFileSync('data\chatHistory.json', JSON.stringify(data));
};

writeChatHistory(chatHistory);

// Read chat history from file
const readChatHistory = () => {
  const data = fs.readFileSync('data\chatHistory.json', 'utf8');
  return JSON.parse(data);
};

let chatHistoryFromFile = readChatHistory();
console.log(chatHistoryFromFile);

