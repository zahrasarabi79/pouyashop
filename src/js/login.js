let eyeicon = document.getElementById("eyeicon");
let contractForm = document.getElementById("cont");
// eyeicon
      let password = document.getElementById("password");
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
contractForm.addEventListener('submit',(e)=>{
  e.preventDefault()
})