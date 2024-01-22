/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  let countdown = 5;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomSuit() {
    const suits = ["heart", "diamond", "spade", "club"];
    const randomIndex = getRandomNumber(0, suits.length - 1);
    return suits[randomIndex];
  }

  function getRandomValue() {
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A"
    ];
    const randomIndex = getRandomNumber(0, values.length - 1);
    return values[randomIndex];
  }

  const randomCardElement = document.getElementById("randomCard");

  console.log("esta es la carta ------>", randomCardElement);

  const generateCardButton = document.getElementById("generateCardButton");
  const timerElement = document.getElementById("timer");

  const changeSizeButton = document.getElementById("changeSizeButton");
  const inputWidth = document.getElementById("inputWidth");
  const inputHeight = document.getElementById("inputHeight");

  function generateNewCard() {
    const randomSuit = getRandomSuit();
    const randomValue = getRandomValue();

    randomCardElement.innerHTML = `
 <div class="container">
  <div class="row">
    <div class="col-md-3">
      <div class="card">
        <div class="suit text-start ${randomSuit}"></div>
        <div class="rank text-center fs-1 font-weight-bold">${randomValue}</div>
        <div class="suit text-end ${randomSuit}"></div>
      </div>
    </div>
  </div>
</div>
    `;

    clearTimeout(timerTimeout);
    countdown = 10;
    updateTimer();
  }

  let timerTimeout;

  function updateTimer() {
    timerElement.textContent = countdown;

    if (countdown === 0) {
      generateNewCard();
    } else {
      // Reducimos el contador y programamos la próxima actualización
      countdown--;
      timerTimeout = setTimeout(updateTimer, 1000); // Actualizar cada segundo
    }
  }

  // Asignar el controlador de eventos al botón
  generateCardButton.addEventListener("click", generateNewCard);

  // Generar la primera carta al cargar la página
  generateNewCard();

  function changeCardSize() {
    if (inputWidth.value.length < 3 || inputHeight.value.length < 3) {
      alert("Please enter a value of at least 3 digits.");
      return;
    }

    const currentWidth = parseInt(randomCardElement.style.width) || 150;
    const currentHeight = parseInt(randomCardElement.style.height) || 200;

    const maxWidth = 500;
    const maxHeight = 500;

    const newWidth = Math.max(
      parseInt(inputWidth.value) || currentWidth,
      currentWidth
    );
    const newHeight = Math.max(
      parseInt(inputHeight.value) || currentHeight,
      currentHeight
    );

    if (newWidth <= maxWidth && newHeight <= maxHeight) {
      // Select the card element inside randomCardElement
      const cardElement = randomCardElement.querySelector(".card");

      if (cardElement) {
        // Set the width and height of the card
        cardElement.style.width = newWidth + "px";
        cardElement.style.height = newHeight + "px";
      } else {
        console.error("Card element not found");
      }
    } else {
      alert(
        `Please enter valid width and height within the range: ${currentWidth}-${maxWidth} and ${currentHeight}-${maxHeight}`
      );
    }
  }

  changeSizeButton.addEventListener("click", changeCardSize);
};
