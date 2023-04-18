//node.js開始掃描, 遇到同步函數直接優先執行
console.log("start");

// 裡面的callbackfunction會被放到eventloop裡優先層級最高的nexttick queue中
process.nextTick(() => {
  console.log("nexttick1");
});

// 裡面的callbackfunction會被放到eventloop裡的timer queue中
setTimeout(() => {
  console.log("settimeout");
}, 0);

// call Promise class的constructor建構子建立promise物件
//call constructor 本身是一個sync function, 所以掃描到這也會直接執行console.log("promise");
//但回傳的promise object要傳過去的.then裡的callback function 要放到第二優先的microTask queue
new Promise((resolve, reject) => {
  console.log("建立promise object1");
  resolve("resolve");
}).then((result) => {
  console.log("promise then");
});

// 直接執行一個async function異步函數(函數外用()包起來代表直接執行)
//直接call一個 async 異步function 也是算是call promise constructor 建立object
//call constructor 本身是一個sync function, 所以掃描到這也會直接執行console.log("async");
(async () => {
  console.log("async");
})();

// setImmediate裡的callback function 會被放到evenloop中的check queue中
setImmediate(() => {
  console.log("setImmediate");
});

//又一個nextTick物件 被放到nextTick queue中
process.nextTick(() => {
  console.log("nextTick2");
});

// 遇到同步sync函數 直接印出
console.log("programming ended!");
