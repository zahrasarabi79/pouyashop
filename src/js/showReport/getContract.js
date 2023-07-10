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
  const contractType = document.getElementById("contractType");
  contractType.textContent = `${receivedContract.typeReport}`;
  const contractNumber = document.getElementById("contractNumber");
  contractNumber.textContent = `${receivedContract.numContract}`;
  const contractDate = document.getElementById("contractDate");
  contractDate.textContent = `${receivedContract.dateContract}`;
}

async function passengersInfo(receivedContract) {
  const allPassengers = receivedContract.passengers;
  var passengersArray = allPassengers.map((obj) => obj.passenger);
  var passengerName = passengersArray.map((item) => item);
  var passengersName = passengerName.join(", ");
  const passengers = document.getElementById("passengers");
  passengers.textContent = `${passengersName}`;
}

async function reportsInfo(receivedContract) {
  const allReports = receivedContract.report;
  allReports.forEach((obj) => creatReportcard(obj));
}
showContractInfo(contractId);
