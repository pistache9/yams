const dicesDiv = document.querySelector("#dices");
const throwDicesButton = document.querySelector("#throwDices");
const throwAgainDiv = document.querySelector("#throwAgain");
const gainNumberInput = document.querySelector("#gainNumber");

function diceResult() {
  return Math.floor(6 * Math.random())+1;
}

let dices = [];
let dicesIndexesToThrowAgain = [];
let dicesAreInteractive = true;

throwDicesButton.addEventListener('click', () => {
  for (let i=0; i<5; i++) {
    dices.push(diceResult());
  }
  dicesDiv.innerHTML = "";
  for (let i=0; i<5; i++) {
    dicesDiv.innerHTML += `<button class="dice" id="dice-${i}">${dices[i]}</button>`;
  }
  document.querySelector("#throwDices").classList.toggle("hidden");
  document.querySelector("#throwAgain").classList.toggle("hidden");
  calculateCombo()
})

function calculateCombo() {
  let comboDiv = document.querySelector("#combo");
  if (dices[0] === dices[1] === dices[2] === dices[3] === dices[4]) {
    comboDiv.innerHTML = "YAMS!!! 🍰🎂🍰";
    gainPastries(3);
  } else {
    let doubles = [];
    for (let i=1; i<7; i++) {
      if (dices.filter(x => x === i).length === 4) {
        comboDiv.innerHTML = "CARRÉ 🍰🎂";
        gainPastries(2);
        return
      } else if (dices.filter(x => x === i).length > 1) {
        doubles.push(i);
      }
    }
    if (doubles.length === 2) {
      comboDiv.innerHTML = "DOUBLE PAIRE 🍰";
      gainPastries(1);
    } else {
      comboDiv.innerHTML = "Pas de gain :(";
      gameLost();
    }
  }
}

dicesDiv.onclick = (e) => {
    if (!dicesAreInteractive) return;
    let indexClicked = e.target.id[5];
    if (!indexClicked) return
    if (dicesIndexesToThrowAgain.includes(parseInt(indexClicked))) {
      dicesIndexesToThrowAgain.splice(dicesIndexesToThrowAgain.indexOf(parseInt(indexClicked)), 1)
    } else {
      dicesIndexesToThrowAgain.push(parseInt(indexClicked));
    }
    let diceDiv = Array.from(dicesDiv.children)[parseInt(indexClicked)];
    diceDiv.classList.toggle("selected");
}

function throwAgainSomeDices(indexes) {
  for (let index of indexes) {
    dices[index] = diceResult();
    let diceDiv = Array.from(dicesDiv.children)[index];
    diceDiv.innerHTML = dices[index];
  }
  for (index of dicesIndexesToThrowAgain) {
    let dicesDivs = Array.from(dicesDiv.children);
    dicesDivs[index].classList.toggle("selected");
  }
  dicesIndexesToThrowAgain = [];
  document.querySelector("#throwAgain").classList.add("invisible");
  dicesAreInteractive = false;
  calculateCombo()
}

throwAgainDiv.addEventListener('click', () => {
  throwAgainSomeDices(dicesIndexesToThrowAgain)
})

function gainPastries(n) {
  gainNumberInput.value = n;
  clignotementScreen();
  document.querySelector("#getGain").classList.toggle("hidden");
}

function clignotementScreen() {
  let body = document.querySelector("body");
  for (let i=0; i<6; i++) {
    setTimeout(()=>{body.classList.toggle("lime-bg")}, i*100)
  }
}
