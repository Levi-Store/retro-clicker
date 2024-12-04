// DOM Elements
const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");
const autoClickerButton = document.getElementById("auto-clicker");
const timesTwoButton = document.getElementById("times-two");
const logDisplay = document.getElementById("log");

// Game Variables
let points = 0;
let pointsPerClick = 1;
let autoClickerCost = 25;
let timesTwoCost = 50;
let autoClickerLevel = 0;
let timesTwoLevel = 0;
const maxUpgrades = 15;

// Utility Functions
function updatePointsDisplay() {
    pointsDisplay.textContent = points;
}

function logUpgrade(message) {
    logDisplay.textContent = message;
    setTimeout(() => (logDisplay.textContent = ""), 3000);
}

// Critical Click Logic
function isCriticalClick() {
    return Math.random() < 0.05; // 5% chance
}

// Click Button Logic
clickButton.addEventListener("click", () => {
    let earnedPoints = pointsPerClick;

    // Check for Critical Click
    if (isCriticalClick()) {
        earnedPoints *= 3;
        logUpgrade("Critical Click! You earned 3x points!");
    }

    points += earnedPoints;
    updatePointsDisplay();
    checkUpgrades();
});

// Upgrade Logic
autoClickerButton.addEventListener("click", () => {
    if (points >= autoClickerCost && autoClickerLevel < maxUpgrades) {
        points -= autoClickerCost;
        autoClickerLevel++;
        autoClickerCost *= 2;

        // Start Auto Clicker
        setInterval(() => {
            points += pointsPerClick;
            updatePointsDisplay();
        }, 5000);

        logUpgrade("Auto Clicker purchased!");
        updatePointsDisplay();
        checkUpgrades();
    }
});

timesTwoButton.addEventListener("click", () => {
    if (points >= timesTwoCost && timesTwoLevel < maxUpgrades) {
        points -= timesTwoCost;
        timesTwoLevel++;
        timesTwoCost *= 2;
        pointsPerClick *= 2;

        logUpgrade("2x Clicks purchased!");
        updatePointsDisplay();
        checkUpgrades();
    }
});

// Upgrade Button States
function checkUpgrades() {
    autoClickerButton.disabled = points < autoClickerCost || autoClickerLevel >= maxUpgrades;
    timesTwoButton.disabled = points < timesTwoCost || timesTwoLevel >= maxUpgrades;
}

// Initialize Game
updatePointsDisplay();
checkUpgrades();
