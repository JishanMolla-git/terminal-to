const input = document.getElementById("input-Field");
const output = document.getElementById("output-wrapper");
const inputW = document.getElementById("inp-field-container");

let loginMode = false;
const password = "gg";

input.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.key !== "Enter") return;

  const command = input.innerText.trim();

  if (!loginMode) {
    handleNonLoginCommands(command);
  } else {
    handleLoginCommands(command);
  }

  output.scrollTop = output.scrollHeight;
  input.innerText = "";
  event.preventDefault();
}

function handleNonLoginCommands(command) {
  switch (command) {
    case "login":
      login();
      break;
    case "clear":
      clearOutput();
      break;
    case "help":
      showHelp();
      break;
    case "banner":
      displayBanner();
      break;
    default:
      invalidCommand("Not a valid command bro wtf", command);
      break;
  }
}

function handleLoginCommands(command) {
  if (command === password) {
    loginSuccess();
  } else {
    loginFailed();
  }
}

function loginSuccess() {
  loginMode = false;
  appendStyledText("You are right!", "green");
  setTimeout(() => {
    window.location.href = "main-OS/main.html";
  }, 2000);
}

function loginFailed() {
  appendStyledText("Wrong password. Try again.", "red");
}

function login() {
  if (!loginMode) {
    const passText = createStyledText("password ", "red");
    inputW.insertBefore(passText, inputW.firstChild);
    loginMode = true;
  }
}

function showHelp() {
  const helpCommands =
    "\nhelp:  show help\n" +
    "clear: clear output\n" +
    "banner:   toggle banner\n" +
    "login:   login to account\n";
  appendStyledText(helpCommands, "coral");
}

function invalidCommand(message, command) {
  appendStyledText(` >> "${command}"  ${message}`, "red");
}

function clearOutput() {
  output.innerHTML = "";
}

function displayBanner() {
  const banner = document.getElementById("banner");

  if (banner.style.display === "none") {
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}

function appendStyledText(text, color) {
  const styledText = createStyledText(text, color);
  output.appendChild(styledText);
}

function createStyledText(text, color) {
  const styledText = document.createElement("p");
  styledText.innerText = text;
  styledText.style.color = color;
  return styledText;
}
