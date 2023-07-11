// authentication
async function checkResponse(response, users) {
  $(".userError").text("");
  $(".userError").removeClass("has-error");
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
  window.location.href = "./dashboard.html";
}

// check and show input error
async function checkEmptyInput(users) {
  const { username, password } = users;
  if (!username && !password) {
    $("#passwordError, #usernameError").addClass("bg-red-100");
    $("#usernameError").text("Please,Enter a username.");
    $("#passwordError").text("Please,Enter a password.");
    return;
  }
  if (!username) {
    $("#usernameError").addClass("bg-red-100");
    $("#passwordError").removeClass("bg-red-100");
    $("#usernameError").text("Please,Enter a username.");
    return;
  }
  if (!password) {
    $("#passwordError").addClass("bg-red-100");
    $("#usernameError").removeClass("bg-red-100");
    $("#passwordError").text("Please,Enter a password.");
    return;
  }
}
async function checkInput() {
  $(".userError").addClass("bg-red-100");
  $("#usernameError").text("Please,Enter correct username.");
  $("#passwordError").text("Please,Enter correct password.");
}
