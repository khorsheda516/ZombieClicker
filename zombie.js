let score = 0;
let points = 0;
let autoClickerActive = false;
let autoClickInterval;
let additionalDamage = 0; // Tracks additional damage from Plus One Damage
let totalZombiesKilled = 0; // Tracks total zombies killed for Ultimate Ability

const scoreDisplay = document.getElementById("score");
const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");

clickButton.addEventListener("click", () => {
    let zombiesToEliminate = 1 + additionalDamage; // Base damage + additional damage
    eliminateZombie(zombiesToEliminate);
    points += zombiesToEliminate; // Award points based on zombies eliminated
    pointsDisplay.innerText = points;
});

document.getElementById("auto-clicker").addEventListener("click", () => {
    if (points >= 100) {
        points -= 100;
        pointsDisplay.innerText = points;
        activateAutoClicker();
    }
});

document.getElementById("plus-one-damage").addEventListener("click", () => {
    if (points >= 50) {
        points -= 50;
        pointsDisplay.innerText = points;
        additionalDamage += 1; // Increase additional damage by 1
    }
});

document.getElementById("ultimate-ability").addEventListener("click", () => {
    if (points >= 750) {
        points -= 750;
        pointsDisplay.innerText = points;
        let zombiesKilled = totalZombiesKilled; // Use the total zombies killed
        let doubledZombies = zombiesKilled * 2; // Double the total zombies killed
        eliminateZombie(doubledZombies); // Add double the zombies to score
    }
});

function eliminateZombie(amount) {
    score += amount;
    totalZombiesKilled += amount; // Update total zombies killed
    scoreDisplay.innerText = score;
}

function activateAutoClicker() {
    autoClickerActive = true;
    autoClickInterval = setInterval(() => {
        let zombiesToEliminate = 1 + additionalDamage; // Auto clicker applies additional damage
        eliminateZombie(zombiesToEliminate);
        points += zombiesToEliminate; // Award points based on zombies eliminated
        pointsDisplay.innerText = points;
    }, 1000);
}

// Function to stop the auto clicker if needed
function stopAutoClicker() {
    if (autoClickerActive) {
        clearInterval(autoClickInterval);
        autoClickerActive = false;
    }
}
