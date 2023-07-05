const deletedModal = document.getElementById("deletedModal");
const opendDeletedModalBtn = document.getElementById("closedeletedModal");
const closeDeletedModalBtn = document.getElementById("opendeletedModal");
function deletedModals() {
  deletedModal.classList.remove("hidden");
}
function closedeletedModals() {
  deletedModal.classList.add("hidden");
}
async function deletereport() {
  var receivedId = localStorage.getItem("id");
  const contractId = { id: receivedId };
  const deleteContractRes = await callPostApi(
    "deleteReports",
    contractId,
    "json"
  );
  try {
    if (deleteContractRes.ok) {
      window.location.href = "./dashboard.html";
    }
  } catch (error) {
    console.log("didn't get response");
  }
}
