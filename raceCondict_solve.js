let balance = 0; //定義一個全局變量balance
let mutex = Promise.resolve(); // 回傳一個已經fullfilled 的 Promise object

/*設立一個變數randomDelay去指向new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
    建構出的 promise 物件(因為呼叫setTimeout()故會在Math.random() * 1000隨機秒數後建立)
    這個隨機時間代表此promise object從pending~fullfilled的時間
*/
const randomDelay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
};

// 顯示目前帳戶金額
async function loadBalance() {
  await randomDelay(); // 要跳脫須等此函數回傳之Promise物件fullfilled, 等個 0~1s的時間(要執行下個動作的隨機等待時間)
  return balance;
}

//將收入存入帳號balance動作
async function saveBalance(value) {
  await randomDelay(); // 要跳脫須等此函數回傳之Promise物件fullfilled, 等個 0~1s的時間(要執行下個動作的隨機等待時間)
  balance = value;
}

//賣葡萄
async function sellGrapes() {
  /*用mutex(已經fullfilled的Promise物件)將包住的程式碼鎖住(Promise object調用的.then()會被放到evenloop中的
    第二優先的microTask queue排隊)
  */
  mutex = mutex
    .then(async () => {
      // 這邊是critical region, 要lock起來等跑完後才繼續執行下一個critical rigion
      const balance = await loadBalance(); //定義一個局部變量 balance接收目前的帳戶金額
      console.log(`賣葡萄前, 帳戶金額為: ${balance}`);
      const newBalance = balance + 50; //定義一個局部變量 newBalance接收賣出葡萄後的帳戶金額
      await saveBalance(newBalance); //更新帳戶金額(把局部變量newBalance 附值給全局變量balance)
      console.log(`賣葡萄後帳戶的金額為${newBalance}.`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex; //把接收到的Promise object mutex回傳
}

//賣蘋果
async function sellApples() {
  /*用mutex(已經fullfilled的Promise物件)將包住的程式碼鎖住(Promise object調用的.then()會被放到evenloop中的
    第二優先的microTask queue排隊)
  */
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance(); //定義一個局部變量 balance接收目前的帳戶金額
      console.log(`賣蘋果前, 帳戶金額為:${balance}`);
      const newBalance = balance + 150; //定義一個局部變量 newBalance接收賣出葡萄後的帳戶金額
      await saveBalance(newBalance); //更新帳戶金額(把局部變量newBalance 附值給全局變量balance)
      console.log(`賣蘋果後帳戶的金額為${newBalance}.`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex; //把接收到的Promise object mutex回傳
}

//呼叫賣葡萄、蘋果後顯示賣完後的帳戶金額
async function main() {
  await Promise.all([
    sellGrapes(),
    sellApples(),
    sellApples(),
    sellGrapes(),
    sellApples(),
  ]); // Promise.all([])可以同時進行[]中的多個upromise callback function(異步執行)
  const balance = await loadBalance();
  console.log(`賣完葡萄與蘋果後的帳戶金額為:${balance}`);
}

// 被呼叫的各function有設置lock後會被放到evenloop的microTask queue排隊, 依序執行, 解決race condition問題
main();
