//  با فرم . سریالایز کال می کنیم
HTMLElement.prototype.serialize = function () {
  var obj = {};
  // همه اینپوت ها ، سلکتور ها و تکس اریا ها رو انتخاب می کنه از داخل فرم و میریزه داخل المنت
  var elements = this.querySelectorAll("input, select, textarea");
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    // باید حتما اینپوت ها نیم داشته باشن وگرنه کار نمیکنه
    var name = element.name;
    var value = element.value;
    //  اگر المنت نیم داشت ما می آیم یه آبجکت از کی ولیو میسازیم
    if (name) {
      obj[name] = value;
    }
  }
  return obj;
};
function convertObjToUrlEncode(obj) {
  return Object.keys(obj)
    .map(function (key) {
      return key + "=" + obj[key];
    })
    .join("&");
}
async function callApi(endpoint, method, data, contentType) {
  const body = method == "post" ? data : undefined;
  let url = "http://localhost:3001/" + endpoint;
  url = method == "get" ? url + "?" + data : url;

  return await fetch(url, {
    method,
    headers: {
      "Content-Type":
        contentType == "json"
          ? "application/json"
          : "application/x-www-form-urlencoded",
      Authorization: localStorage.myToken
        ? `Bearer ${localStorage.myToken}`
        : undefined,
    },
    body:
      contentType == "json"
        ? JSON.stringify(body)
        : convertObjToUrlEncode(body),
  });
}
function callPostApi(endpoint, data, contentType) {
  return callApi(endpoint, "post", data);
}
function callGetApi(endpoint, data, contentType) {
  return callApi(endpoint, "get", data);
}

async function backToList(endpoint, data, contentType) {
  console.log("gfdg");
  try {
    const response = await callPostApi(endpoint, data, contentType);
    if (response.ok) {
      window.location.href = "./dashboard.html";
    } else {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log("didn't get response");
  }
}
// لینک این فانکش رو اول فایل اچ تی ام ال می گذاریم تا به عنوان اولین فانکشن فراخوانی شود. در این حالت با لود پیج در صورت وجود توکن از صفحه خارج نمی شویم
(() => {
  if (!localStorage.myToken && window.location.href.indexOf("login.html") < 0)
    window.location.href = "http://localhost:5500/public/login.html";
  else if (
    localStorage.myToken &&
    window.location.href.indexOf("login.html") >= 0
  )
    window.location.href = "http://localhost:5500/public/dashboard.html";
})();
// async function showContractInfo(receivedContract) {
//   if (receivedContract) {
//     const contractType = document.getElementById(contractType);
//     contractType.textContent = `${receivedContract.id}`;
//     console.log(receivedContract);
//   } else {
//     console.log("Contract not saved in local storage.");
//   }
// }
// get response
async function getResponse(users) {
  try {
    const response = await callPostApi("login", users, "json");

    checkResponse(response, users);
  } catch (error) {
    console.log("didn't get response");
  }
}
// save token in storage
let getTokenStorage;
const getstoragetoken = async (Token) => {
  localStorage.setItem("myToken", Token);
};
// let week;
// async function getContract(contractId) {
//   const contractRes = await callPostApi("showReports", contractId, "json");
//   try {
//     if (contractRes.ok) {
//       const contractObj = await contractRes.json();
//       return contractObj.Contracts[0];
//     }
//   } catch (error) {
//     console.log("didn't get response");
//   }
// }
