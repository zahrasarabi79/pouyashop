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
    const contractId = await response.json();
    return contractId;

    // await getContract(contractId);
  }
}
// async function getContract(contractId) {
//   const contractRes = await callPostApi("showReports", contractId, "json");
//   try {
//     if (contractRes.ok) {
//       return (await contractRes.json()).Contracts[0];
//     }
//   } catch (error) {
//     console.log("didn't get response");
//   }
// }
