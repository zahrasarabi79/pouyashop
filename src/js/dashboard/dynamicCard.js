function creatReportcard(obj) {
  const cardDiv = $(
    "<div class='bg-gray-200 p-4 m-4 h-20 rounded-lg flex justify-start items-center 2xl:justify-between' ></div>"
  );
  const newcard = $(`
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
    
  </div>
                `);
  cardDiv.html(newcard);
  $("#parentCardDiv").append(cardDiv);
}
