// 游戏配置 | Game Configuration
const GRID_SIZE = 30;
const ROWS = 20;
const COLS = 10;
const COLORS = ['#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];

// 俄罗斯方块形状 | Tetris Shapes
const SHAPES = [
    [[1, 1, 1, 1]],                    // I
    [[1, 1], [1, 1]],                  // O
    [[1, 1, 1], [0, 1, 0]],           // T
    [[1, 1, 1], [1, 0, 0]],           // L
    [[1, 1, 1], [0, 0, 1]],           // J
    [[1, 1, 0], [0, 1, 1]],           // S
    [[0, 1, 1], [1, 1, 0]]            // Z
];

// 游戏变量 | Game Variables
let canvas, ctx;
let nextPieceCanvas, nextPieceCtx;
let gameLoop;
let score = 0;
let level = 1;
let isPaused = false;
let gameBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let currentPiece = null;
let nextPiece = null;

// 方块类 | Piece Class
class Piece {
    constructor(shape = null) {
        this.shape = shape || SHAPES[Math.floor(Math.random() * SHAPES.length)];
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.x = Math.floor(COLS / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
    }

    rotate() {
        const newShape = this.shape[0].map((_, i) => 
            this.shape.map(row => row[i]).reverse()
        );
        if (!checkCollision(newShape, this.x, this.y)) {
            this.shape = newShape;
        }
    }
}

// 碰撞检测 | Collision Detection
function checkCollision(shape, x, y) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] && (
                y + row >= ROWS ||
                x + col < 0 ||
                x + col >= COLS ||
                gameBoard[y + row][x + col]
            )) {
                return true;
            }
        }
    }
    return false;
}

// 游戏初始化 | Game Initialization
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('tetris');
    ctx = canvas.getContext('2d');
    nextPieceCanvas = document.getElementById('nextPiece');
    nextPieceCtx = nextPieceCanvas.getContext('2d');
    
    document.getElementById('startButton').addEventListener('click', startGame);
    document.addEventListener('keydown', handleKeyPress);
});

// 开始游戏 | Start Game
function startGame() {
    resetGame();
    currentPiece = new Piece();
    nextPiece = new Piece();
    gameLoop = setInterval(update, 1000 - (level * 50));
    document.getElementById('startButton').textContent = '重新开始 | Restart';
}

// 重置游戏 | Reset Game
function resetGame() {
    if (gameLoop) clearInterval(gameLoop);
    gameBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    isPaused = false;
    updateScore();
}

// 更新分数 | Update Score
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}

// 游戏更新 | Game Update
function update() {
    if (isPaused) return;
    
    if (!checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
        currentPiece.y++;
    } else {
        mergePiece();
        clearLines();
        currentPiece = nextPiece;
        nextPiece = new Piece();
        
        if (checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y)) {
            gameOver();
            return;
        }
    }
    draw();
}

// 合并方块 | Merge Piece
function mergePiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                gameBoard[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
            }
        });
    });
}

// 清除行 | Clear Lines
function clearLines() {
    let linesCleared = 0;
    
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameBoard[row].every(cell => cell !== 0)) {
            gameBoard.splice(row, 1);
            gameBoard.unshift(Array(COLS).fill(0));
            linesCleared++;
            row++;
        }
    }
    
    if (linesCleared > 0) {
        score += linesCleared * 100 * level;
        level = Math.floor(score / 1000) + 1;
        clearInterval(gameLoop);
        gameLoop = setInterval(update, 1000 - (level * 50));
        updateScore();
    }
}

// 游戏结束 | Game Over
function gameOver() {
    clearInterval(gameLoop);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束 | Game Over', canvas.width / 2, canvas.height / 2);
}

// 键盘控制 | Keyboard Controls
function handleKeyPress(event) {
    if (!currentPiece) return;
    
    switch(event.keyCode) {
        case 37: // 左移 | Left
            if (!checkCollision(currentPiece.shape, currentPiece.x - 1, currentPiece.y)) {
                currentPiece.x--;
            }
            break;
        case 39: // 右移 | Right
            if (!checkCollision(currentPiece.shape, currentPiece.x + 1, currentPiece.y)) {
                currentPiece.x++;
            }
            break;
        case 40: // 加速下落 | Speed Up
            if (!checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
                currentPiece.y++;
            }
            break;
        case 38: // 旋转 | Rotate
            currentPiece.rotate();
            break;
        case 32: // 暂停 | Pause
            isPaused = !isPaused;
            break;
    }
    draw();
}

// 绘制游戏 | Draw Game
function draw() {
    // 清空画布 | Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextPieceCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
    
    // 绘制游戏板 | Draw Game Board
    gameBoard.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color) {
                drawBlock(ctx, x, y, color);
            }
        });
    });
    
    // 绘制当前方块 | Draw Current Piece
    if (currentPiece) {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(ctx, currentPiece.x + x, currentPiece.y + y, currentPiece.color);
                }
            });
        });
    }
    
    // 绘制下一个方块 | Draw Next Piece
    if (nextPiece) {
        const offsetX = (nextPieceCanvas.width - nextPiece.shape[0].length * GRID_SIZE) / 2;
        const offsetY = (nextPieceCanvas.height - nextPiece.shape.length * GRID_SIZE) / 2;
        
        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(nextPieceCtx, x + offsetX / GRID_SIZE, y + offsetY / GRID_SIZE, nextPiece.color);
                }
            });
        });
    }
}

// 绘制方块 | Draw Block
function drawBlock(context, x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
}
