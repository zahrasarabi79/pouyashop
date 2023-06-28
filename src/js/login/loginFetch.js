const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const userError = document.querySelector(".userError");

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
  await getstoragetoken(token);
  getTokenStorage = localStorage.getItem("myToken");
  // console.log(getTokenStorage);
  console.log(localStorage.myToken);

  window.location.href = "./dashboard.html";
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
