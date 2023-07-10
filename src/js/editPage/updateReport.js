async function formInput(e) {
  e.preventDefault();
  let data = e.target.serialize();
  data.id = localStorage.getItem("id");
  try {
    console.log(data);
    const newContractInfo = await getNewContractInfo(data);
    localStorage.setItem("id", newContractInfo.findContract.id);
    window.location.href = "./showReports.html";
  } catch (error) {
    console.log("false");
  }
}
async function getNewContractInfo(data) {
  const newContractInfoRes = await callPostApi("updateReports", data);
  try {
    if (newContractInfoRes.ok) {
      return await newContractInfoRes.json();
    }
  } catch (error) {
    console.log("didn't get response");
  }
}
