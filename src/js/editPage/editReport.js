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
    // return passengersObj;
  }
}
let personCount = 0;
async function addPerson(passengersObj) {
  const personInput = document.getElementById("personInput");
  const passenger = personInput.value
    ? personInput.value
    : passengersObj.passenger;
  const parentpersonDiv = document.getElementById("parentpersonDiv");
  const personDiv = document.createElement("span");
  personDiv.classList.add("preson-style");
  const newPerson = `
   <i
    class= "remove fa-user-minus hover:text-red-600 cursor-pointer fa-solid "
  ></i>
  <h3 id="personName" class="mr-4  text-center">
    ${passenger}
  </h3>

  <input type='hidden' name='passengers[${personCount++}]' value='${passenger}'>
  `;
  personDiv.innerHTML = newPerson;
  parentpersonDiv.appendChild(personDiv);
  personInput.value = "";

  // دیو بالاتر از دیوی که ساختیم
}
// async function addPersonByClick() {
//   const personInput = document.getElementById("personInput");
//   console.log(personInput.value);
//   return personInput.value;
//   // const parentpersonDiv = document.getElementById("parentpersonDiv");
//   //  let personCount = 0;
//   // const personDiv = document.createElement("span");
//   // personDiv.classList.add("preson-style");
//   // const newPerson = `
//   //   <i
//   //    class= "remove fa-user-minus hover:text-red-600 cursor-pointer fa-solid "
//   //  ></i>
//   //  <h3 id="personName" class="mr-4  text-center">
//   //    ${personInput.value}
//   //  </h3>

//   //  <input type='hidden' name='passengers[${personCount++}]' value='${
//   //   personInput.value
//   // }'>
//   //  `;
//   // personDiv.innerHTML = newPerson;
//   // parentpersonDiv.appendChild(personDiv);
//   // personInput.value = "";
//   // دیو بالاتر از دیوی که ساختیم
// }
let index = 0;
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
  const paymentDiv = document.createElement("div");
  paymentDiv.classList.add("payment-style");
  paymentDiv.classList.add("parentPaymentDiv");
  paymentDiv.classList.add("relative");

  const newPayment = `
 
    <form

                      class="ticketForm  flex bg-gray-50 rounded-lg p-4 mb-4  justify-between"
                        >
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
                            class=" remove  absolute cursor-pointer top-0 -right-15 text-red-600 text-xl fa-solid fa-circle-xmark"
                          ></i>
                        
                        
                        </form>
                        
   `;

  index++;
  paymentDiv.innerHTML = newPayment;
  parentPaymentDiv.appendChild(paymentDiv);
  iranDate() 
}
function remove(event) {
  const item = event.target;
  const classList = [...item.classList];
  const parentItem = item.parentElement;

  if (classList[0] === "remove") {
    parentItem.remove();
  }
}
function iranDate() {
  const inputs = document.getElementsByClassName("PersianDate");
  $(inputs).map((index, item) => {
    $(item).persianDatepicker({
      observer: true,
      format: "YYYY/MM/DD",
    });
  });
}
fillInputs();
