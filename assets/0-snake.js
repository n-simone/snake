/***********************************************
 * Copyright 2016 Nathaniel Simone
 ***********************************************/

const WIDTH = 20;
const HEIGHT = 12;
const SIZE = 75;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Snake () 
{
    this.x = 0;
    this.y = 0;

    this.dx = 0;
    this.dy = 0;
    
    this.length = 0;

    this.grid = new Array(WIDTH);
    for (var x = 0; x < WIDTH; x++) {
        this.grid[x] = new Array(HEIGHT);
        for (var y = 0; y < HEIGHT; y++) {
            this.grid[x][y] = 0;
        }
    }

    this.dot = {'x': 0, 'y': 0};

    this.init();
}

Snake.prototype.init = function ()
{
    this.x = Math.floor(WIDTH / 2);
    this.y = Math.floor(HEIGHT / 2);

    this.dx = 1;
    this.dy = 0;

    this.length = 3;

    this.grid[this.x][this.y] = 1;

    this.spawnDot();
};

Snake.prototype.update = function ()
{
    /* PATHFINDING */

    /* MOVEMENT */
    this.x += this.dx;
    this.y += this.dy;

    if ( (this.x >= WIDTH) || (this.y >= HEIGHT) ||  (this.x < 0) || (this.y < 0) ) {
        this.kill();
    }

    else if ( (this.grid[this.x][this.y] > 0) && (this.grid[this.x][this.y] < this.length) ) {
        this.kill();
    }


    else {
        for (var x = 0; x < WIDTH; x++) {
            for (var y = 0; y < HEIGHT; y++) {
                if (this.grid[x][y] > 0) {
                    this.grid[x][y]++;
                }
            }
        }

        if (this.grid[this.x][this.y] == -1) {
            this.length++;
            this.spawnDot();
        }

        this.grid[this.x][this.y] = 1;
    }

    /* DRAWING */

    var width = 0;
    var height = 0;
    var offsetx = 0;
    var offsety = 0;

    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {

            if ( (this.grid[x][y] > 0) && (this.grid[x][y] <= this.length) ) {
                ctx.fillStyle = '#fff';

                width = canvas.width / WIDTH - SIZE / 5;
                height = canvas.height / HEIGHT - SIZE / 5;
                offsetx = x * canvas.width / WIDTH + SIZE / 10;
                offsety = y * canvas.height / HEIGHT + SIZE / 10;

                if (this.grid[x][y] < this.length) {
                    if ( (x < WIDTH - 1) && (this.grid[x+1][y] == this.grid[x][y]+1) ) {
                        width += SIZE / 5;
                    }
                    else if ( (x > 0 ) && (this.grid[x-1][y] == this.grid[x][y]+1) ) {
                        width += SIZE / 5;
                        offsetx -= SIZE / 5;
                    }
                    else if ( (y < HEIGHT - 1) && (this.grid[x][y+1] == this.grid[x][y]+1) ) {
                        height += SIZE / 5;
                    }
                    else if ( (y > 0) && (this.grid[x][y-1] == this.grid[x][y]+1) ) {
                        height += SIZE / 5;
                        offsety -= SIZE / 5;
                    }
                }

                ctx.fillRect(Math.floor(offsetx), Math.floor(offsety), Math.floor(width), Math.floor(height));
            }

            else if (this.grid[x][y] == -1) {
                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.arc(x * canvas.width / WIDTH + SIZE / 2, y * canvas.height / HEIGHT + SIZE / 2, SIZE / 4, 0, 2*Math.PI);
                ctx.fillStyle = '#fff';
                ctx.closePath();
                ctx.fill();
            }

            /*
            ctx.fillStyle = '#f00';
            ctx.font = '30px Arial';
            ctx.fillText(this.grid[x][y], x * canvas.width / WIDTH + SIZE / 4, y * canvas.height / HEIGHT + SIZE / 2);
            */
        }
    }
};

Snake.prototype.turn = function(direction)
{
    switch (direction) {
        case 'left':
            this.dx = -1;
            this.dy = 0;
            break;
        case 'up':
            this.dx = 0;
            this.dy = -1;
            break;
        case 'right':
            this.dx = 1;
            this.dy = 0;
            break;
        case 'down':
            this.dx = 0;
            this.dy = 1;
            break;
        default:
            console.log('WARNING: not a valid direction');
    }
}

Snake.prototype.pathfind = function() {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
        }
    }
}

Snake.prototype.spawnDot = function ()
{
    this.dot.x = Math.floor(Math.random() * WIDTH);
    this.dot.y = Math.floor(Math.random() * HEIGHT);
    
    if ( (this.grid[this.dot.x][this.dot.y] == 0) || (this.grid[this.dot.x][this.dot.y] > this.length) ) {
        this.grid[this.dot.x][this.dot.y] = -1;
    }
    else {
        this.spawnDot();
    }
}

Snake.prototype.kill = function ()
{
    clearInterval(process);
    console.log('GAME OVER!');
}

function update()
{
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.update();
}

ctx.canvas.style.width = WIDTH * SIZE + 'px';
ctx.canvas.style.height = HEIGHT * SIZE + 'px';
ctx.canvas.width  = ctx.canvas.offsetWidth;
ctx.canvas.height = ctx.canvas.offsetHeight;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

snake = new Snake();

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37: // left arrow
            snake.turn('left');
            break;
        case 38: // up arrow
            snake.turn('up');
            break;
        case 39: // right arrow
            snake.turn('right');
            break;
        case 40: // down arrow
            snake.turn('down');
            break;
    }
}, false);

var process = setInterval(update, 100);

