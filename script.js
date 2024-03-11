document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("gameContainer");
    const dots = [];
    const spawnAreaWidth = 200; // Width of the spawn area
    const spawnAreaHeight = 200; // Height of the spawn area
    const spawnInterval = 500; // Interval for spawning dots in milliseconds
    let totalClicks = 0;
    let hits = 0;
    let endTime = Date.now() + 30000; // Game ends after 30 seconds

    // Function to spawn a dot within the spawn area
    function spawnDot() {
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

    // Function to update accuracy display
    function updateAccuracy() {
        const accuracy = hits / totalClicks * 100;
        document.getElementById("accuracy").innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
    }

    // Function to update timer display
    function updateTimer() {
        const remainingTime = Math.max(0, endTime - Date.now());
        const seconds = Math.floor(remainingTime / 1000);
        document.getElementById("timer").innerText = `Time Remaining: ${seconds} seconds`;

        if (remainingTime === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }

    // Function to end the game
    function endGame() {
        alert(`Game Over! Your accuracy: ${(hits / totalClicks * 100).toFixed(2)}%`);
    }

    // Spawn dots at regular intervals
    const dotInterval = setInterval(spawnDot, spawnInterval);

    // Update timer every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Initialize accuracy display
    updateAccuracy();
});