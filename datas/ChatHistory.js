// Path: server\ChatHistory.js 
const ChatHistory = [
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 1
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 1
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 2
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 2
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 3
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 3
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 4
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 4
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 5
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 5
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'user' }, // user message 6
  { id: 'id-1620000000000-0.12345678901234567', value: 'Hello', type: 'bot' }, // bot message 6

]; 

module.exports = ChatHistory; 

// Path: server\ChatHistory.js
const ChatHistory = require('./ChatHistory'); 

app.get('/api', (req, res) => {
  res.json(ChatHistory);
}
)
