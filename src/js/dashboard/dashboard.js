async function addReport(event) {
  window.location.href = "./add-reports.html";

  // await fetchaddReport();
}

async function fetchaddReport() {
  try {
    const response = await callPostApi("add", "", "json");
    if (response.ok) {
      window.location.href = "./add-reports.html";
    } else {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log("didn't get response");
  }
}

async function ViewReport() {
  await fetchViewReport();
}
async function fetchViewReport() {
  try {
    const response = await callPostApi("dashboard", "", "json");
    if (response.ok) {
      window.location.href = "./showReports.html";
    } else {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log("didn't get response");
  }
}
