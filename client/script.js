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

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="profile"/>
        </div>
        <div class="message-wrapper ${isAi ? 'ai' : ''}">
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    </div>
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // Add user's message to the chat stripe
  ChatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // Save user's message to a global variable
  window.lastUserMessage = data.get('prompt');

  form.reset();

  // Add bot's message to the chat stripe
  const uniqueId = generateUniqueID();
  ChatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  ChatContainer.scrollTop = ChatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch data from server to get bot's response
  const response = await fetch('https://codexo.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadinterval)
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);

  }
}

form.addEventListener('submit', handleSubmit);

form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
