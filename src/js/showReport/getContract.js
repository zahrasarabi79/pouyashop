let receivedId = localStorage.getItem("id");
const contractId = {
  id: receivedId,
};
async function getContract(contractId) {
  const contractRes = await callPostApi("showReports", contractId, "json");
  try {
    if (contractRes.ok) {
      const contractObj = await contractRes.json();
      return contractObj.Contracts[0];
    }
  } catch (error) {
    console.log("didn't get response");
  }
}

async function showContractInfo(id) {
  let receivedContract = await getContract(id);
  if (receivedContract) {
    await contrcactInfo(receivedContract);
    await passengersInfo(receivedContract);
    await reportsInfo(receivedContract);
  } else {
    console.log("Contract not saved in local storage.");
  }
}

async function contrcactInfo(receivedContract) {
  $("#contractType").text(`${receivedContract.typeReport}`);
  $("#contractNumber").text(`${receivedContract.numContract}`);
  $("#contractDate").text(`${receivedContract.dateContract}`);
}

async function passengersInfo(receivedContract) {
  const allPassengers = receivedContract.passengers;
  let passengersArray = $.map(allPassengers, (obj) => obj.passenger);
  let passengerName = $.map(passengersArray, (item) => item);
  let passengersName = passengerName.join(", ");
  $("#passengers").text(`${passengersName}`);
}

async function reportsInfo(receivedContract) {
  const allReports = receivedContract.report;
  allReports.forEach((obj) => creatReportcard(obj));
}
showContractInfo(contractId);
