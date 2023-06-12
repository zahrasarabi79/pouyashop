var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const eyeicon = document.getElementById("eyeicon");
const password = document.getElementById("password");
const submitForm = document.getElementById("form");
const username = document.querySelector("#username");
submitForm.addEventListener("submit", giveData);
const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const userError = document.querySelector(".userError");
const url = "http://localhost:3000/login";
// dash boards
let getTokenStorage;
function giveData(e) {
    e.preventDefault();
    const users = {
        username: username.value,
        password: password.value,
    };
    getResponse(users);
}
// get response
function getResponse(users) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: "POST",
                body: JSON.stringify(users),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            checkResponse(response, users);
        }
        catch (error) {
            console.log("didnt get response");
        }
    });
}
// authentication
function checkResponse(response, users) {
    return __awaiter(this, void 0, void 0, function* () {
        userError.textContent = "";
        userError.classList.remove("has-error");
        if (response.status === 400) {
            return yield checkEmptyInput(users);
        }
        if (response.status === 401) {
            yield checkInput();
        }
        if (response.ok) {
            yield getToken(response);
        }
    });
}
// set the token for each fetch header
function setHeaders(headers) {
    console.log(localStorage.myToken);
    if (localStorage.myToken) {
        return Object.assign(Object.assign({}, headers), { Authorization: `Bearer ${localStorage.myToken}` });
    }
    else {
        return headers;
    }
}
// get token
function getToken(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield response.json();
        let token = data.token;
        yield getstoragetoken(token);
        getTokenStorage = localStorage.getItem("myToken");
        // console.log(getTokenStorage);
        // console.log(localStorage.myToken)
        window.location.href = "./dashboard.html";
    });
}
console.log(localStorage.myToken);
// save token in storage
const getstoragetoken = (Token) => __awaiter(void 0, void 0, void 0, function* () {
    localStorage.setItem("myToken", Token);
});
// check and show input error
function checkEmptyInput(users) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function checkInput() {
    return __awaiter(this, void 0, void 0, function* () {
        usernameError.textContent = "Please,Enter correct username.";
        passwordError.textContent = "Please,Enter correct password.";
        userError.classList.add("has-error");
    });
}
// chenge eyeicon on click
eyeicon.addEventListener("click", function (e) {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    if (type)
        this.classList.toggle("fa-eye-slash");
    else {
        this.classList.toggle("fa-eye");
    }
});
export { setHeaders };
