// Initialize an empty array to store chat history
let chatHistory = [];

// Function to add a message to the chat history
const addToHistory = (message, isBot = false) => {
  chatHistory.push({
    message,
    isBot,
    timestamp: new Date().getTime(),
  });
};

// Handler for form submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const userMessage = data.get('prompt');

  // Add user message to chat history
  addToHistory(userMessage);

  // Display the user message in the chat container
  ChatContainer.innerHTML += chatStripe(false, userMessage);

  form.reset();

  // Send user message to the bot and receive response
  const response = await sendMessageToBot(userMessage);

  // Add bot message to chat history
  addToHistory(response, true);

  // Display the bot message in the chat container
  ChatContainer.innerHTML += chatStripe(true, response);

  // Scroll to the bottom of the chat container
  ChatContainer.scrollTop = ChatContainer.scrollHeight;
};

// Function to display chat history to the user
const displayChatHistory = () => {
  // Sort chat history by timestamp
  chatHistory.sort((a, b) => a.timestamp - b.timestamp);

  // Clear chat container
  ChatContainer.innerHTML = '';

  // Loop through chat history and display messages
  chatHistory.forEach((messageObj) => {
    const { message, isBot } = messageObj;
    ChatContainer.innerHTML += chatStripe(isBot, message);
  });

  // Scroll to the bottom of the chat container
  ChatContainer.scrollTop = ChatContainer.scrollHeight;
};

// Call displayChatHistory() to initially display the chat history
displayChatHistory();

