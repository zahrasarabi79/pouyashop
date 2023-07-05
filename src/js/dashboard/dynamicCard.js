function creatReportcard(obj) {
  const parentCardDiv = document.getElementById("parentCardDiv");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("bg-gray-200");
  cardDiv.classList.add("p-4");
  cardDiv.classList.add("m-4");
  cardDiv.classList.add("h-20");
  cardDiv.classList.add("rounded-2xl");
  cardDiv.classList.add("rounded-lg");
  cardDiv.classList.add("flex");
  cardDiv.classList.add("justify-start");
  cardDiv.classList.add("items-center");
  cardDiv.classList.add("2xl:justify-between");
  const newcard = `
  <!-- info  -->
  <div class="flex items-center justify-between">
    <i
      class="text-xl text-violet-900 fa-solid fa-plane-departure"
    ></i>
    <p class="text-lg p-4 ml-4">شماره قرارداد : ${obj.numContract}</p>
    <p class="text-lg p-4 ml-4">تاریخ قرارداد :${obj.dateContract}</p>
  </div>
  <!-- button -->
  <div
  onclick="showReport(${obj.id})"
    class="flex flex-col items-center justify-center md:flex-row"
  >
    <button
      class="ml-4 text-lg rounded-lg font-semibold bg-purple-400 w-28 h-auto p-2"
    >
      مشاهده
    </button>
    <button
      class="text-lg rounded-lg font-semibold bg-purple-400 w-28 h-auto p-2"
    >
      دانلود
    </button>
  </div>
                `;
  cardDiv.innerHTML = newcard;
  parentCardDiv.appendChild(cardDiv);
  //   console.log(reportDiv.outerHTML);
}
