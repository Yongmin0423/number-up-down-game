//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 Down!!
// 랜덤 번호 > 유저 번호 UP!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다.(더 이상 추측 불가, 버튼이 disable이 된다.)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
const playButton = document.getElementById("play-button");
const userInput = document.getElementById("user-input");
const resultArea = document.getElementById("result-area");
const resetButton = document.getElementById("reset-button");
const chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
const history = [];
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

pickRandomNum();

function play(event) {
  event.preventDefault();
  const userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "Please write a number between 1 and 100";
    return; //함수를 종료 시키는 역할. return값은 따로 없음.
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "you already write this number. Please write another number";
    return;
  }

  chances--;
  chanceArea.textContent = `The Chances, you have:${chances}`;

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = `That's right!! The Number is ${computerNum}!`;
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }

  if (userValue == computerNum) {
    playButton.disabled = true;
  }
}

function reset(event) {
  event.preventDefault();
  // user input창이 깨끗하게 정리되고
  userInput.value = "";
  // 새로운 번호가 생성되고
  pickRandomNum();

  resultArea.textContent = "you can see the result here!";
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});
