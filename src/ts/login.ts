const eyeicon = document.getElementById("eyeicon") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const submitForm = document.getElementById("form") as HTMLInputElement;
const username = document.querySelector("#username") as HTMLInputElement;
submitForm.addEventListener("submit", giveData);

const usernameError = document.querySelector(
  "#usernameError"
) as HTMLInputElement;
const passwordError = document.querySelector(
  "#passwordError"
) as HTMLInputElement;
const userError = document.querySelector(".userError") as HTMLInputElement;
const url: string = "http://localhost:3000/login";
// dash boards
let getTokenStorage: string | null;

interface IUsers {
  username: string;
  password: string;
}
interface IToken {
  token: string;
}
function giveData(e: any) {
  e.preventDefault();
  const users: IUsers = {
    username: username.value,
    password: password.value,
  };
  getResponse(users);
}
// get response
async function getResponse(users: IUsers) {
  try {
    const response: Response = await fetch(url, {
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
async function checkResponse(response: Response, users: IUsers) {
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
// set the token for each fetch header
function setHeaders(headers: {}) {
  console.log(localStorage.myToken);
  if (localStorage.myToken) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.myToken}`,
    };
  } else {
    return headers;
  }
}
// get token
async function getToken(response: Response) {
  const data: IToken = await response.json();
  let token: string = data.token;
  await getstoragetoken(token);
  getTokenStorage = localStorage.getItem("myToken");
  // console.log(getTokenStorage);
  // console.log(localStorage.myToken)

  window.location.href = "./dashboard.html";
}
console.log(localStorage.myToken);

// save token in storage
const getstoragetoken = async (Token: string): Promise<void> => {
  localStorage.setItem("myToken", Token);
};

// check and show input error
async function checkEmptyInput(users: IUsers) {
  const { username, password }: IUsers = users;
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
  const type: "password" | "text" =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  if (type) this.classList.toggle("fa-eye-slash");
  else {
    this.classList.toggle("fa-eye");
  }
});




export { setHeaders };
