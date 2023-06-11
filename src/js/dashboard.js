import { setHeaders } from "./login";
const addReportBtn = document.querySelector("#addReportsBtn");
const url = "http://localhost:3000/dashboard";

addReportBtn.addEventListener("click", addReport);
function addReport(e) {
  e.preventDefault();
  console.log("hi");
  // fetchData();
}
async function fetchData() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: setHeaders({
        "Content-Type": "application/json",
      }),
    });

    if (response.ok) {
      console.log(response);
        window.location.href = "./add-reports.html";
    } else {
      // Handle the error response
      console.log("Failed to navigate:", response.status);
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
