//LAGOS
var canvas = document.getElementById("Lagos");
//create drawing object
var ctx = canvas.getContext("2d");
// use canvas height for radius to ensure it works with every canvas
var radius = canvas.height/2;

// remapping the drawing object to the center of canvas
ctx.translate (radius,radius);

// reduce radius to ensure it fits canvas
radius = radius*0.90;

// create a funtion to draw the clock

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    //clockdial
    ctx.beginPath();
    ctx.arc (0, 0, radius, 0,2*Math.PI);
    ctx.fillStyle = "brown";
    ctx.fill();
    
    // clock ring
    var grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05)
    grad.addColorStop(0,"brown");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "brown");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    
    //clock centre
    ctx.beginPath();
    ctx.arc (0,0,radius*0.1,0,2*Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
}
// function for drawing numbers
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    //set font of drawing tool
    ctx.font = radius*0.15 + "px arial";
    
    //set position of text
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

//Time function
function drawTime (ctx, radius) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = (now.getHours()) - 2;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
    
}

// function for drawing clock hands
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClock, 1000);

