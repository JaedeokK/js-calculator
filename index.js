const processBox = document.querySelector(".js-process"),
  resultBox = document.querySelector(".js-result");

const resetBtn = document.querySelector(".js-reset");
const numBtn = document.querySelectorAll(".js-number");
const operatorBtn = document.querySelectorAll(".js-operator");

const row = document.querySelectorAll(".cal__row");

let processArray = [];

let operatorPossible = false;
let operatorClicked = false;
let equalClicked = false;
let resetClicked = false;
let zeroPossible = false;

const btnZero = numBtn[9];

function paintResultBox(text) {
  resultBox.textContent = resultBox.textContent + text;
  if (operatorClicked == true || resetClicked == true) {
    resultBox.textContent = text;
    resetClicked = false;
  }
}

function paintProcessBox(text) {
  processBox.textContent = text;
}

function joinProcessArray() {
  const joinArray = processArray.join("");
  if (operatorClicked == true) {
    paintProcessBox(joinArray);
  }
}

function oneToNine(btn) {
  if (equalClicked == true) {
    paintProcessBox("");
  }
  processArray.push(btn.textContent);
  paintResultBox(btn.textContent);
  operatorPossible = true;
  operatorClicked = false;
  equalClicked = false;
  zeroPossible = true;
}

function zeroToNine(btn) {
  if (equalClicked == true) {
    paintProcessBox("");
  }
  processArray.push(btn.textContent);
  paintResultBox(btn.textContent);
  operatorPossible = true;
  operatorClicked = false;
  equalClicked = false;
}

function handleNumber(event) {
  const btn = event.target;
  if (btn !== btnZero) {
    oneToNine(btn);
  } else if (zeroPossible == true) {
    zeroToNine(btn);
  }
  //입력값이 없을 경우, 마지막 입력값이 연산자인경우 0입력을 막는다.
}

function clickOperate(btn) {
  if (
    operatorClicked == false &&
    operatorPossible == true &&
    btn.value !== "="
    //평상시 계산
    // 숫자를 입력했을때, 마지막 입력값이 연산자가 아닐 때 입력 가능
  ) {
    operatorClicked = true;
    operatorPossible = false;
    equalClicked = false;
    const solution = eval(processBox.textContent + resultBox.textContent);
    paintResultBox(solution);
    processArray.push(btn.textContent);
    joinProcessArray();
    //연산자 클릭 시 equal을 클릭하지 않아도 연산 결과를 result박스에 보여준다.
  } else if (
    operatorClicked == true &&
    equalClicked == false &&
    btn.value !== "="
    //연산자 클릭 후 다른 연산자 클릭시  이전에 선택한 연산자 변경
  ) {
    processArray.pop();
    processArray.push(btn.textContent);
    joinProcessArray();
    equalClicked = false;
  }
  if (equalClicked == true && btn.value !== "=") {
    //equal 버튼 클릭 후 연산자 클릭 시 result박스 textContent로 연산
    processArray.push(resultBox.textContent);
    processArray.push(btn.textContent);
    paintResultBox("");
    joinProcessArray();
    equalClicked = false;
  }
  zeroPossible = false;
}

function clickEqual(btn) {
  if (
    operatorClicked == false &&
    operatorPossible == true &&
    equalClicked == false &&
    btn.value == "="
    //equal 버튼 클릭 시 processBox의 textContent 연산
    //숫자와 연산자를 입력했을때 입력 가능
  ) {
    processArray.push(btn.textContent);
    operatorClicked = true;
    operatorPossible = false;
    joinProcessArray();
    processArray.pop();
    const joinArray = processArray.join("");
    resultBox.textContent = eval(joinArray);
    processArray = [];
    equalClicked = true;
  }
}

function handleOperation(event) {
  const btn = event.target;
  clickOperate(btn);
  clickEqual(btn);
}

function handleReset() {
  processArray = [];
  processBox.textContent = "";
  resultBox.textContent = "0";
  operatorClicked = false;
  operatorPossible = false;
  zeroPossible = false;
  equalClicked = false;
  resetClicked = true;
}

function handleClick() {
  numBtn.forEach(function (element) {
    element.addEventListener("click", handleNumber);
  });
  operatorBtn.forEach(function (element) {
    element.addEventListener("click", handleOperation);
  });
  resetBtn.addEventListener("click", handleReset);
}

function init() {
  handleClick();
}

init();
