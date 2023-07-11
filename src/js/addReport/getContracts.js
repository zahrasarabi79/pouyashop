async function formInput(e) {
  e.preventDefault();
  let data = e.target.serialize();

  try {
    const contractId = await getContractId(data);
    localStorage.setItem("id", contractId.id);
    window.location.href = "./showReports.html";
  } catch (error) {
    console.log("false");
  }
}
async function getContractId(data) {
  const response = await callPostApi("AddReports", data);
  if (response.ok) {
    return await response.json();
  }
}
