document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("gameContainer");
    let dot; // Variable to hold the single dot
    const spawnAreaWidth = 200; // Width of the spawn area
    const spawnAreaHeight = 200; // Height of the spawn area
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
            endTime = Date.now() + 30000; // set to 30000 for 30 seconds
            gameRunning = true;
            gameOver = false;

            // Initialize accuracy display
            updateAccuracy();

            // Spawn a dot
            spawnDot();

            // Update timer every second
            timerInterval = setInterval(updateTimer, 1000); // Assign to timerInterval
        }
    }

    // Function to spawn a dot within the spawn area
    function spawnDot() {
        if (!dot && gameRunning) { // Only spawn if no dot exists and game is running
            dot = document.createElement("div");
            dot.classList.add("dot");

            // Set dot size to 30px
            dot.style.width = "30px";
            dot.style.height = "30px";

            dot.style.left = Math.random() * spawnAreaWidth + (gameContainer.clientWidth - spawnAreaWidth) / 2 + "px";
            dot.style.top = Math.random() * spawnAreaHeight + (gameContainer.clientHeight - spawnAreaHeight) / 2 + "px";

            // Add event listener to shoot the dot
            dot.addEventListener("click", function() {
                gameContainer.removeChild(dot);
                dot = null; // Reset dot variable
                hits++;
                totalClicks++;
                updateAccuracy();
                setTimeout(spawnDot, 800); // Delay spawning next dot by 800 milliseconds
            });

            // Remove dot after a certain time if not clicked
            setTimeout(() => {
                if (dot) {
                    gameContainer.removeChild(dot);
                    dot = null; // Reset dot variable
                    totalClicks++;
                    updateAccuracy();
                    setTimeout(spawnDot, 800); // Delay spawning next dot by 800 milliseconds
                }
            }, 2000); // Adjust this value to change the time dots stay visible

            gameContainer.appendChild(dot);
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
        // Redirect to level3.html (next level)
        window.location.href = "index3.html";
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