let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#blackjact-hit-button').addEventListener('click', blackjackHit);

function blackjackHit() {
  let cardImage = document.createElement('img');
  cardImage.src = 'images/K.png';
  document.querySelector(YOU['div']).appendChild(cardImage);
}