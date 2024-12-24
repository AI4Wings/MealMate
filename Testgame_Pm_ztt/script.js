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
let isDualMode = false; // 双方块模式 | Dual Block Mode
let isHistoryVisible = false; // 历史记录显示状态 | History Display State
let gameBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let currentPiece = null;
let nextPiece = null;
let secondPiece = null; // 第二个方块 | Second Block

// 历史记录 | History Records
const MAX_HISTORY = 10;
let gameHistory = [];

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
    
    // 模式选择按钮事件监听 | Mode Selection Button Event Listeners
    document.getElementById('singleModeSelect').addEventListener('click', () => {
        isDualMode = false;
        startNewGame();
    });
    
    document.getElementById('dualModeSelect').addEventListener('click', () => {
        isDualMode = true;
        startNewGame();
    });
    
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('pauseButton').addEventListener('click', togglePause);
    document.getElementById('exitButton').addEventListener('click', exitGame);
    document.getElementById('recordsButton').addEventListener('click', toggleHistory);
    document.addEventListener('keydown', handleKeyPress);
});

// 开始游戏 | Start Game
function startGame() {
    resetGame();
    currentPiece = new Piece();
    nextPiece = new Piece();
    if (isDualMode) {
        secondPiece = new Piece();
        secondPiece.x = Math.min(COLS - secondPiece.shape[0].length, currentPiece.x + 4);
    }
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
    secondPiece = null;
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
    
    let shouldCreateNewPieces = false;
    
    // Update current piece
    if (!checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
        currentPiece.y++;
    } else {
        mergePiece(currentPiece);
        shouldCreateNewPieces = true;
    }
    
    // Update second piece in dual mode
    if (isDualMode && secondPiece) {
        if (!checkCollision(secondPiece.shape, secondPiece.x, secondPiece.y + 1)) {
            secondPiece.y++;
        } else {
            mergePiece(secondPiece);
            shouldCreateNewPieces = true;
        }
    }
    
    // Create new pieces if needed
    if (shouldCreateNewPieces) {
        clearLines();
        currentPiece = nextPiece;
        nextPiece = new Piece();
        
        
        if (isDualMode) {
            secondPiece = new Piece();
            secondPiece.x = Math.min(COLS - secondPiece.shape[0].length, currentPiece.x + 4);
        }
        
        // Check for game over
        if (checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y) ||
            (isDualMode && secondPiece && checkCollision(secondPiece.shape, secondPiece.x, secondPiece.y))) {
            gameOver();
            return;
        }
    }
    
    draw();
}

// 合并方块 | Merge Piece
function mergePiece(piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                gameBoard[piece.y + y][piece.x + x] = piece.color;
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
// 添加历史记录 | Add History Record
function addHistoryRecord() {
    const record = {
        score: score,
        level: level,
        mode: isDualMode ? '双方块模式 | Dual Mode' : '单方块模式 | Single Mode',
        date: new Date().toLocaleString('zh-CN')
    };
    
    gameHistory.unshift(record);
    if (gameHistory.length > MAX_HISTORY) {
        gameHistory.pop();
    }
    
    updateHistoryDisplay();
}

// 更新历史记录显示 | Update History Display
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = gameHistory.map(record => `
        <div class="history-item">
            <div class="history-score">得分 | Score: ${record.score}</div>
            <div class="history-mode">${record.mode}</div>
            <div class="history-date">${record.date}</div>
        </div>
    `).join('');
}

function gameOver() {
    clearInterval(gameLoop);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束 | Game Over', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '20px "Noto Sans SC"';
    ctx.fillText('最终得分 | Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 20);
    document.getElementById('startButton').textContent = '重新开始 | Restart';
    
    // 返回模式选择界面 | Return to mode selection screen
    setTimeout(() => {
        document.getElementById('modeSelection').style.display = 'block';
        document.getElementById('gameContent').style.display = 'none';
        document.querySelector('.history-section').style.display = 'none';
    }, 2000);
    
    // Add game to history
    addHistoryRecord();
}

// 开始新游戏 | Start New Game
function startNewGame() {
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    document.querySelector('.history-section').style.display = 'none';
    isHistoryVisible = false;
    startGame();
}

// 切换历史记录显示 | Toggle History Display
function toggleHistory() {
    isHistoryVisible = !isHistoryVisible;
    const historySection = document.querySelector('.history-section');
    historySection.style.display = isHistoryVisible ? 'block' : 'none';
    if (isHistoryVisible) {
        updateHistoryDisplay();
    }
}

// 暂停/继续游戏 | Pause/Resume Game
function togglePause() {
    if (!currentPiece) return;
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pauseButton');
    
    if (isPaused) {
        clearInterval(gameLoop);
        pauseButton.textContent = '继续 | Resume';
        // Draw pause overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px "Noto Sans SC"';
        ctx.textAlign = 'center';
        ctx.fillText('已暂停 | Paused', canvas.width / 2, canvas.height / 2);
    } else {
        gameLoop = setInterval(update, 1000 - (level * 50));
        pauseButton.textContent = '暂停 | Pause';
        draw();
    }
}

// 退出游戏 | Exit Game
// 切换双方块模式 | Toggle Dual Block Mode
function toggleDualMode() {
    isDualMode = !isDualMode;
    
    if (currentPiece) {
        if (isDualMode) {
            secondPiece = new Piece();
            secondPiece.x = Math.min(COLS - secondPiece.shape[0].length, currentPiece.x + 4);
        } else {
            secondPiece = null;
        }
        draw();
    }
}

function exitGame() {
    clearInterval(gameLoop);
    currentPiece = null;
    nextPiece = null;
    secondPiece = null;
    gameBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    isPaused = false;
    isDualMode = false;
    updateScore();
    
    // Reset UI
    document.getElementById('startButton').textContent = '开始游戏 | Start Game';
    document.getElementById('pauseButton').textContent = '暂停 | Pause';
    
    // Clear both canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextPieceCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
    
    // Return to mode selection screen | 返回模式选择界面
    document.getElementById('modeSelection').style.display = 'block';
    document.getElementById('gameContent').style.display = 'none';
    document.querySelector('.history-section').style.display = 'none';
    isHistoryVisible = false;
}

// 键盘控制 | Keyboard Controls
function handleKeyPress(event) {
    if (event.keyCode === 27) { // ESC键 | ESC Key
        exitGame();
        return;
    }
    
    
    if (event.keyCode === 68) { // D键切换双方块模式 | D key to toggle dual mode
        toggleDualMode();
        return;
    }
    
    if (!currentPiece || isPaused) return;
    
    switch(event.keyCode) {
        case 37: // 左移 | Left
            if (!checkCollision(currentPiece.shape, currentPiece.x - 1, currentPiece.y)) {
                currentPiece.x--;
                if (isDualMode && secondPiece && !checkCollision(secondPiece.shape, secondPiece.x - 1, secondPiece.y)) {
                    secondPiece.x--;
                }
            }
            break;
        case 39: // 右移 | Right
            if (!checkCollision(currentPiece.shape, currentPiece.x + 1, currentPiece.y)) {
                currentPiece.x++;
                if (isDualMode && secondPiece && !checkCollision(secondPiece.shape, secondPiece.x + 1, secondPiece.y)) {
                    secondPiece.x++;
                }
            }
            break;
        case 40: // 加速下落 | Speed Up
            if (!checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
                currentPiece.y++;
                if (isDualMode && secondPiece && !checkCollision(secondPiece.shape, secondPiece.x, secondPiece.y + 1)) {
                    secondPiece.y++;
                }
            }
            break;
        case 38: // 旋转 | Rotate
            currentPiece.rotate();
            if (isDualMode && secondPiece) {
                secondPiece.rotate();
            }
            break;
        case 32: // 空格键暂停 | Space to Pause
            togglePause();
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
    
    // 绘制第二个方块 | Draw Second Piece
    if (isDualMode && secondPiece) {
        secondPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(ctx, secondPiece.x + x, secondPiece.y + y, secondPiece.color);
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
