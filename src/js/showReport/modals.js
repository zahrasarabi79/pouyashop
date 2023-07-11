function deletedModals() {
  $("#deletedModal").removeClass("hidden");
}
function closedeletedModals() {
  $("#deletedModal").addClass("hidden");
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
