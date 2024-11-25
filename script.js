console.log("Script Loaded...");

document.addEventListener("DOMContentLoaded", () => {
  console.log('Le DOM est chargé...');
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", appHeight);
appHeight();

// Example simple ////////////////////////////////////////
// const VALORANT = 40;
// const LOL = 30;
// const HEARTHSTONE = 15;

// const TIME_TO_PLAY = 240;

// let remainingTime = TIME_TO_PLAY;

// const maxOfValorant = remainingTime / VALORANT;

// const numberOfValorant = Math.floor(
//   Math.random() * (Math.floor(maxOfValorant) + 1)
// );
// const timeValorant = numberOfValorant * VALORANT;

// remainingTime -= timeValorant;

// const maxOfLol = remainingTime / LOL;
// const numberOfLol = Math.floor(Math.random() * (Math.floor(maxOfLol) + 1));
// const timeLol = numberOfLol * LOL;

// remainingTime -= timeLol;

// const maxOfHeartstone = Math.floor(remainingTime / HEARTHSTONE);
// const numberOfHeartstone = maxOfHeartstone * HEARTHSTONE;

// remainingTime -= numberOfHeartstone;

// console.log(
//   `Je peux faire ${numberOfValorant} partie(s) de Valorant, ${numberOfLol} partie(s) de Lol, ${maxOfHeartstone} partie(s) de Hearthstone, et il restera ${remainingTime} minute(s)`
// );

// Equivalent avec des boucles ////////////////////////////////////////
// const GAMES = [
//   { name: "Valorant", duration: 40 },
//   { name: "LoL", duration: 30 },
//   { name: "Hearthstone", duration: 15 },
// ];

// const TIME_TO_PLAY = 240;

// let remainingTime = TIME_TO_PLAY;
// const results = [];

// for (const game of GAMES) {
//   let count = 0;
//   const maxPossible = Math.floor(remainingTime / game.duration);
//   const maxRandom = Math.floor(Math.random() * (maxPossible + 1)); // Random maximum
//   while (count < maxRandom && remainingTime >= game.duration) {
//     count++;
//     remainingTime -= game.duration;
//   }
//   results.push({ name: game.name, count });
// }

// console.log(
//   results
//     .map((game) => `Je peux faire ${game.count} partie(s) de ${game.name}`)
//     .join(", ") + `, et il restera ${remainingTime} minute(s).`
// );

// Refactorisation et découverte des fonctions ////////////////////////////////////////
// const VALORANT = 40;
// const LOL = 30;
// const HEARTHSTONE = 15;
// const TIME_TO_PLAY = 240;

const valorantElement = document.getElementById("valo");
const lolElement = document.getElementById("lol");
const hearthstoneElement = document.getElementById("hearthstone");
const timeToPlay = document.getElementById("time-to-play");
const form = document.querySelector(".form");
const buttonReset = document.getElementById("reset");
const alertElement = document.querySelector(".alert");

buttonReset.addEventListener("click", () => {
  alertElement.classList.remove("fade-in");
});

// console.log("valo", valorantElement, valorantElement.value);
// console.log("lol", lolElement, lolElement.value);
// console.log("hearthstone", hearthstoneElement, hearthstoneElement.value);
// console.log("Temps de jeu", timeToPlay, timeToPlay.value);

function listenerChange(element, libelle = "default") {
  element.addEventListener("input", () => {
    console.log("Valeur de l'input", libelle, element.value);
  });
}

const listenerChangeArrow = (element, libelle = "default") => {
  element.addEventListener("input", (event) => {
    const value = event.target.value;
    element.value = value.replace(/[^0-9]/g, "");
    console.log("Valeur de l'input", libelle, element.value);
  });
};

function calculateGames(time, gameTime) {
  return Math.floor(time / gameTime);
}

function allocateTime(time, gameTime, needRandom = true) {
  const maxGames = calculateGames(time, gameTime);
  if (!needRandom) {
    const timeUsed = maxGames * gameTime;
    return { numberOfGames: maxGames, timeUsed };
  }

  const numberOfGames = Math.floor(Math.random() * (maxGames + 1));
  const timeUsed = numberOfGames * gameTime;
  return { numberOfGames, timeUsed };
}

// let remainingTime = TIME_TO_PLAY;

// const valorant = allocateTime(remainingTime, VALORANT);
// remainingTime -= valorant.timeUsed;

// const lol = allocateTime(remainingTime, LOL);
// remainingTime -= lol.timeUsed;

// const hearthstone = allocateTime(remainingTime, HEARTHSTONE, false);
// remainingTime -= hearthstone.timeUsed;

// console.log(
//   `Je peux faire ${valorant.numberOfGames} partie(s) de Valorant, ${lol.numberOfGames} partie(s) de LoL, et ${hearthstone.numberOfGames} partie(s) de Hearthstone, avec ${remainingTime} minute(s) restante(s).`
// );

function submitForm() {
  const inputs = form.querySelectorAll(".form-input");

  if (!inputs) {
    alertElement.children[0].textContent = "Une erreur est survenue !";
    alertElement.classList.add("fade-in");
    return;
  }

  const inputsValid = Array.from(inputs).map((input) => {
    const value = input.children[1].value;

    if (!value) {
      return {
        valid: false,
      };
    }

    return {
      valid: true,
    };
  });

  if (!inputsValid.every((input) => input.valid)) {
    alertElement.children[0].textContent =
      "Vérifie que tous les champs soient bien remplis !";
    alertElement.classList.add("fade-in");
    return;
  }

  let remainingTime = timeToPlay.value ?? 240;

  const valorant = allocateTime(remainingTime, valorantElement.value);
  remainingTime -= valorant.timeUsed;

  const lol = allocateTime(remainingTime, lolElement.value);
  remainingTime -= lol.timeUsed;

  const hearthstone = allocateTime(
    remainingTime,
    hearthstoneElement.value,
    false
  );
  remainingTime -= hearthstone.timeUsed;

  console.log(
    `Je peux faire ${valorant.numberOfGames} partie(s) de Valorant, ${lol.numberOfGames} partie(s) de LoL, et ${hearthstone.numberOfGames} partie(s) de Hearthstone, avec ${remainingTime} minute(s) restante(s).`
  );

  alertElement.children[0].textContent = `Je peux faire ${valorant.numberOfGames} partie(s) de Valorant, ${lol.numberOfGames} partie(s) de LoL, et ${hearthstone.numberOfGames} partie(s) de Hearthstone, avec ${remainingTime} minute(s) restante(s).`;
  alertElement.classList.add("fade-in");
}

listenerChangeArrow(valorantElement, "Valorant");
listenerChangeArrow(lolElement, "League of Legends");
listenerChangeArrow(hearthstoneElement, "Hearthstone");
listenerChangeArrow(timeToPlay, "Temps de jeu");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
});
