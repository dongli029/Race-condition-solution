let balance = 0; //定義一個全局變量balance

/*設立一個變數去指向new Promise((resolve) => {
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
  const balance = await loadBalance(); //定義一個局部變量 balance接收目前的帳戶金額
  console.log(`賣葡萄前, 帳戶金額為: ${balance}`);
  const newBalance = balance + 50; //定義一個局部變量 newBalance接收賣出葡萄後的帳戶金額
  await saveBalance(newBalance); //更新帳戶金額(把局部變量newBalance 附值給全局變量balance)
  console.log(`賣葡萄後帳戶的金額為${newBalance}.`);
}

//賣蘋果
async function sellApples() {
  const balance = await loadBalance(); //定義一個局部變量 balance接收目前的帳戶金額
  console.log(`賣蘋果前, 帳戶金額為:${balance}`);
  const newBalance = balance + 150; //定義一個局部變量 newBalance接收賣出葡萄後的帳戶金額
  await saveBalance(newBalance); //更新帳戶金額(把局部變量newBalance 附值給全局變量balance)
  console.log(`賣蘋果後帳戶的金額為${newBalance}.`);
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

/*
執行後由於沒有設置lock故會發生race condiction (因為Promise.all([
    sellGrapes(),
    sellApples(),
    sellApples(),
    sellGrapes(),
    sellApples(),
  ])這邊是異步編程, 故各function會一直搶先將各function計算結果附值全局變量 balance)
*/
main();
