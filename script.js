var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

// Create a new div for displaying the score
var scoreDiv = document.createElement("div");
scoreDiv.style.position = "absolute";
scoreDiv.style.top = "20px";  // Position from the top
scoreDiv.style.right = "40px"; // Position from the right
scoreDiv.style.fontSize = "28px"; // Font size for the score
scoreDiv.style.color = "black"; // Font color
scoreDiv.innerText = "Score: 0"; // Initial score text
document.body.appendChild(scoreDiv); // Add the scoreDiv to the body

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 320) + 180);
    hole.style.top = random + "px";
    counter++;
    scoreDiv.innerText = "Score: " + counter; // Update score display
});

setInterval(function () {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(610 - characterTop);

    if ((characterTop > 570) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop - 10) || (cTop > holeTop + 130)))) {
        alert("Game over. Score: " + (counter));
        character.style.top = 100 + "px";
        counter = 0;
        scoreDiv.innerText = "Score: " + counter ; // Reset score display on game over
    }
}, 10);

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((characterTop > 90) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

document.body.onkeydown = function (e) {
    if (e.keyCode == 32) { // 32 is the keyCode for the spacebar
        jump();
    }
}

document.body.ontouchstart = function () {
    jump();
}
