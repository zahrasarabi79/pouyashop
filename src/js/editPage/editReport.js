let personCount = 0;
let index = 0;

async function backPage(event) {
  window.location.href = "./dashboard.html";
}

async function getContractInfo() {
  let contractId = localStorage.getItem("id");
  const id = {
    id: contractId,
  };
  const contractInfoRes = await callPostApi("showReports", id, "json");
  try {
    if (contractInfoRes.ok) {
      return (await contractInfoRes.json()).Contracts[0];
    }
  } catch (error) {
    console.log("didn't get response");
  }
}

async function fillInputs() {
  let contractInfo = await getContractInfo();
  console.log(contractInfo);
  const { numContract, typeReport, dateContract, passengers, report } =
    contractInfo;
  document.getElementsByName("typeReport")[0].value = typeReport;
  document.getElementsByName("numContract")[0].value = numContract;
  document.getElementsByName("dateContract")[0].value = dateContract;
  await fillPassengersInput(passengers);
  await fillReportsInput(report);
}

async function fillPassengersInput(passengers) {
  for (passengersObj of passengers) {
    await addPerson(passengersObj);
  }
}

async function addPerson(passengersObj) {
  const passenger = $("#personInput").val()
    ? $("#personInput").val()
    : passengersObj.passenger;
  const personDiv = $(
    "<span class='flex items-center p-4 rounded-lg bg-purple-400'></span>"
  );
  const newPerson = $(`
     <i class= "remove fa-user-minus hover:text-red-600 cursor-pointer fa-solid "></i>
     <h3 id="personName" class="mr-4  text-center">
      ${passenger}
     </h3>
    <input type='hidden' name='passengers[${personCount++}]' value='${passenger}'>
    `);
  personDiv.html(newPerson);
  $("#parentpersonDiv").append(personDiv);
  $("#personInput").val("");
}

async function fillReportsInput(report) {
  report.map(
    async ({ number, costTitle, presenter, bank, payments, datepayment }) => {
      await addPaymentInfo({
        number,
        costTitle,
        presenter,
        bank,
        payments,
        datepayment,
      });
    }
  );
}

async function addPaymentInfo({
  number,
  costTitle,
  presenter,
  bank,
  payments,
  datepayment,
}) {
  const paymentDiv = $(
    "<div class='relative flex bg-gray-50 rounded-lg p-4 mb-4 items-center  justify-between' ></div>"
  );
  const newPayment = $(`
 
    
                          <div class="flex flex-col items-stretch">
                            <!-- input ticket -->
                            <div
                              class="flex flex-col justify-start items-start gap-4 mb-8 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center"
                            >
                              <!-- input number of tickets -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="ml-4 text-lg text-right font-semibold text-violet-900"
                                  for="Ticket"
                                  >تعداد :</label
                                >
                                <input
                                  class="text-lg text-center font-semibold rounded-lg h-10 w-20 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="number"
                                  name="report[${index}][number]"
                                  value="${number ?? ""}"
                                />
                              </div>
                              <!-- info ticket -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="text-center ml-4 text-lg font-semibold text-violet-900"
                                  for="Ticket"
                                  >عنوان هزینه:</label
                                >
                                <input
                                  class="text-lg font-semibold rounded-lg h-10 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="text"
                                  name="report[${index}][costTitle]"
                                  value="${costTitle ?? ""}"
                                />
                              </div>
                              <!-- input presenter -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="ml-4 text-lg font-semibold text-violet-900"
                                  for="Ticket"
                                  >مجری:</label
                                >
                                <input
                                  class="text-lg font-semibold rounded-lg h-10 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="text"
                                  name="report[${index}][presenter]"
                                  value="${presenter ?? ""}"
                                />
                              </div>
                            </div>
                            <!-- input payment -->
                            <div
                              class="flex flex-col justify-start items-start gap-4 mb-8 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center"
                            >
                              <!-- input payment method -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="ml-4 text-lg font-semibold text-violet-900"
                                  for="payment"
                                  >بانک/شرکاء:</label
                                >
                                <input
                                  class="text-lg font-semibold rounded-lg h-10 w-20 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="text"
                                  name="report[${index}][bank]"
                                  value="${bank ?? ""}"
                                />
                              </div>
                              <!--  payment -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="ml-4 text-lg font-semibold text-violet-900"
                                  for="payment"
                                  >مبلغ پرداختی:</label
                                >
                                <input
                                  class="text-lg font-semibold rounded-lg h-10 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="text"
                                  name="report[${index}][payments]"
                                  value="${payments ?? ""}"
                                />
                              </div>
                              <!-- input payment day -->
                              <div class="flex items-center justify-center">
                                <label
                                  class="ml-4 text-lg font-semibold text-violet-900"
                                  for="payment"
                                  >تاریخ پرداخت:</label
                                >
                                <input
                                  class="PersianDate text-lg font-semibold rounded-lg h-10 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                  type="text"
                                  name="report[${index}][datepayment]"
                                  value="${datepayment ?? ""}"
                                />
                              </div>
                            </div>
                            
                          </div>
                          <!-- delete badge -->
                          <i dir="rtl"
                            class=" remove  absolute cursor-pointer  -right-15 text-red-600 text-xl fa-solid fa-circle-xmark"
                            style="top:0"
                          ></i>
                        
                     
                        
   `);
  index++;
  paymentDiv.html(newPayment);
  $("#parentPaymentDiv").append(paymentDiv);
  iranDate();
}

function remove(event) {
  if ($(event.target).hasClass("remove")) {
    $(event.target).parent().remove();
  }
}

function iranDate() {
  $(".PersianDate").map((index, item) => {
    $(item).persianDatepicker({
      initialValue: false,
      format: "YYYY/MM/DD",
    });
  });
}

fillInputs();
