const game = document.getElementById("game");

let cardsCount = 4;
const cardsNumberArray = [];
let firstCard = null;
let secondCard = null;

// Создание массива чисел
for (let i = 1; i <= cardsCount; i++) {
  cardsNumberArray.push(i, i);
}

// Перемешивание массива чисел
for (let i = 0; i < cardsNumberArray.length; i++) {
  let randomIndex = Math.floor(Math.random() * cardsNumberArray.length);

  let temp = cardsNumberArray[i];
  cardsNumberArray[i] = cardsNumberArray[randomIndex];
  cardsNumberArray[randomIndex] = temp;
}

// Создание карточек
for (const cardNumber of cardsNumberArray) {
  let card = document.createElement("div");
  card.textContent = cardNumber;
  card.classList.add("card");

  // Клик по карточке
  card.addEventListener("click", function () {
    // Условие, при котором нельзя нажать на одну и ту же карточку для совпадения карт
    if (card.classList.contains("open") || card.classList.contains("success")) {
      return;
    }

    if (firstCard !== null && secondCard !== null) {
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");
      firstCard = null;
      secondCard = null;
    }

    card.classList.add("open");
    // Клик по первой карточке
    if (firstCard === null) {
      firstCard = card;
    } else {
      secondCard = card;
    }

    if (firstCard !== null && secondCard !== null) {
      let firstCardNumber = firstCard.textContent;
      let secondCardNumber = secondCard.textContent;
      // Зеленый цвет при совпадении карточек
      if (firstCardNumber === secondCardNumber) {
        firstCard.classList.add("success");
        secondCard.classList.add("success");
      }
    }

    // Сообщение о победе
    if (
      cardsNumberArray.length === document.querySelectorAll(".success").length
    ) {
      setTimeout(function () {
        alert("Вы победили!");
      }, 500);
    }
  });

  game.append(card);
}
