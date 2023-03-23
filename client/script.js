import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const ChatContainer = document.querySelector('#chat_container');

let loadinterval;

function loader(element) {
  element.textContent = '';
  loadinterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueID() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}


//Make a chat history for gpt-3, readable by humans and gpt-3
// make the chat history actually being read by the gpt-3 api and being interacted with for new answers. 
// put the chat history is ChatHistory.js
// make the chat history readable by humans and gpt-3




// Path: client\script.js
form.addEventListener('submit', (e) => { 
  e.preventDefault();
  const input = document.querySelector('input');
  const value = input.value;
  if (value === '') {
    return;
  }
  input.value = '';
  const id = generateUniqueID();
  const userMessage = {
    id,
    value,
    type: 'user',
  };
  ChatContainer.innerHTML += ` 
    <div class="message user" id="${id}">
      <img src="${user}" alt="user" />
      <p class="text">${value}</p>
    </div>
  `;
  const botMessage = {
    id: generateUniqueID(),
    type: 'bot',
  };
  ChatContainer.innerHTML += `
    <div class="message bot" id="${botMessage.id}">
      <img src="${bot}" alt="bot" />
      <p class="text"></p>
    </div>
  `;
  const botTextElement = document.querySelector(`#${botMessage.id} .text`);
  loader(botTextElement);
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userMessage),
  })
    .then((res) => res.json())
    .then((data) => {
      clearInterval(loadinterval);
      botMessage.value = data.text;
      typeText(botTextElement, data.text);
    });
} ); 

