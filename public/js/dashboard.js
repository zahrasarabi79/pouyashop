import { setHeaders } from "./login.js";
const addReportBtn = document.getElementById("addReportsBtn");
const url = "http://localhost:3000/dashboard";
console.log(setHeaders({}));
addReportBtn.addEventListener("click", addReport);
function addReport(e) {
    e.preventDefault();
    // fetchData();
}
// async function fetchData() {
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: setHeaders({
//         "Content-Type": "application/json",
//       }),
//     });
//     if (response.ok) {
//       console.log(response);
//       window.location.href = "./add-reports.html";
//     } else {
//       // Handle the error response
//       console.log("Failed to navigate:", response.status);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
