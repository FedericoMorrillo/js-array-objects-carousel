"use strict";
// funzioni
function thumbnailsActive(){
  // Rimuoviamo la classe active da tutte le miniature
  const thumbnails = document.querySelectorAll(".thumbnail");
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.remove("active", "yellow");
    thumbnails[currentItem].classList.add("active","yellow");
  }
}
function updateCarousel() {
  // Rimuoviamo la classe "active" da tutte le slide
  const items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }

  // Aggiungiamo la classe "active" alla slide corrente
  items[currentItem].classList.add("active");
}
function startLoop(){
  domItem[currentItem].classList.remove("active");

  // Incrementa currentItem e controlla il modulo per il ciclo circolare
  //incremento      //ciclo circolare
  currentItem = (currentItem + 1) % domItem.length;

  domItem[currentItem].classList.add("active");
  thumbnailsActive();
}
function startLoopReverse(){
  domItem[currentItem].classList.remove("active");

  // decrementa currentItem e controlla il modulo per il ciclo circolare
  //decremento          //ciclo circolare
  currentItem = (currentItem - 1 + domItem.length) % domItem.length;

  domItem[currentItem].classList.add("active");
  thumbnailsActive();
}

//dichiarazioni***********************************************
// array di immagini
const images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
const descrizioni = [
  {
    url: "01.jpg",
    titolo: "Elden Ring",
    descrizione: "Combatti nell' interregno e divieni il nuovo lord ancestrale"
  },
  {
    url: "02.jpg",
    titolo: "Final Fantasy 7 Remake",
    descrizione: "Rivivi la storia di Cloud Strife per salvare il mondo"
  },
  {
    url: "03.jpg",
titolo: "Uncharted 4",
descrizione:"Torna alla ricerca di un nuovo tesoro"
  },
  {
    url:"04.jpg",
titolo: "Jak 3",
descrizione: "Acquisisci nuovi poteri e salva la città di Heaven City"
  },
  {
    url: "05.jpg",
titolo: " Baldur's Gate 3",
descrizione: "ritorna nei Forgotten Realms e vivi emozionanti avventure"
  }
];

//ci prendiamo dall' html il div items
const items = document.querySelector(".items");

//ci prendiamo dall' html il div prev e next
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//ci prendiamo dall' html il contenitore delle thumbsnail e le thumbnails
const thumbnailsContainer = document.querySelector(".thumbnails");
const thumbnails = thumbnailsContainer.querySelectorAll(".thumbnail");

//posizione di partenza del ciclo
let currentItem = 0;

//buttons
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const startReverse = document.getElementById("start-reverse")

//dichiarazioni**************************************************

//inizio ciclo
for (let i = 0; i < descrizioni.length; i++) {
  //SLIDE***********************************************

  //creiamo il div per le slide
  const item = document.createElement("div");

  //gli assegniamo una classe
  item.classList.add("item");

  //assegniamo la classe active per far vedere l immagine
  if (currentItem === i) {
    item.classList.add("active");
  }

  //creiamo l' elemento img
  const img = document.createElement("img");

  // associamo il percorso file
  img.src = `img/${descrizioni[i].url}`;

  //appendiamo l immagine al div contenitore
  item.append(img);

  //appendiamo le slide nel suo contenitore
  items.append(item);

  // Creiamo un div per il titolo e la descrizione
const text = document.createElement("div");
text.classList.add("text");

// Aggiungiamo titolo e descrizione 
const titleElement = document.createElement("h3");
titleElement.textContent = descrizioni[i].titolo;

const descriptionElement = document.createElement("p");
descriptionElement.textContent = descrizioni[i].descrizione;

text.append(titleElement);
text.append(descriptionElement);

item.append(text);

  //SLIDE***************************************************

  //THUMBNAILS**********************************************

  //creiamo il div per le thumbnails
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  // Creiamo l'immagine della miniatura
  const thumbnailImg = document.createElement("img");
  thumbnailImg.src = `img/${descrizioni[i].url}`;

  thumbnailImg.addEventListener("click", function () {
    // Cambia la slide principale quando la miniatura viene cliccata
    currentItem = i;
    updateCarousel();
  });

  // Aggiungiamo l'immagine alla miniatura
  thumbnail.append(thumbnailImg);

  // Aggiungiamo la miniatura al contenitore delle miniature
  thumbnailsContainer.append(thumbnail);

  //THUMBNAILS**********************************************
}

//selezioniamo tutte le slide del contenitore items
const domItem = document.querySelectorAll(".item");

console.log(domItem);

//aggiungiamo eventi on click sulle frecce
prev.addEventListener("click", function () {
  if(eventoAttivo){
  //stampa la posizione della slide corrente
  console.log(currentItem);

  domItem[currentItem].classList.remove("active");

  // decrementa currentItem e controlla il modulo per il ciclo circolare
  //decremento          //ciclo circolare
  currentItem = (currentItem - 1 + domItem.length) % domItem.length;

  domItem[currentItem].classList.add("active");
  }
  updateCarousel();
  thumbnailsActive();
});

next.addEventListener("click", function () {
  if(eventoAttivo){
  //stampa la posizione della slide corrente
  console.log(currentItem);
  domItem[currentItem].classList.remove("active");

  // Incrementa currentItem e controlla il modulo per il ciclo circolare
  //incremento      //ciclo circolare
  currentItem = (currentItem + 1) % domItem.length;

  domItem[currentItem].classList.add("active");
  }
  updateCarousel();
  thumbnailsActive();
});
let eventoAttivo = true;
let loop;
let loopReverse;
start.addEventListener("click", function(){
  //loop
  if(eventoAttivo){
   loop = setInterval(startLoop, 3000);
   thumbnailsActive();
    eventoAttivo = false;

  }
});

startReverse.addEventListener("click", function(){
  if(eventoAttivo){
   loopReverse = setInterval(startLoopReverse, 3000);
   eventoAttivo = false;
   thumbnailsActive();
   
  }
});
stop.addEventListener("click", function(){
  if(!eventoAttivo){
    clearInterval(loop);
    clearInterval(loopReverse);
    eventoAttivo = true;
  }  
});

