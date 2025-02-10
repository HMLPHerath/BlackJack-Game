let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]}
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');

document.querySelector('#blackjact-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjact-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjact-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    let card = randomeCard();
    showCards(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
}

function randomeCard() {
    let randomeIndex = Math.floor(Math.random() * blackjackGame['cards'].length);
    return blackjackGame['cards'][randomeIndex];
}

function showCards(card, activePlayer) {
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    computeWinner();
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i = 0; i<yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (let i = 0; i<dealerImages.length; i++) {
        dealerImages[i].remove();
    }
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
}

function updateScore(card, activePlayer) {
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap']['card'][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap']['card'][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic() {
    let card = randomeCard();
    showCards(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
}

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log('You won!');
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            console.log('You lost!');
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            console.log('You drew!');
        }
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        console.log('You lost!');
        winner = DEALER;
    }else if (YOU['score'] > 21 && DEALER['score'] > 21){
        console.log('You drew!');
    }
    console.log('Winner is', winner);
    return winner;
}