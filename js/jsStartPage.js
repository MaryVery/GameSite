const games = [
  {
    name: "Memo",
    discription: "Turn the cards over to make pairs",
    image: `<i class="fa-solid fa-question" style="color: #000000;"></i>`,
    class: "fa-solid fa-question",
    style: "color: #000000;",
  },
  {
    name: "Shapes",
    discription: "Guess the heroes by their silhouette",
    image: `<i class="fa-solid fa-child" style="color: #000000;"></i>`,
    class: "fa-solid fa-child",
    style: "color: #000000;",
  },
  {
    name: "Piano",
    discription: "Match the note on the staff to the correct piano key",
    image: `<i class="fa-solid fa-music" style="color: #000000;"></i>`,
    class: "fa-solid fa-music",
    style: "color: #000000;",
  },
  {
    name: "Cake",
    discription: "Count and choose the correct answer!",
    image: `<i class="fa-solid fa-cake-candles" style="color: #000000;"></i>`,
    class: "fa-solid fa-cake-candles",
    style: "color: #000000;",
  },
  {
    name: "Simon",
    discription: "Remember the sequence and play it!",
    image: `<i class="fa-regular fa-circle-play" style="color: #000000;"></i>`,
    class: "fa-regular fa-circle-play",
    style: "color: #000000;",
  },
];

renderStartPage();

function renderStartPage() {

  let divContainer = document.createElement("div");

  divContainer.classList.add("start-container");
  document.body.prepend(divContainer);
  
  for (let i = 0; i < games.length; i++) {
    divContainer.innerHTML += `
      <div class = "start-container">
      <div class = "start-game-item">
        <i class="${games[i].class}" style="${games[i].style}"></i>      
        <span>${games[i].name}</span>
        <p>${games[i].discription}</p>
        <button class = "btn-choose-game" onclick="clickHandler${i}()">Play</button>
      </div>
    `;
  }};

function clickHandler0() {
  // alert("0");

  //Delete "start page" 
  document.body.innerHTML = "";

  let memoContainer = document.createElement("div");

  memoContainer.classList.add("memo-container");
  document.body.prepend(memoContainer);
  memoContainer.innerHTML = `
  <div class="wrapper">
    <div class="stats-container">
      <div id="moves-count"></div>
      <div id="time"></div>
    </div>
    <div class="game-container"></div>
    <button id="stop" class="hide">Stop Game</button>
  </div>
  <div class="controls-container">
    <p id="result"></p>
    <p>Size: </p>
    <select id = 'selested-size' size = 1>
      <option>6</option>
      <option>12</option>
      <option selected>16</option>
      <option class = 'smallScreenDisabled'>20</option>
      <option class = 'smallScreenDisabled'>24</option> 
    </select>
    <select id = 'selested-Memo-theme' size = 1>
      <option>Animals</option>
      <option selected>General</option>
      <option>Nature</option>
      <option>Smile</option>
      <option>Eating</option>
    </select>
    <button id="start">Start Game</button>
    <button id="back" class="back-memo">Back</button>
  </div>
  `
  const moves = document.getElementById("moves-count");
  const timeValue = document.getElementById("time");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const gameContainer = document.querySelector(".game-container");
  const result = document.getElementById("result");
  const controls = document.querySelector(".controls-container");
  const backButton = document.getElementById("back");
  let cards;
  let interval;
  let firstCard = false;
  let secondCard = false;
  const sizeOfMatrix = {
    '6': [2, 3],
    '12': [3, 4],
    '16': [4, 4],
    '20': [4, 5],
    '24': [4, 6],
  };
  let music0 = new Audio(`./audio/RainyDayGames.mp3`);

  //Initial Time, moves and win count
  let seconds = 0;
  let  minutes = 0;
  let movesCount = 0;
  let  winCount = 0;

  //Start game
  startButton.addEventListener("click", () => {
    music0.setAttribute("loop", "");
    music0.currentTime = 0;
    music0.play();

    movesCount = 0;
    seconds = 0;
    minutes = 0;

    //controls amd buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    //Start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
    initializer();
  });
  
  //Stop game
  stopButton.addEventListener(
    "click",
    (stopGame = () => {
      firstCard = false;
      secondCard = false;
      controls.classList.remove("hide");
      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      gameContainer.innerHTML = "";
      clearInterval(interval);
    })
  );

  //Back to main menu
  backButton.addEventListener(
    "click",
    (back = () => {
      music0.pause();
      memoContainer.remove();
      renderStartPage();
    })
  );


  //Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  
  const selectedSize = document.getElementById('selested-size').value;
  const selectedTheme = document.getElementById('selested-Memo-theme').value;
  let cardValues = generateRandom(selectedSize, selectedTheme);

  matrixGenerator(cardValues, selectedSize, selectedTheme);
};

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time for displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  //innerHTML заменит текущее содержимое элемента
  moves.innerHTML = `<span>Moves: </span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 16, selectedTheme) => {
  //temporary array will copy one of initial items/icons arr
  let tempArray;
  switch(selectedTheme) {
    case 'Family':
      tempArray = [...items];
      break;
    case 'Nature':
      tempArray = [...iconsNature];
      break;
    case 'Animals':
      tempArray = [...iconsAnimal];
      break;
    case 'General':
      tempArray = [...iconsClassic];
      break;
    case 'Smile':
      tempArray = [...iconsSmile];
      break;
    case 'Eating':
      tempArray = [...iconsEating];
      break;
  }

  //initializes cardValues array
  let cardValues = [];
  //Amount of pairs
  size = size / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

function putImgCard(i, cardValues) {
  gameContainer.innerHTML += `
  <div class="card-container" data-card-value="${cardValues[i].name}">
     <div class="card-before">?</div>
     <div class="card-after">
       <img src="${cardValues[i].image}" class="memo-image"/>
     </div>
  </div>
  `;
}

function putIconCard(i, cardValues) {
  gameContainer.innerHTML += `
  <div class="card-container" data-card-value="${cardValues[i].name}">
     <div class="card-before">?</div>
     <div class="card-after">
       <i  class="${cardValues[i].class}" style="${cardValues[i].style}"></i>
     </div>
  </div>
  `;
}

const matrixGenerator = (cardValues, size = 16, selectedTheme) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);

  for (let i = 0; i < size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores 
        the names of the cards to match later
      */
     if (selectedTheme === 'Family') {
      putImgCard(i, cardValues);
     } else {
      putIconCard(i, cardValues);
     }
  }
  //Grid
  let columns = sizeOfMatrix[size][1];
  gameContainer.style.gridTemplateColumns = `repeat(${columns},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then go on (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false 
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              gameContainer.innerHTML = "";
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
}



function clickHandler1() {
  //Delete "start page" 
  document.body.innerHTML = "";

  let wrapperShape = document.createElement("div");
  
  wrapperShape.classList.add("wrapper-shape");
  document.body.prepend(wrapperShape);
  wrapperShape.innerHTML = `
     <div class="gameShape-container hide">
      <div class="header">
      </div>
      <div class="container"></div>
    </div>
    <div class="score-container">
      <div id="user-score"></div>
			<select id = 'selested-shape-theme' size = 1>
        <option>mumiTroll</option>
        <option>pawPatrol</option>
        <option>Sofia</option>
        <option>Incanto</option>
        <option selected>Animals</option>
      </select>
      <button id="start">Start</button>
      <button id="back" class = "back-shape">Back</button>
    </div>
    `

  const backButton = document.getElementById("back");
  let music1 = new Audio(`./audio/muzyka-dlya-igr.mp3`);

  backButton.addEventListener(
    "click",
    (back = () => {
      music1.pause();
      wrapperShape.remove();
      renderStartPage();
  }));

  const container = document.querySelector(".container");
  const gameContainer = document.querySelector(".gameShape-container");
  const startButton = document.getElementById("start");
  const scoreContainer = document.querySelector(".score-container");
  const userScore = document.getElementById("user-score");
  let score;
  let currentQuestion;
  let finalQuestions;

  startButton.addEventListener("click", () => {
    
    music1.setAttribute("loop", "");
    music1.currentTime = 0;
    music1.play();

    const selectedArr = document.getElementById('selested-shape-theme').value;
    let selectedTheme;

    score = 0;
    currentQuestion = 0;
    scoreContainer.classList.add("hide");
    gameContainer.classList.remove("hide");

    switch(selectedArr) {
      case 'pawPatrol':
        selectedTheme = [...pawPatrol];
        break;
      case 'mumiTroll':
        selectedTheme = [...mumiTroll];
        break;
      // case 'different':
      //   selectedTheme = [...different];
      //   break;
      case 'Sofia':
        selectedTheme = [...sofia];
        break;
      case 'Incanto':
        selectedTheme = [...incanto];
        break;
      case 'Animals':
        selectedTheme = [...animals];
        break;
    };



    //Select random 5 questions
    finalQuestions = populateQuestions(selectedTheme);

    //Generate card for first question
    cardGenerator(finalQuestions[currentQuestion], selectedArr);

    document.addEventListener("keydown", ifPressedEnter);

    //Choose 5 random questions for game
    function populateQuestions(ArrOfObj) {
      let indexesOfChosenObjects = [];
      let questionsBatch = [];
      //5 Questions
      while (questionsBatch.length < 5) {
        //choose one random item from array
        let randomValue = randomValueGenerator(ArrOfObj);
        //find index of random item in array
        let index = ArrOfObj.indexOf(randomValue);
        //if we didn't take such item already than push it and remember chosen index
        if (!indexesOfChosenObjects.includes(index)) {
          questionsBatch.push(randomValue);
          indexesOfChosenObjects.push(index);
        }
      }
      return questionsBatch;
    };

    //Return ONE random value (obj) from array
    function randomValueGenerator(array) {
      // console.log(array);
      return(array[Math.floor(Math.random() * array.length)]);
    };

    //check selected answer
    function checker(e) {
      console.log("check");
      let userSolution = e.target.innerText;
      let options = document.querySelectorAll(".option");
      if (userSolution === finalQuestions[currentQuestion].correct_option) {
        e.target.classList.add("correct");
        score++;
      } else {
        e.target.classList.add("incorrect");
        options.forEach((element) => {
          if (element.innerText == finalQuestions[currentQuestion].correct_option) {
            element.classList.add("correct");
          }
        });
      }
      const image = document.querySelector(".imageShape");
      image.classList.add("done");
      // clearInterval(countdown);

      //disable all options
      options.forEach((element) => {
        element.disabled = true;
      });
    };

    //Render the card
    function cardGenerator(cardObject, selectedArr) {
      const { image, correct_option } = cardObject;
      console.log("tak0 "+selectedTheme);
      let options = randomShuffle(populateOptions(correct_option, selectedArr));
      container.innerHTML = `
      <div class="quiz">
        <p class="num">
          ${currentQuestion + 1}/5
        </p>
        <div class="questions">
          <img class="imageShape" draggable="false"  src="${image}"/>
        </div>
        <div class="options">
          <button class="option">${options[0]}</button>
          <button class="option">${options[1]}</button>
          <button class="option">${options[2]}</button>
          <button class="option">${options[3]}</button>
        </div>

        <div class="nxt-btn-div">
          <button class="next-btn" >Next</button>
        </div>
      </div>`;

      let btnOfOption = document.getElementsByClassName("option");
      console.log(btnOfOption);

      for (let i = 0; i < 4; i++) {
        btnOfOption[i].addEventListener("click", checker);
      }

      let nextBtn = document.querySelector(".next-btn");
      nextBtn.addEventListener("click", nextQuestion);
    };

    //Random shuffle array
    function randomShuffle(array) {
      return(array.sort(() => 0.5 - Math.random()));
    } 

    function ifPressedEnter(e) {
      // console.log(e.target);
      if (e.code === 'Enter') {
        nextQuestion(e); 
      }
    }

    //Create options
    function populateOptions(correct_option, selectedArr) {
      let arr = [];
      let optionsArray;
      console.log("tak"+selectedArr);

      switch(selectedArr) {
        case 'pawPatrol':
          optionsArray = [...pawPatrolArr];
          break;
        case 'mumiTroll':
          optionsArray = [...mumiTrollArr];
          break;
        // case 'different':
        //   optionsArray = [...differentArr];
        //   break;
        case 'Sofia':
          optionsArray = [...sofiaArr];
          break;
        case 'Incanto':
          optionsArray = [...incantoArr];
          break;
        case 'Animals':
          optionsArray = [...animalsArr];
          break;
      };
      arr.push(correct_option);
      let optionsCount = 1;
      while (optionsCount < 4) {
        console.log(optionsArray);
        let randomvalue = randomValueGenerator(optionsArray);
        if (!arr.includes(randomvalue)) {
          arr.push(randomvalue);
          optionsCount += 1;
        }
      }
      return arr;
    };

    

    //Next question
    function nextQuestion(e) {
      //increment currentQuestion
      currentQuestion += 1;
      if (currentQuestion == finalQuestions.length) {
        document.removeEventListener('keydown', ifPressedEnter);
        gameContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        startButton.innerText = `Restart`;
        userScore.innerHTML =
          "Your score is " + score + " out of " + currentQuestion;
        // clearInterval(countdown);
      } else {
        cardGenerator(finalQuestions[currentQuestion], selectedArr);
      }
    };


  });


  
}

function clickHandler2() {
  // alert("2");

  //Delete "start page" 
  document.body.innerHTML = "";

  let wrapperPiano = document.createElement("div");

  wrapperPiano.classList.add("wrapper-piano");
  document.body.prepend(wrapperPiano);
  wrapperPiano.innerHTML = `
    <button id="back" class = "back-piano">Back</button>
    <div class = "finding-notes"></div>
    <div class = "piano-container"></div>`;


  let pianoContainer = document.querySelector(".piano-container");
  let findingNotes = document.querySelector(".finding-notes");
  const amountOfNotes = 13;
  const relation = {
    "0": "pianoKey11",
    "1":"pianoKey12",
    "2":"pianoKey13",
    "3":"pianoKey14",
    "4":"pianoKey15",
    "5":"pianoKey16",
    "6":"pianoKey17",
    "7":"pianoKey18",
    "8":"pianoKey19",
    "9":"pianoKey20",
    "10":"pianoKey21",
    "11":"pianoKey22",
    "12":"pianoKey23",
    "13":"pianoKey24",
  } 
  const base = "./audio/";
  let score = 0;
  let time = 0;
  const backButton = document.getElementById("back");

  backButton.addEventListener(
    "click",
    (back = () => {
      clearInterval(id1);
      wrapperPiano.remove();
      renderStartPage();
    })
  );


  renderPianoEts();
  let id1 = setInterval(() => {
    time += 0.5;
  }, 500);

  function renderPianoEts()  {
    //lines for notes
    for (let i = 1; i <= 6; i++) {
      let div = document.createElement("div");
  
      if (i === 6) {
        div.classList.add("bottom-note-line");
      } else {
        if (i === 1) {
          div.classList.add("top-note-line");
        } 
          div.classList.add("note-line");
      }
      findingNotes.appendChild(div);
    }
    //put a note in random place
    let note = getRandomNote();
    drawDot(note);
  
    //24keys
    for (let index = 1; index <= 24; index++) {
      let div = document.createElement("div");
  
      div.id = `pianoKey${index}`;
      div.classList.add("key", index <= 10 ? "black-key" : "white-key");
      
      //For playing audio on click
      const number = index <= 9 ? "0" + index : index;
  
      div.addEventListener("click", clickHandler);
      
      function clickHandler(e) {
        new Audio(`${base}key${number}.mp3`).play();
  
        if (checkNote(e, note)) {
          //let's delete from picture our note and get a new one
          score = score + 1;
          if (score == "7") {
            clearInterval(id1);
            alert(`Вы справились за ${time}`);
            time = 0;
            score = 0;
            id1 = setInterval(() => {
              time += 0.5;
            }, 500);
            console.log(time);
          }
          note = -1;
          setTimeout(() => {
            deleteDot();
            note = getRandomNote();
            drawDot(note);
          }, 3000);
          }};
      pianoContainer.appendChild(div);
    }};

    function checkNote(event, note) {
      let userSolution = event.target.id;
      // console.log( userSolution, relation[note]);
    
      if (userSolution === relation[note]) {
        event.target.classList.add("correct-key");
        setTimeout(() => {
          event.target.classList.remove("correct-key");
        }, 1000);
        return true;
    
      } else {
        event.target.classList.add("incorrect-key");
        setTimeout(() => {
          event.target.classList.remove("incorrect-key");
        }, 1000);
      }
    
      return false;
    }
    

    
    function getRandomNote() {
      return Math.floor(Math.random() * amountOfNotes)
    }
    
    function drawDot(note) {
      let dot = document.createElement("div");
    
      dot.classList.add("dot");
      dot.style = `top: ${- (7 + 10*note)}px`;
      findingNotes.appendChild(dot);
    }
    
    function deleteDot() {
      document.querySelector(".dot").remove();
    }
}

function clickHandler3() {
  // alert("3");
  let music = new Audio(`./audio/fon.mp3`);
  music.setAttribute("loop", "");
  music.currentTime = 0;
  music.play();

  //Delete "start page" 
  document.body.innerHTML = "";

  //--
  const colorArr = [ "#ff62ae", "#fd6070", "#c739ff", "#6410ff", 
  "#54a4ff", "#51daef", "#3dffb5", "#bfff5f", 
  "#ffc400", "#ffa962"];
  const candlesAmount = [ 1, 2, 3, 4, 5, 6, 7];
  const layClass = ["normal", "stripes", "dots"];

  //Render the cake
  let wrapperCandles = document.createElement("div");

  wrapperCandles.classList.add("wrapper-candles");
  // wrapperCandles.classList.add("animation-appearance");
  document.body.prepend(wrapperCandles);
  wrapperCandles.innerHTML = `
  <div class="candles lay-change animation-appearance"></div>
  <div class="lay-1 lay-change animation-appearance"></div>
  <div class="lay-2 lay-change animation-appearance"></div>
  <div class="lay-3 lay-change animation-appearance"></div>
  <div class="btn-container animation-appearance"></div>
  <button id="back" class = "back-cake">Back</button>
  `;

  setCakeColors(colorArr);
  setSpecialClass(layClass);

  //render the answer buttons from 1 to 7
const btnContainer = document.querySelector(".btn-container");
const candles = document.querySelector(".candles");
const layChange = document.getElementsByClassName("lay-change");
let candlesPoints = 0;

for (let i = 1; i <= 7; i++) {
  let btn = document.createElement("button");
  btn.classList.add("btn-number");
  btn.innerText = `${i}`;
  btnContainer.append(btn);
};

function setAppearance(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.add("animation-appearance");
    arr[i].classList.remove("animation-disappearance");
  }
};

function setDisappearance(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove("animation-appearance");
    arr[i].classList.add("animation-disappearance");
  }
}

//set the candels on the cake
let randomAmount = randomFromArr(candlesAmount);

setCandles(randomAmount);

btnContainer.addEventListener("click", clickHandlerCandels);

function clickHandlerCandels(e) {
  console.log(e.target.nodeName);
  let userChoice = e.target;
  if (userChoice.nodeName != 'BUTTON') return;

  if (userChoice.innerText == randomAmount) {
    console.log("right!");
    candlesPoints += 1;
    if (candlesPoints === 7) {
      finishCandles(candlesPoints);
      return;
    }
    userChoice.classList.add("correct");

    randomAmount = randomFromArr(candlesAmount);

    setTimeout(() => { 
      setDisappearance(layChange);
    }, 1000);
    setTimeout(() => {
      userChoice.classList.remove("correct");
      candles.innerHTML = "";
      setAppearance(layChange);
      setCakeColors(colorArr);
      setSpecialClass(layClass);
      setCandles(randomAmount);
    }, 2000);

  } else {
    userChoice.classList.add("rong");

    setTimeout(() => {
      userChoice.classList.remove("rong");
    }, 1000);
  };
};


function finishCandles(points) {
  wrapperCandles.innerHTML = `
  <div class = "candles-score">Your points: ${points}</div>
  <button id="back" class = "back-cake">Back</button>
  `;

  const backButton = document.getElementById("back");
  backButton.addEventListener("click", backFromCake);

  //confetti
  let confWrapper = document.createElement("div");
  confWrapper.classList.add("conf-wrapper");
  confWrapper.classList.add("animated");
  wrapperCandles.append(confWrapper);

  confetti("small", 50, 20, 1, confWrapper);
  confetti("big", 50, 20, 1, confWrapper);
  confetti("small", 20, 45, 2, confWrapper);
  confetti("big", 20, 45, 2, confWrapper);
  confetti("small", 55, 70, 3, confWrapper);
  confetti("big", 55, 70, 3, confWrapper);
};

function confetti(className, top, left, id, confWrapper) {
  for (let i = 0; i <= 9; i++) {
    let sharp = document.createElement("div");
    sharp.classList.add("confetti");
    sharp.classList.add(`${className}${id}`);
  
    sharp.style = `
          background-color: ${randomFromArr(colorArr)};
          top: ${top}%;
          left: ${left}%`;
    confWrapper.prepend(sharp);
  };

  let confArr = document.getElementsByClassName(`${className}${id}`);
  let i = 0;
  
  id = setInterval(() =>{
    confArr[i].classList.add(`animation-boom${className}`);
    console.log(confArr[i]);
    i++;
  }, 200);

  setTimeout(() => {
    clearInterval(id);
    confWrapper.style = `
          opacity: 0;`;
  }, 2000);

  setTimeout(() => {
    confWrapper.remove();
  }, 3000);
};
  function setCandles(randomAmount) {
    console.log(randomAmount);

    for (let i = 1; i <= randomAmount; i++) {
      let div = document.createElement("div");
      div.classList.add("candles-item");
      candles.prepend(div);
    };
  };


  function setCakeColors(colorArr) {
    let randomColor = randomFromArr(colorArr);

    let layFirst = document.querySelector(".lay-1");
    let laySecond = document.querySelector(".lay-2");
    let layThird = document.querySelector(".lay-3");
    layFirst.style = `background-color: ${randomColor}`;
    laySecond.style = `background-color: ${randomColor};
                        opacity: 0.5;`;
    randomColor = randomFromArr(colorArr);
    layThird.style = `background-color: ${randomColor}`;
  };

  function setSpecialClass(layClass) {
    let layFirst = document.querySelector(".lay-1");
    layFirst.classList.remove('stripes');
    layFirst.classList.remove('dots');
    layFirst.classList.add(randomFromArr(layClass));
  };

  function randomFromArr(arr) {
    return (arr[Math.floor(Math.random() * arr.length)]);
  };

      //<button id="back" class = "back-cake">Back</button>

  const backButton = document.getElementById("back");

  function backFromCake() {
    music.pause(); 
    wrapperCandles.remove();
    renderStartPage();
  };

  backButton.addEventListener("click", backFromCake);
}



function clickHandler4() {
  //Delete "start page" 
  document.body.innerHTML = "";

  //---
  const colors = ["color1", "color2", "color3", "color4"];
  let music1 = new Audio(`./audio/col1.mp3`);
  let music2 = new Audio(`./audio/col2.mp3`);
  let music3 = new Audio(`./audio/col3.mp3`);
  let music4 = new Audio(`./audio/col4.mp3`);

  // const playMusic = {
  //   color1() {music1.play()},
  //   color2() {music2.play()},
  //   color3() {music3.play()},
  //   color4() {music4.play()}
  // };
  // let w = "color1";
  // playMusic["color1"];
  const wrapperSimon = document.createElement("div");
  wrapperSimon.classList.add("wrapper-simon");

  document.body.prepend(wrapperSimon);
  wrapperSimon.innerHTML = `
    <div class = "simon-container">
      <div class="center-simon">
        <button class = "simon-button">Start</button>
      </div>
      <div class = "color-button color1"></div>
      <div class = "color-button color2"></div>
      <div class = "color-button color3"></div>
      <div class = "color-button color4"></div>
    </div>
    <button id = "back">Back</button>
  `;
  const backButton = document.getElementById("back");
  const startSimon = document.querySelector(".simon-button");
  const colorButtonArr = document.getElementsByClassName("color-button");
  let count = 0;
  let currentLlevel = 0;
  let colorChain = [];

  backButton.addEventListener("click", backFromSimon);
  startSimon.addEventListener("click", clickHandlerSimon);

  function clickHandlerSimon() {
    count = 0;
    colorChain = [];

    startSimon.classList.add("hide");

    // colorChain.push(randomFromArr(colors));
    // count = colorChain.length;

    colorChain.push(randomFromArr(colors));
    console.log(colorChain);
    count = colorChain.length;

    playChain();

  }

  //Function to play the chain, set/remove the check function
  async function playChain() {
    removeEventListenerOnBtns();
    for (let item of colorChain) {
      let currentColor = document.querySelector(`.${item}`);
      await delay(200);
      currentColor.style = `filter: grayscale(0%) brightness(1)`;
      let trek = getMusic(item);
      trek.play();
      await delay(400);
      trek.pause();
      trek.currentTime = 0;
      currentColor.style = `filter: grayscale(60%) brightness(0.7)`;
      await delay(300);
    };
    setEventListenerOnBtns();
  };

  function getMusic(item) {
    if (item == "color1") {
      // music1.play();
      return music1;
    }
    if (item == "color2") {
      // music2.play();
      return music2;
    }
    if (item == "color3") {
      // music3.play();
      return music3;
    }
    if (item == "color4") {
      // music4.play();
      return music4;
    }
  };

  function setEventListenerOnBtns() {
    for (let i = 0; i < colorButtonArr.length; i++) {
      let btn = colorButtonArr[i];
      btn.addEventListener("click", checkUserChain);
    }
  }

  function removeEventListenerOnBtns() {
    for (let i = 0; i < colorButtonArr.length; i++) {
      let btn = colorButtonArr[i];
      btn.removeEventListener("click", checkUserChain);
    }
  }

  async function checkUserChain(e) {
    
    if (e.target.classList[1] == colorChain[currentLlevel]) {
      // console.log(e.target.classList[1], colorChain[currentLlevel]);
      let trek = getMusic(e.target.classList[1]);
      trek.play();
      e.target.style = `filter: grayscale(0%) brightness(1)`;
      await delay(100);
      trek.pause();
      trek.currentTime = 0;
      e.target.style = `filter: grayscale(60%) brightness(0.7)`;
      currentLlevel += 1;
      console.log(count, currentLlevel);

      if (currentLlevel === count) {
        removeEventListenerOnBtns();
        await delay(500);
        currentLlevel = 0;
        colorChain.push(randomFromArr(colors));
        count = colorChain.length;
        playChain();
      } 

    } else {
      loseSimon();
      //lose
    }
  }

  //Delay for blink effect
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

  function loseSimon() {
    alert(`Uuups, try again! Your points: ${count - 1}`);
    count = 0;
    colorChain =[];
    currentLlevel = 0;
    startSimon.classList.remove("hide");
  }

  function backFromSimon() {
    wrapperSimon.remove();
    renderStartPage();
  };

  function randomFromArr(arr) {
    return (arr[Math.floor(Math.random() * arr.length)]);
  };
}
