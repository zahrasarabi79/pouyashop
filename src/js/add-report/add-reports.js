const personInput = document.querySelector("#personInput");
const addPersonBtn = document.getElementById("addPersonBtn");
const oldpersonDiv = document.getElementById("personDiv");
const deleteDiv = document.querySelector(".deleteDiv");
const parentPaymentDiv = document.getElementById("parentPaymentDiv");
// const addPaymentbtn = document.querySelector(".addPaymentbtn");
// addPersonBtn.addEventListener("click", addPerson);
// oldpersonDiv.addEventListener("click", remove);
// deleteDiv.addEventListener("click", remove);
let personCount = 0;
async function addPerson() {
  const personDiv = document.createElement("span");
  personDiv.classList.add("preson-style");
  const newPerson = `
   <i
    class= "remove fa-user-minus hover:text-red-600 cursor-pointer fa-solid "
  ></i>
  <h3 id="personName" class="mr-4  text-center">
    ${personInput.value}
  </h3>

  <input type='hidden' name='passengers[${personCount++}]' value='${
    personInput.value
  }'>
  `;
  personDiv.innerHTML = newPerson;
  oldpersonDiv.appendChild(personDiv);
  // دیو بالاتر از دیوی که ساختیم
  personInput.value = "";
}
function remove(event) {
  const item = event.target;
  const classList = [...item.classList];
  const parentItem = item.parentElement;

  if (classList[0] === "remove") {
    parentItem.remove();
  }
}

let reportCounter = 1;

function addPaymentInfo() {
  const paymentDiv = document.createElement("div");
  paymentDiv.classList.add("payment-style");
  paymentDiv.classList.add("parentPaymentDiv");
  const newPayment = `
  <form
                        
                    class="ticketForm relative flex bg-gray-50 rounded-lg p-4 mb-4  justify-between"
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
                                name="report[${reportCounter}][number]"
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
                                name="report[${reportCounter}][costTitle]"
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
                                name="report[${reportCounter}][presenter]"
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
                                name="report[${reportCounter}][bank]"
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
                                name="report[${reportCounter}][payments]"
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
                                class="text-lg font-semibold rounded-lg h-10 p-4 focus:outline-violet-900 bg-gray-100 border border-gray-200"
                                type="text"
                                name="report[${reportCounter}][datepayment]"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- delete badge -->
                        <i
                          class="remove absolute cursor-pointer top-0 -right-15 text-red-600 text-xl fa-solid fa-circle-xmark"
                        ></i>
                      </form>
 `;
  reportCounter++;
  paymentDiv.innerHTML = newPayment;
  parentPaymentDiv.appendChild(paymentDiv);
  // console.log(paymentDiv.outerHTML);
}
