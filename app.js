let cards = document.querySelectorAll('.card');
let images = document.querySelectorAll('.card-image');
let menuImg = document.querySelector('.menu-img');
let playcard = document.querySelector('.playcard-holder');
let menu = document.querySelector('.menu');
let playButton = document.querySelector('.play-button');
let lifeCount = document.querySelector('.life-count');
let faces = document.querySelectorAll('.front');

let winTag = document.querySelector('.win-lose');
let scoreBox = document.querySelector('.score-box');
let marksScore = document.querySelector('.score');
let playagainHolder = document.querySelector('.playagain-holder');
let playagainBtn = document.querySelector('.playagain-button');
let homeBtn = document.querySelector('.home-button');

let blackScreen = document.querySelector('.black-screen');
let blackImg = document.querySelector('.black-img');

let scoreBoard = document.querySelector('.score-board');
scoreBoard.style.visibility = 'hidden';
blackScreen.style.visibility = 'hidden';
menu.style.visibility = 'visible';
menu.style.opacity = 1;


/* -------------Set & Declare Game Settings--------------- */
let gameEnd = false;
let marks = 30000;
let chances = 40;
let terms = chances;
let markReduce = marks/terms;

lifeCount.textContent = terms;

let cardFaceArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let imgArray = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];

let firstSelect = 20;
let secondSelect = 20;


function delay(ms){
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')},ms);
    })
}


async function imageComing(tX,tY,rZ,rY,itr){
    menuImg.style.opacity = 0;
    playcard.style.opacity = 0;

    let trnsX = tX;
    let trnsY = tY;
    let rotZ = rZ;
    let rotY = rY;
    let iterations = itr;
    let opacity = 0;
    
    let txRate = trnsX/iterations;
    let tyRate = trnsY/iterations;
    let rZRate = rotZ/iterations;
    let rYRate = 360/iterations;
    let opRate = 1/iterations;

    await delay(1000);
    for(let i=0;i<iterations;i++){
        menuImg.style.transform = `translate(${trnsX}px,${trnsY}px) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`;
        menuImg.style.opacity = opacity;
        trnsX -= txRate;
        trnsY -= tyRate;
        rotZ -= rZRate;
        rotY += rYRate;
        opacity += opRate;
        await delay(1);
    }

    opacity = 0;
    trnsY = -100;
    for(let i=0;i<100;i++){
        playcard.style.opacity = opacity;
        playcard.style.transform = `translateY(${trnsY}px)`;
        await delay(1);
        opacity += 0.01;
        trnsY += 1;
    }
}

imageComing(-200,-200,-30,0,100);



async function goToPlay(){

    let trY = 0; 
    let op = 1;

    for(let i=0;i<100;i++){
        menu.style.opacity = op;
        menu.style.transform = `translateY(${trY}px)`
        await delay(2);
        op -= 0.01;
        trY -= 1;
    }
    menu.style.visibility = 'hidden';
    scoreBoard.style.visibility = 'hidden';
    playcard.setAttribute("class","playcard-holder pointer-none");
}


playButton.addEventListener('click',e =>{
    setImages();
    goToPlay()
});



async function setImages(){
    let tempArray = imgArray;
    let index;
    let number;
    let imgSrc;
    console.log('New Game');
    for(let i=0;i<16;i++){
        cards[i].style.transform = "rotateY(360deg)";
        index = Math.floor(Math.random()*tempArray.length);
        number =tempArray[index];
        imgSrc = `images/${number}.png`
        images[i].src = imgSrc;
        console.log(`${i+1} : ${number}`);
        tempArray.splice(index,1);
    }
    console.log(' ');
}


async function flip(val){
    
    if(cardFaceArray[val]==1){
        terms -= 1;
        lifeCount.textContent = terms;

        marks -= markReduce;

        cards[val].style.transform = "rotateY(180deg)";
        cardFaceArray[val] = 0;
        if(firstSelect == 20) firstSelect = val;
        else if(secondSelect == 20) secondSelect = val;
        
        if(firstSelect != 20 && secondSelect != 20)
        checkMatching(firstSelect,secondSelect);
    }   
    
    gameEnd = !cardFaceArray.includes(1);
    console.log(gameEnd);

    if(gameEnd || terms ==0) gameOver();

}


for(let i=0;i<cards.length;i++){
    cards[i].addEventListener('click',(e) =>{
        flip(i);
    })
}


async function checkMatching(fVal , sVal){
    menu.style.visibility = 'visible';
    console.log('matching');
    if(images[fVal].src == images[sVal].src){
        /* cards[fVal].style.opacity = 0.8;
        cards[sVal].style.opacity = 0.8; */
        cards[fVal].style.transform = "rotateY(180deg)";
        cards[sVal].style.transform = "rotateY(180deg)";
        await delay(1000);
        firstSelect = 20;
        secondSelect = 20;
        menu.style.visibility = 'hidden';
    }
    else{
        firstSelect = 20;
        secondSelect = 20;
        await delay(1000);
        cards[fVal].style.transform = "rotateY(360deg)";
        cards[sVal].style.transform = "rotateY(360deg)";
        cardFaceArray[fVal] = 1;
        cardFaceArray[sVal] = 1;
        menu.style.visibility = 'hidden';
    }
}


async function gameOver(){

    playagainHolder.setAttribute("class","playagain-holder");
    marksScore.textContent = marks;
    if(terms > 0){
        winTag.textContent = 'Winner!';
        winTag.setAttribute("class","win-lose win");
        scoreBoard.setAttribute("class","score-board win-board");
    }
    else{
        winTag.setAttribute("class","win-lose");
        scoreBoard.setAttribute("class","score-board");
        scoreBox.style.visibility = 'hidden';
    }

    scoreBoard.style.opacity = 0;
    scoreBoard.style.visibility = 'visible';
    let opp = 0;
    for(let i=0;i<100;i++){
        scoreBoard.style.opacity = opp;
        opp += 0.01;
        await delay(1);
    }
}


async function goBackToHome(){
    menu.style.visibility = 'visible';
    menuImg.style.opacity = 0;
    playcard.style.opacity = 0;
    trY = -100; 
    op = 0;

    for(let i=0;i<100;i++){
        menu.style.opacity = op;
        menu.style.transform = `translateY(${trY}px)`
        await delay(2);
        op += 0.01;
        trY += 1;
    }

    imageComing(-200,-200,-30,0,100);

}


async function startNewGame(){
    scoreBoard.style.visibility = 'hidden';
    winTag.textContent = 'Game Over';
    gameEnd = false;
    marks = 30000;
    terms = chances;
    
    lifeCount.textContent = terms;
    
    cardFaceArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    imgArray = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    
    firstSelect = 20;
    secondSelect = 20;
    //setImages();
    
}

async function blackScreenSwitching(){
    blackScreen.style.opacity = 0;
    blackImg.style.opacity = 0;
    blackImg.style.transform = `translateY(-300px)`;
    blackScreen.style.visibility = 'visible';
    blackImg.style.visibility = 'visible';

    trY = -100; 
    op = 0;

    for(let i=0;i<100;i++){
        blackScreen.style.opacity = op;
        blackScreen.style.transform = `translateY(${trY}px)`;
        await delay(2);
        op += 0.01;
        trY += 1;
    }

    startNewGame();
    await delay(2);
    setImages();

    /* --------Logo animation-------- */
    await delay(500);
    op = 0;
    trY = -300;

    for(let i=0;i<100;i++){
        blackImg.style.opacity = op;
        blackImg.style.transform = `translateY(${trY}px)`;
        await delay(1);
        op += 0.01;
        trY += 3;
    }
    await delay(200);
    let A=0;
    for(let i=0;i<100;i++){
        blackImg.style.transform = `rotateY(${A}deg)`;
        await delay(1);
        A += 3.6;
    }
    await delay(200);
    
    for(let i=0;i<100;i++){
        blackImg.style.opacity = op;
        blackImg.style.transform = `translateY(${trY}px)`;
        await delay(1);
        op -= 0.01;
        trY += 3;
    }


    await delay(1000);

    op = 1;
    trY = 0;

    for(let i=0;i<100;i++){
        blackScreen.style.opacity = op;
        blackScreen.style.transform = `translateY(${trY}px)`
        await delay(2);
        op -= 0.01;
        trY -= 1;
    }

    blackScreen.style.visibility = 'hidden';
    blackImg.style.visibility = 'hidden';
}


homeBtn.addEventListener('click',e=>{
    playcard.setAttribute("class","playcard-holder");
    goBackToHome();
    startNewGame();
    playagainHolder.setAttribute("class","playagain-holder pointer-none");
});
playagainBtn.addEventListener('click',e=>{
    blackScreenSwitching();
    playagainHolder.setAttribute("class","playagain-holder pointer-none");
});

