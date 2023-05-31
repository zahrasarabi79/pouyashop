const eyeicon = document.getElementById("eyeicon");
const contractForm = document.getElementById("cont");
const password = document.getElementById("password");
const submitForm = document.getElementById("form");
const username = document.querySelector("#username");
const url = "http://localhost:3000/login";
submitForm.addEventListener("submit", giveData);
function giveData(e) {
  e.preventDefault();
  const users = {
    username: username.value,
    password: password.value,
  };
  fetchData(users);
}
// authentication
async function fetchData(users) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Response:", response);
    window.location.href = "./dashboard.html" // Perform further processing or return the data as needed
  } catch (error) {
    console.error("Error:", error); // Handle the error or throw it to be caught elsewhere
  }
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
