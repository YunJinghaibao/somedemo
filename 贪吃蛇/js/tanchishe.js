var startBtn = document.getElementsByClassName('btn')[0],
    reStartBtn = document.getElementsByClassName('btn')[1],
    increaseSpeed = document.getElementsByClassName('btn')[2],
    decreaseSpeed = document.getElementsByClassName('btn')[3],
    alertScore = document.getElementsByClassName('score')[0],
    fnScore = document.getElementsByClassName('score')[1],
    speedBox = document.getElementById('speed'),
    box = document.getElementById('box'),
    alert = document.getElementsByClassName('alertBox')[0],
    snakeArr = [[2, 0, 'head'], [1, 0, 'body'], [0, 0, 'body']],
    foodX = box.offsetWidth / 30,
    foodY = box.offsetHeight / 30,
    score = 0,
    snakeTimer,
    speedNum = 1,
    speed = 500,
    flag = false;
direction = 'right';
left = false;
right = false;
up = true;
down = true;
reStartBtn.onclick = function () {
    window.location.reload();
};
increaseSpeed.onclick = function () {
    if (flag === true) {
        inSpeed();
        inspeedNum();
        clearInterval(snakeTimer);
        snakeTimer = setInterval(function () {
            snakeMove();
        }, speed)
        speedBox.innerHTML = speedNum;
    } else {
        return false;
    }
};
function inSpeed() {
    if (speed < 200) {
        speed = 100;
    } else {
        speed -= 100;
    }
    return speed;
};
function inspeedNum() {
    if (speedNum > 4) {
        speedNum = 5;
    } else {
        speedNum++;
    }
    return speedNum;
};
decreaseSpeed.onclick = function () {
    if (flag === true) {
        deSpeed();
        despeedNum();
        clearInterval(snakeTimer);
        snakeTimer = setInterval(function () {
            snakeMove();
        }, speed)
        speedBox.innerHTML = speedNum;
    } else {
        return false;
    }
};
function deSpeed() {
    if (speed > 400) {
        speed = 500;
    } else {
        speed += 100;
    }
    return speed;
};
function despeedNum() {
    if (speedNum < 2) {
        speedNum = 1;
    } else {
        speedNum--;
    }
    return speedNum;
};
startBtn.onclick = function () {
    snake(snakeArr);
    food();
    flag = true;
    snakeTimer = setInterval(function () {
        snakeMove();
    }, speed)
    bindEvent();
    startBtn.setAttribute('disabled', 'disabled');
};
function snake(arr) {
    for (var i = 0; i < arr.length; i++) {
        var snake = document.createElement('div');
        snake.style.left = arr[i][0] * (box.offsetWidth / 30) + 'px';
        snake.style.top = arr[i][1] * (box.offsetWidth / 30) + 'px';
        snake.setAttribute('class', arr[i][2]);
        box.appendChild(snake);
        snake.classList.add('snake');
    };
};
function food() {
    var food = document.createElement('div');
    food.setAttribute('class', 'food');
    food.style.left = foodX * (Math.floor(Math.random() * 30)) + 'px';
    food.style.top = foodY * (Math.floor(Math.random() * 30)) + 'px';
    box.appendChild(food);
};
function snakeMove() {
    for (var i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i][0] = snakeArr[i - 1][0];
        snakeArr[i][1] = snakeArr[i - 1][1];
    }
    switch (direction) {
        case 'up':
            snakeArr[0][1] -= 1;
            break;
        case 'down':
            snakeArr[0][1] += 1;
            break;
        case 'left':
            snakeArr[0][0] -= 1;
            break;
        case 'right':
            snakeArr[0][0] += 1;
            break;
        default:
            break;
    }
    var foodLeft = parseInt(document.getElementsByClassName('food')[0].style.left);
    var foodTop = parseInt(document.getElementsByClassName('food')[0].style.top);
    remove('snake');
    snake(snakeArr);
    if (snakeArr[0][0] == foodLeft / 20 && snakeArr[0][1] == foodTop / 20) {
        var lastSnakeX = snakeArr[snakeArr.length - 1][0],
            lastSnakeY = snakeArr[snakeArr.length - 1][1];
        switch (direction) {
            case 'up':
                snakeArr.push([lastSnakeX, lastSnakeY + 1, 'body'])
                break;
            case 'down':
                snakeArr.push([lastSnakeX, lastSnakeY - 1, 'body'])
                break;
            case 'left':
                snakeArr.push([lastSnakeX + 1, lastSnakeY, 'body'])
                break;
            case 'right':
                snakeArr.push([lastSnakeX - 1, lastSnakeY, 'body'])
                break;
            default:
                break;
        }
        score += 1;
        remove('food');
        food();
        alertScore.innerHTML = score;
        fnScore.innerHTML = score;
    }
    if (snakeArr[0][0] < 0 || snakeArr[0][0] > box.offsetWidth / 20) {
        gameOver();
    }
    if (snakeArr[0][1] < 0 || snakeArr[0][1] > box.offsetHeight / 20) {
        gameOver();
    }
    var snakeHX = snakeArr[0][0],
        snakeHY = snakeArr[0][1];
    for (var i = 1; i < snakeArr.length; i++) {
        if (snakeHX == snakeArr[i][0] && snakeHY == snakeArr[i][1]) {
            gameOver();
        }
    }
};
function gameOver() {
    clearInterval(snakeTimer);
    remove('snake');
    remove('food');
    alert.style.display = 'block';
};
function remove(className) {
    var n = document.getElementsByClassName(className);
    while (n.length > 0) {
        n[0].parentNode.removeChild(n[0]);
    }
};
function direc(code) {
    switch (code) {
        case 37:
            if (left) {
                direction = 'left';
                left = false;
                right = false;
                up = true;
                down = true;
            }
            break;
        case 38:
            if (up) {
                direction = 'up';
                left = true;
                right = true;
                up = false;
                down = false;
            }
            break;
        case 39:
            if (right) {
                direction = 'right';
                left = false;
                right = false;
                up = true;
                down = true;
            }
            break;
        case 40:
            if (down) {
                direction = 'down';
                left = true;
                right = true;
                up = false;
                down = false;
            }
            break;
        default:
            break;
    }
};
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        direc(code);
    }
};