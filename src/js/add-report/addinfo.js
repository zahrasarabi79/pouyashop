async function formInput(e) {
  e.preventDefault();
  let data = e.target.serialize();
  try {
    const response = await callPostApi("AddReports", data);
    if(response.ok){
      window.location.href = "./showReports.html";
    }
  } catch (error) {
    console.log("didn't get response");
  }
}

