function creatReportcard(obj) {
  const reportDiv = $(
    "<div class='grid grid-cols-3 gap-4 border border-gray-100 rounded-lg p-4'></div>"
  );
  const newReport = $(`
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

    `);
  reportDiv.html(newReport);
  $("#parentReportDiv").append(reportDiv);
}
