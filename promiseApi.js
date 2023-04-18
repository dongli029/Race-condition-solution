const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

/*
Promise API作法
*/
//叫用 Promise constructor傳入參數(一個函數,此函數參數為resolve & reject函數)建立一個Promise物件
// 若Promise物件被fullfilled 調用resolve函數, 反之調用reject函數(此兩個函數又分別有一個參數, 此參數可以是任何data type)
function alarm(person, delay) {
  //將建立的promise物件回傳
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject("delay不能小於0");
    } else {
      setTimeout(() => {
        resolve(person + "! WAKE UP!!");
      }, delay);
    }
  });
}

button.addEventListener("click", async () => {
  try {
    let result = await alarm(name.value, delay.value);
    output.innerHTML = result;
  } catch (e) {
    output.innerHTML = e;
  }
});

// promise .then().catch()寫法, 結果與上面相同
// button.addEventListener("click", (e) => {
//   let promiseObject = alarm(name.value, delay.value);
//   promiseObject
//     .then((message) => {
//       //message是alarm(name.value, delay.value)return的結果
//       output.innerHTML = message;
//     })
//     .catch((e) => {
//       output.innerHTML = e;
//     });
// });

/*
第一種一般作法
*/

// function alarm(person, delay) {
//   setTimeout(() => {
//     output.innerHTML = person + "WAKE UP!!!";
//   }, delay);
// }

// button.addEventListener("click", (e) => {
//   alarm(name.value, delay.value);
// });
