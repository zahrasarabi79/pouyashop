const eyeicon = document.getElementById("eyeicon");
const contractForm = document.getElementById("cont");
const password = document.getElementById("password");
const submitForm = document.getElementById("form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const userError = document.querySelector(".userError");
const url = "http://localhost:3000/login";

submitForm.addEventListener("submit", giveData);

function giveData(e) {
  e.preventDefault();
  const users = {
    username: username.value,
    password: password.value,
  };
  getResponse(users);
}
// get response
async function getResponse(users) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
      },
    });
    checkResponse(response, users);
  } catch (error) {
    console.log("didnt get response");
  }
}
// authentication
async function checkResponse(response, users) {
  userError.textContent = "";
  userError.classList.remove("has-error");
  if (response.status === 400) {
    return await checkEmptyInput(users);
  }
  if (response.status === 401) {
    await checkInput();
  }
  if (response.ok) {
    await getToken(response);
  }
}
// get token
async function getToken(response) {
  const data = await response.json();
  let token = data.token;
  const Token = await getstoragetoken(token);
  console.log(Token);
  window.location.href = "./dashboard.html";
}
// save token in storage
const getstoragetoken = async (Token) => {
  localStorage.setItem("myToken", Token);
};
// set the token for each fetch header
export function setHeaders(headers) {
  if (localStorage.myToken) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.jwt}`,
    };
  } else {
    return headers;
  }
}
// check and show input error
async function checkEmptyInput(users) {
  const { username, password } = users;
  if (!username && !password) {
    usernameError.textContent = "Please,Enter a username.";
    passwordError.textContent = "Please,Enter a password.";
    passwordError.classList.add("has-error");
    usernameError.classList.add("has-error");
    return;
  }
  if (!username) {
    usernameError.textContent = "Please,Enter a username.";
    usernameError.classList.add("has-error");
    return;
  }
  if (!password) {
    passwordError.textContent = "Please,Enter a password.";
    passwordError.classList.add("has-error");
    return;
  }
}
async function checkInput() {
  usernameError.textContent = "Please,Enter correct username.";
  passwordError.textContent = "Please,Enter correct password.";
  userError.classList.add("has-error");
}
// chenge eyeicon on click
eyeicon.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  if ("type" === "password") this.classList.toggle("fa-eye-slash");
  else {
    this.classList.toggle("fa-eye");
  }
});
contractForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
