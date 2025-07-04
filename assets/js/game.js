const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");
const spanPoints = document.querySelector(".points");
const grid = document.querySelector(".grid");

let currentTime = 0;
let pontos = 0;
const startTimer = () => {
  this.loop = setInterval(() => {
    currentTime++;
    spanTimer.innerHTML = currentTime;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player") || "Jogador";
  loadGame(); // Prepara as cartas

  const loadingScreen = document.getElementById("loading-screen");
  const main = document.querySelector("main");

  setTimeout(() => {
    loadingScreen.classList.add("fade-out");

    setTimeout(() => {
      loadingScreen.style.display = "none";

      // ✨ header já aparece normalmente (sem fade-in)
      // main aparece com fade-in de 1 segundo
      main.style.visibility = "visible";
      main.classList.add("fade-in");

      startTimer(); // inicia jogo logo após mostrar tudo

    }, 1000); // aguarda fade-out do loading
  }, 5000); // tempo da tela de carregamento
};

// Array dos personagens das cartas

const characters = [
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"10",
"11",
"12",
"13",
"14",
"15",
];

//Dobrando o tamanho do array
const duplicateArray = [...characters, ...characters];

//Embaralhar as cartas
const shuffledArray = duplicateArray.sort(() => Math.random() - 0.5);

// Função para criar os elementos
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    
    return element
}

// Criar cartas
const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", revealCard);
    front.style.backgroundImage = `url("../assets/images/${character}.jpg")`;

    card.setAttribute("data-character", character);
    
    return card;
};

// Função iniciar o jogo
const loadGame = () => {

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);
    });
}

// Função para revelar as cartas
let firstCard = "";
let secondCard = "";

const revealCard = ( {target} ) => {

    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === "") {

        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    
    } else if(secondCard === "") {
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
    }

    checkCards();

};

// Função pra checar as cartas
// const checkCards = () => {
    
//     const firstCharacter = firstCard.getAttribute("data-character");
//     const secondCharacter = secondCard.getAttribute("data-character");

//     if (firstCharacter === secondCharacter) {
//         // Quando as cartas forem iguais

//         pontos += 10;

//         firstCard.firstChild.classList.add("disabled-card");
//         secondCard.firstChild.classList.add("disabled-card");

//         firstCard = "";
//         secondCard = "";

//     } else {
//         // Quando as cartas forem diferentes
//         pontos -= 2;

//         setTimeout(() => {
//          firstCard.classList.remove("reveal-card");   
//          secondCard.classList.remove("reveal-card");
//          firstCard = "";
//          secondCard = "";
//         }, 500);
//     }

//     checkEndGame();

// };

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        pontos += 10;
        spanPoints.innerHTML = pontos;

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

    } else {
         pontos -= 2;
         spanPoints.innerHTML = pontos;

        setTimeout(() => {
            firstCard.classList.remove("reveal-card");   
            secondCard.classList.remove("reveal-card");
            firstCard = "";
            secondCard = "";
        }, 500);
    }

    checkEndGame();
};


// Checar o fim do jogo
const checkEndGame = () => {

    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 30) {
        // Acertou todas as cartas

        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currentTime);

        const storagePoints = localStorage.getItem("score");
        const storageTimer = localStorage.getItem("recordTimer");

        if (pontos > storagePoints) {
           localStorage.setItem("recordPoints", pontos) 
        }

        if (currentTime < storageTimer) {
           localStorage.setItem("recordTimer2", currentTime) 
        }

        clearInterval(this.loop);

        if (pontos < 0) {
            window.location.href = "failgame.html"
        } else {
            
            window.location.href = "endgame.html";
        }


        // setTimeout(() => {
            
        //     alert(`Parabéns ${spanPlayer.innerHTML}!
        //            Tempo total: ${currentTime};
        //            Pontos: ${pontos};`
        //         );

        //         if (pontos > localStorage.getItem("score")) {
        //             alert(``)
        //         } else {
                    
        //         }

        //         // window.location.href = "endgame.html"

        //        const dialog = confirm("Gostaria de continuar?");

        //        if (dialog) {
        //            window.location.reload(); 
        //        } else {
        //            window.location.href = "../index.html"; 
        //        } 

        // }, 500);

    }
};
