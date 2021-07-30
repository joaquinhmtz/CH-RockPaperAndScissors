const results = ['paper', 'rock', 'scissors'];
const pimpResult = document.getElementById('results');
let score = document.getElementById('score');
let btnAgain = document.getElementById('btnAgainId');
let ruletGame = document.getElementById('ruletGame');
let resultGame = document.getElementById('resultGame');
let pimpYouResult = document.getElementById('pimpYouResult');
let pimpMachineResult = document.getElementById('pimpMachineResult');
let imgYou = document.getElementById('imgYou');
let imgMachine = document.getElementById('imgMachine');
let resultHouse = document.getElementById('resultHouse');
let playAgain = document.getElementById('playAgain');
let emptyResult = document.getElementById('emptyResult');


function init() {
    ruletGame.style.display = 'flex';
    resultGame.style.display = "none";
    resultHouse.style.display = 'none';
    playAgain.style.display = 'none';
    if (window.localStorage.getItem('score') == null || window.localStorage.getItem('score') == undefined) {
        window.localStorage.setItem('score', 0);
        score.innerHTML = window.localStorage.getItem('score');
    } else score.innerHTML = window.localStorage.getItem('score');
}

btnAgain.addEventListener('click', (e) => {
    ruletGame.style.display = "flex";
    resultGame.style.display = "none";
    resultHouse.style.display = 'none';
    playAgain.style.display = 'none';
    emptyResult.style.display = 'flex';
});

document.addEventListener('click', (e) => {
    let id = e.target.id;
    let value;

    if (id != 'btnAgainId' && id != 'btnRules' && id != 'closeId' && id != '') {
        switch(id) {
            case 'btnPaper':
                value = 'paper';
            break;
            case 'btnRock':
                value = 'rock';
            break;
            case 'btnScissors':
                value = 'scissors';
            break;
        }
    
        let randomValue = results[Math.floor(Math.random() * results.length)];
        setTimeout(() => { chooseImgAndColor(randomValue); }, 1000);
        chooseWinner(value, randomValue)
            .then(res => {
                ruletGame.style.display = 'none';
                resultGame.style.display = 'flex';
                setTimeout(() => {
                    resultHouse.style.display = 'flex';
                    playAgain.style.display = 'flex';
                    emptyResult.style.display = 'none';
                    if (res.win == true) {
                        pimpResult.innerHTML = 'YOU WIN';
                        window.localStorage.setItem('score', (parseInt(window.localStorage.getItem('score')) + 1));
                        score.innerHTML = window.localStorage.getItem('score');
                    }
                    if (res.draw == true) pimpResult.innerHTML = 'YOU DRAW';
                    if (res.loose == true) pimpResult.innerHTML = 'YOU LOOSE';
                }, 1000);
            });
    }
});

function chooseWinner (value, valueMachine) {
    return new Promise((resolve, reject) => {
        let results = {
            win : false,
            draw : false,
            loose : false
        };

        switch(value) {
            case 'paper':
                pimpYouResult.classList.add("paper-result");
                imgYou.src = './static/img/icon-paper.svg';
                if (valueMachine == 'scissors') results = { win : false, draw : false, loose : true };
                if (valueMachine == 'rock') results = { win : true, draw : false, loose : false };
                if (valueMachine == 'paper') results = { win : false, draw : true, loose : false };
            break;
            case 'rock':
                pimpYouResult.classList.add("rock-result");
                imgYou.src = './static/img/icon-rock.svg';
                if (valueMachine == 'paper') results = { win : false, draw : false, loose : true };
                if (valueMachine == 'scissors') results = { win : true, draw : false, loose : false };
                if (valueMachine == 'rock') results = { win : false, draw : true, loose : false };
            break;
            case 'scissors':
                pimpYouResult.classList.add("scissors-result");
                imgYou.src = './static/img/icon-scissors.svg';
                if (valueMachine == 'paper') results = { win : true, draw : false, loose : false };
                if (valueMachine == 'rock') results = { win : false, draw : false, loose : true };
                if (valueMachine == 'scissors') results = { win : false, draw : true, loose : false };
            break;
        }

        resolve(results);
    });
}

function chooseImgAndColor (value) {
    switch(value) {
        case 'paper':
            pimpMachineResult.classList.add("paper-result");
            pimpMachineResult.classList.remove("rock-result");
            pimpMachineResult.classList.remove("scissors-result");
            imgMachine.src = './static/img/icon-paper.svg';
        break;
        case 'rock':
            pimpMachineResult.classList.add("rock-result");
            pimpMachineResult.classList.remove("paper-result");
            pimpMachineResult.classList.remove("scissors-result");
            imgMachine.src = './static/img/icon-rock.svg';
        break;
        case 'scissors':
            pimpMachineResult.classList.add("scissors-result");
            pimpMachineResult.classList.remove("rock-result");
            pimpMachineResult.classList.remove("paper-result");
            imgMachine.src = './static/img/icon-scissors.svg';
        break;
    }
}

init();