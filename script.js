// Game variables
let wins = 0;
let losses = 0;
let totalGames = 0;
let isFlipping = false;

// DOM elements
const coin = document.getElementById('coin');
const headsBtn = document.getElementById('heads-btn');
const tailsBtn = document.getElementById('tails-btn');
const resultEl = document.getElementById('result');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');
const totalEl = document.getElementById('total');

// Event listeners
headsBtn.addEventListener('click', () => playGame('heads'));
tailsBtn.addEventListener('click', () => playGame('tails'));

// Main game function
function playGame(playerChoice) {
    if (isFlipping) return;
    
    isFlipping = true;
    resultEl.textContent = '';
    coin.classList.add('flipping');
    
    // Disable buttons during flip
    headsBtn.disabled = true;
    tailsBtn.disabled = true;
    
    // Random result after delay
    setTimeout(() => {
        const randomValue = Math.random();
        const coinResult = randomValue < 0.5 ? 'heads' : 'tails';
        
        // Stop flipping animation
        coin.classList.remove('flipping');
        
        // Set final coin position
        if (coinResult === 'heads') {
            coin.style.transform = 'rotateY(0)';
        } else {
            coin.style.transform = 'rotateY(180deg)';
        }
        
        // Check win/lose
        if (playerChoice === coinResult) {
            resultEl.textContent = 'You Win!';
            resultEl.style.color = '#4CAF50';
            wins++;
            
            // Celebration effect
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createConfetti();
                }, i * 100);
            }
        } else {
            resultEl.textContent = 'You Lose!';
            resultEl.style.color = '#F44336';
            losses++;
        }
        
        totalGames++;
        updateStats();
        isFlipping = false;
        
        // Re-enable buttons
        headsBtn.disabled = false;
        tailsBtn.disabled = false;
    }, 1000);
}

// Update stats display
function updateStats() {
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    totalEl.textContent = totalGames;
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.opacity = '0.8';
    document.body.appendChild(confetti);
    
    // Animation
    let position = -10;
    const fallInterval = setInterval(() => {
        position += 5;
        confetti.style.top = position + 'px';
        
        // Random horizontal movement
        const currentLeft = parseFloat(confetti.style.left);
        confetti.style.left = (currentLeft + (Math.random() - 0.5) * 2) + 'vw';
        
        // Remove when off screen
        if (position > window.innerHeight) {
            clearInterval(fallInterval);
            confetti.remove();
        }
    }, 20);
    
    // Remove after timeout (just in case)
    setTimeout(() => {
        clearInterval(fallInterval);
        confetti.remove();
    }, 5000);
}

// Initialize coin position
coin.style.transform = 'rotateY(0)';