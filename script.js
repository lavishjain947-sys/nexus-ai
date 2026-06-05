const loaderOverlay = document.getElementById('loaderOverlay');
const messageList = document.getElementById('messageList');
const historyList = document.getElementById('historyList');
const systemPrompt = document.getElementById('systemPrompt');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const savedPrompts = document.getElementById('savedPrompts');
const addPromptBtn = document.getElementById('addPromptBtn');
const styleButtons = document.querySelectorAll('.style-btn');
const currentStyleTag = document.getElementById('currentStyleTag');
const companyInfo = document.getElementById('companyInfo');
const editCompanyBtn = document.getElementById('editCompanyBtn');
const togglePromptEdit = document.getElementById('togglePromptEdit');

const STATE_KEY = 'nexus-assistant-state-v1';
const DEFAULT_STATE = {
  style: 'Casual Hinglish',
  systemPrompt: systemPrompt.value,
  companyInfo: companyInfo.value,
  history: [],
  savedPrompts: [
    'Explain how to build a Python automation script for reading CSV files.',
    'Help me debug this API error and suggest fixes.',
    'Generate a backend route in FastAPI for user authentication.',
  ],
};

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STATE_KEY);
  if (!raw) return DEFAULT_STATE;

  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function initUI() {
  systemPrompt.value = state.systemPrompt;
  companyInfo.value = state.companyInfo;
  currentStyleTag.textContent = `Style: ${state.style}`;
  document.querySelectorAll('.style-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.style === state.style);
  });
  renderMessages();
  renderHistory();
  renderSavedPrompts();
}

function renderMessages() {
  messageList.innerHTML = '';
  state.history.slice().reverse().forEach((entry) => {
    const card = document.createElement('div');
    card.className = `message-card ${entry.role}`;
    card.innerHTML = `<span>${entry.role === 'user' ? 'You' : 'Nexus Assistant'}</span><p>${entry.content}</p>`;
    messageList.appendChild(card);
  });
}

function renderHistory() {
  historyList.innerHTML = '';
  state.history.slice().reverse().forEach((entry, index) => {
    if (entry.role !== 'user') return;
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `<h3>Prompt ${state.history.length - index}</h3><p>${entry.content}</p>`;
    historyList.appendChild(item);
  });
}

function renderSavedPrompts() {
  savedPrompts.innerHTML = '';
  state.savedPrompts.forEach((prompt, index) => {
    const item = document.createElement('button');
    item.className = 'style-btn';
    item.textContent = prompt;
    item.addEventListener('click', () => {
      userInput.value = prompt;
      userInput.focus();
    });
    savedPrompts.appendChild(item);
  });
}

function addMessage(role, content) {
  state.history.push({ role, content, createdAt: Date.now() });
  saveState();
  renderMessages();
  renderHistory();
}

function sendMessage() {
  const prompt = userInput.value.trim();
  if (!prompt) return;

  addMessage('user', prompt);
  userInput.value = '';
  simulateAssistantResponse(prompt);
}

function simulateAssistantResponse(prompt) {
  const response = `Mock response for: ${prompt}\n\n[This UI is ready for API integration. Replace simulateAssistantResponse() with your backend call when you connect your hosted model.]`;
  setTimeout(() => {
    addMessage('assistant', response);
  }, 650);
}

function clearHistory() {
  state.history = [];
  saveState();
  renderMessages();
  renderHistory();
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

clearChatBtn.addEventListener('click', clearHistory);

addPromptBtn.addEventListener('click', () => {
  const promptText = prompt('Enter a prompt template to save:');
  if (!promptText) return;
  state.savedPrompts.push(promptText.trim());
  saveState();
  renderSavedPrompts();
});

styleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.style = button.dataset.style;
    saveState();
    currentStyleTag.textContent = `Style: ${state.style}`;
    styleButtons.forEach((b) => b.classList.toggle('active', b === button));
  });
});

systemPrompt.addEventListener('input', () => {
  state.systemPrompt = systemPrompt.value;
  saveState();
});

companyInfo.addEventListener('input', () => {
  state.companyInfo = companyInfo.value;
  saveState();
});

editCompanyBtn.addEventListener('click', () => {
  companyInfo.focus();
});

togglePromptEdit.addEventListener('click', () => {
  systemPrompt.classList.toggle('editable');
  systemPrompt.focus();
});

window.addEventListener('mousemove', (event) => {
  document.body.style.setProperty('--cursor-x', `${event.clientX}px`);
  document.body.style.setProperty('--cursor-y', `${event.clientY}px`);
});

window.addEventListener('load', () => {
  initUI();
  setTimeout(() => loaderOverlay.classList.add('hidden'), 800);
});
