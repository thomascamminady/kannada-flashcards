const flashcard = document.getElementById('flashcard');
const front = document.getElementById('front');
const back = document.getElementById('back');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const flipButton = document.getElementById('flip');
const increaseSizeButton = document.getElementById('increase-size');
const decreaseSizeButton = document.getElementById('decrease-size');

let cards = [];
let currentCardIndex = 0;
let scaleFactor = 1; // Initial scaling factor

// Load CSV file data
const file = 'kannada_100_common_words.csv';
// const file = 'kannada_1000_common_words.csv';
fetch(file)
    .then(response => response.text())
    .then(csv => {
        const lines = csv.split('\n');
        lines.shift(); // Remove header row
        cards = lines.map(line => {
            const [english, kannada, pronunciation] = line.split(',');
            return { english, kannada, pronunciation };
        });
        shuffleCards();
        displayCard();
    });

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function displayCard() {
    const card = cards[currentCardIndex];
    front.textContent = card.english;
    back.textContent = `${card.kannada}\n(${card.pronunciation})`;
    flashcard.classList.remove('flipped');
}

flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

prevButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    displayCard();
});

nextButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    displayCard();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flashcard.classList.toggle('flipped');
    } else if (event.code === 'ArrowLeft') {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        displayCard();
    } else if (event.code === 'ArrowRight') {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        displayCard();
    } // on plus, increase
    else if (event.code === 'BracketRight') {
        resizeFlashcard(1.1); // Increase size by 10%
    } // on minus, decrease
    else if (event.code === 'Slash') {
        resizeFlashcard(0.9); // Decrease size by 10%
    }
    console.log(event.code);
});

// Adjust flashcard size proportionally
function resizeFlashcard(factor) {
    scaleFactor *= factor;
    flashcard.style.transform = `scale(${scaleFactor})`;
    front.style.fontSize = `${50 * scaleFactor}px`; // Adjust text size proportionally
    back.style.fontSize = `${50 * scaleFactor}px`;
}

increaseSizeButton.addEventListener('click', () => {
    resizeFlashcard(1.1); // Increase size by 10%
});

decreaseSizeButton.addEventListener('click', () => {
    resizeFlashcard(0.9); // Decrease size by 10%
});
