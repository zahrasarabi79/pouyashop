function creatReportcard(obj) {
  const parentReportDiv = document.getElementById("parentReportDiv");
  const reportDiv = document.createElement("div");
  reportDiv.classList.add("grid");
  reportDiv.classList.add("grid-cols-3");
  reportDiv.classList.add("gap-4");
  reportDiv.classList.add("border");
  reportDiv.classList.add("border-gray-100");
  reportDiv.classList.add("rounded-lg");
  reportDiv.classList.add("p-4");

  const newReport = `
        <div  class="flex flex-row gap-4">
      <p>مجری:</p>
      <span id="presenter">${obj.presenter}</span>
    </div>
    <div id="contract-type" class="flex flex-row gap-2">
      <p>نوع هزینه:</p>
    <span  id="contractType">${obj.costTitle}</span>
    </div>
    <div id="contract-type" class="flex flex-row gap-2">
      <p>تعداد:</p>
      <span>${obj.number}</span>
    </div>
    <div id="contract-type" class="flex flex-row gap-2">
      <p>مبلغ پرداختی:</p>
      <span>${obj.payments}</span>
    </div>
    <div id="contract-type" class="flex flex-row gap-2">
      <p>تاریخ پرداخت:</p>
      <span>${obj.datepayment}</span>
    </div>
    <div id="contract-type" class="flex flex-row gap-2">
      <p>بانک/شرکاء:</p>
      <span>${obj.bank}</span>
    </div>

    `;
  reportDiv.innerHTML = newReport;
  parentReportDiv.appendChild(reportDiv);
//   console.log(reportDiv.outerHTML);
}
