async function addReport(event) {
  window.location.href = "./add-reports.html";
}
async function contractInfo() {
  const contractListRes = await callPostApi("listOfReports", "", "json");
  try {
    if (contractListRes.ok) {
      return await contractListRes.json();
    }
  } catch (error) {
    console.log("didn't get response");
  }
}
async function contractsInformation() {
  const allContract = (await contractInfo()).Contracts;
  console.log(allContract);
  allContract.forEach((obj) => creatReportcard(obj));
}

function showReport(objId) {
  localStorage.setItem("id", objId);
  window.location.href = "./showReports.html";
}
contractsInformation();
