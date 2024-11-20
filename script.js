const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const responseContainer = document.getElementById('response-container');

// Initialize Speech Recognition and Speech Synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;

submitButton.addEventListener('click', () => {
  const userInputValue = userInput.value.trim();
  if (userInputValue) {
    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${userInputValue}&format=json&origin=*`)
      .then(response => response.json())
      .then(data => {
        const result = data[1][0] ? data[1][0] : 'No results found';
        responseContainer.innerHTML = `<p>${result}</p>`;
        speak(result);
      })
      .catch(error => console.error('Error:', error));
  }
});

// Voice Input
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  userInput.value = transcript;
  submitButton.click();
};

recognition.onend = () => {
  recognition.start();
};

recognition.start();

// Text-to-Speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
