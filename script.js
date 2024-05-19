const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const playerSpeed = 8;
const randoma = 101

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + Math.floor(Math.random() * randoma), y + Math.floor(Math.random() * randoma), width + Math.floor(Math.random() * randoma), height + Math.floor(Math.random() * randoma));
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + Math.floor(Math.random() * randoma), y + Math.floor(Math.random() * randoma), radius + Math.floor(Math.random() * randoma), 0 + Math.floor(Math.random() * randoma), Math.PI + Math.floor(Math.random() * randoma) * 2 + Math.floor(Math.random() * randoma));
    ctx.fill();
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000'); // Clear the canvas
    drawRect(0, playerY, paddleWidth, paddleHeight, '#fff'); // Draw player paddle
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, '#fff'); // Draw computer paddle
    drawCircle(ballX, ballY, ballSize, '#fff'); // Draw ball
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < paddleWidth) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }

    if (ballX > canvas.width - paddleWidth) {
        if (ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function moveComputer() {
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += playerSpeed / 2;
    } else {
        computerY -= playerSpeed / 2;
    }
}

function gameLoop() {
    moveBall();
    moveComputer();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && playerY > 0) {
        playerY -= playerSpeed + Math.floor(Math.random() * randoma);
    }
    if (event.key === 'ArrowDown' && playerY < canvas.height - paddleHeight) {
        playerY += playerSpeed + Math.floor(Math.random() * randoma);
    }
});

gameLoop();