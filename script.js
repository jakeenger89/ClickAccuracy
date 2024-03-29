document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("gameContainer");
    const dots = [];
    const spawnAreaWidth = 200; // Width of the spawn area
    const spawnAreaHeight = 200; // Height of the spawn area
    const spawnInterval = 500; // Interval for spawning dots in milliseconds
    let totalClicks = 0;
    let hits = 0;
    let endTime = 0; // Will be set when the game starts
    let gameRunning = false; // Flag to track if the game is running
    let timerInterval; // Declare timerInterval outside startGame
    let gameOver = false; // Flag to track if the game is over

    // Function to start the game
    function startGame() {
        if (!gameRunning && !gameOver) {
            totalClicks = 0;
            hits = 0;
            endTime = Date.now() + 30000; // set to 3000 for testing purpose otherwise 30000
            gameRunning = true;
            gameOver = false;

            // Initialize accuracy display
            updateAccuracy();

            // Spawn dots at regular intervals
            const dotInterval = setInterval(spawnDot, spawnInterval);

            // Update timer every second
            timerInterval = setInterval(updateTimer, 1000); // Assign to timerInterval
        }
    }

    // Function to spawn a dot within the spawn area
    function spawnDot() {
        if (gameRunning) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.style.left = Math.random() * spawnAreaWidth + (gameContainer.clientWidth - spawnAreaWidth) / 2 + "px";
            dot.style.top = Math.random() * spawnAreaHeight + (gameContainer.clientHeight - spawnAreaHeight) / 2 + "px";

            // Add event listener to shoot the dot
            dot.addEventListener("click", function() {
                gameContainer.removeChild(dot);
                const index = dots.indexOf(dot);
                if (index > -1) {
                    dots.splice(index, 1);
                    hits++;
                }
                totalClicks++;
                updateAccuracy();
            });

            // Remove dot after a certain time if not clicked
            setTimeout(() => {
                gameContainer.removeChild(dot);
                const index = dots.indexOf(dot);
                if (index > -1) {
                    dots.splice(index, 1);
                    totalClicks++;
                    updateAccuracy();
                }
            }, 2000); // Adjust this value to change the time dots stay visible

            gameContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    // Function to update accuracy display
    function updateAccuracy() {
        const accuracy = hits / totalClicks * 100;
        document.getElementById("accuracy").innerText = `Accuracy: ${accuracy.toFixed(2)}%`;

        // Check if the game session has ended
        if (!gameRunning) {
            if (accuracy < 80 || accuracy === 0) {
                // Show the "Game Over" notification and reset the game
                if (!gameOver) {
                    alert("Game Over! Your accuracy is below 80%. Click OK to restart.");
                    resetGame();
                }
            } else if (accuracy >= 80 && accuracy <= 100) {
                // Show the "Next Level" button
                if (!gameOver) {
                    document.getElementById("nextLevelButton").style.display = "block";
                }
            }
        }
    }

    // Function to update timer display
    function updateTimer() {
        if (gameRunning) {
            const remainingTime = Math.max(0, endTime - Date.now());
            const seconds = Math.floor(remainingTime / 1000);
            document.getElementById("timer").innerText = `Time Remaining: ${seconds} seconds`;

            if (remainingTime === 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }
    }

    // Function to end the game
    function endGame() {
        gameRunning = false;
        clearInterval(timerInterval);
        updateAccuracy(); // Update accuracy to check if it's in the desired range
    }

    // Function to progress to the next level
    function nextLevel() {
        // Redirect to script2.js (next level)
        window.location.href = "index2.html";
    }

    // Function to reset the game
    function resetGame() {
        totalClicks = 0;
        hits = 0;
        gameRunning = false;
        gameOver = true;
        updateAccuracy();
        document.getElementById("nextLevelButton").style.display = "none";
        // Reload the page
        window.location.reload();
    }

    // Add event listener to start button
    document.getElementById("startButton").addEventListener("click", startGame);

    // Add event listener to next level button
    document.getElementById("nextLevelButton").addEventListener("click", nextLevel);
});