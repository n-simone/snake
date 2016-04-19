/***********************************************
 * Copyright 2016 Nathaniel Simone
 ***********************************************/

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Brush () 
{
    this.x = 0;
    this.y = 0;
    this.init();
}

Brush.prototype.init = function ()
{
    // stuff
}

Snake.prototype.update = function ()
{
    // stuff
};

function update()
{
    // stuff
}

ctx.canvas.style.width='100%';
ctx.canvas.style.height='100%';
ctx.canvas.width  = ctx.canvas.offsetWidth;
ctx.canvas.height = ctx.canvas.offsetHeight;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

setInterval(update, 20);

