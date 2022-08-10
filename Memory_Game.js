const gameContainer = document.getElementById("game");

const COLORS = [
  "#5c0e30",
  "#5e8ff7",
  "#67cf96",
  "#f5794c",
  "#5d11f5",
  "#5c0e30",
  "#5e8ff7",
  "#67cf96",
  "#f5794c",
  "#5d11f5"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    const emojiDiv = document.createElement('span');

    newDiv.classList.add(color);
    newDiv.append(emojiDiv);
    // emojiDiv.classList.add(color);
    emojiDiv.setAttribute('id', 'emoji')
    emojiDiv.innerHTML = '&#127752;';

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

let flippedCards = 0;
let card1;
let card2;
let noClicking = false;

function handleCardClick(e) {
    if (noClicking) return;
  if (e.target.classList.contains('flipped')) return;

  let clickedCard = e.target;
  clickedCard.style.backgroundColor = clickedCard.getAttribute('class');

  if (!card1 || !card2) {
    clickedCard.classList.add('flipped');
    card1 = card1 || clickedCard;
    // card2 = clickedCard === card1 ? null : clickedCard;
    if (clickedCard === card1) {
      card2 = null;
    }
    if (clickedCard !== card1) {
      card2 = clickedCard;
    }
  }

  if (card1 && card2) {
    noClicking = true;
    let value1 = card1.className;
    let value2 = card2.className;

    if (value1 === value2) {
      flippedCards += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout (function(){
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
  if (flippedCards === COLORS.length) {
    clickedCard.style.backgroundColor = clickedCard.getAttribute('class');
    setTimeout(function() {
        alert('YOU WON!');
    }, 250);
  } 
}

// when the DOM loads
createDivsForColors(shuffledColors);