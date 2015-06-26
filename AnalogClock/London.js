//LONDON

var canvasL = document.getElementById("London");
//create drawing object
var ctxL = canvasL.getContext("2d");
// use canvasL height for radiusL to ensure it works with every canvasL
var radiusL = canvasL.height/2;

// remapping the drawing object to the center of canvasL
ctxL.translate (radiusL,radiusL);

// reduce radiusL to ensure it fits canvasL
radiusL = radiusL*0.90;

// create a funtion to draw the clock

function drawClockL() {
    drawFaceL(ctxL, radiusL);
    drawNumbersL(ctxL, radiusL);
    drawTimeL(ctxL, radiusL);
}

function drawFaceL(ctxL, radiusL) {
    //clockdial
    ctxL.beginPath();
    ctxL.arc (0, 0, radiusL, 0,2*Math.PI);
    ctxL.fillStyle = "blue";
    ctxL.fill();
    
    // clock ring
    var grad = ctxL.createRadialGradient(0,0,radiusL*0.95,0,0,radiusL*1.05)
    grad.addColorStop(0,"white");
    grad.addColorStop(0.5, "blue");
    grad.addColorStop(1, "white");
    ctxL.strokeStyle = grad;
    ctxL.lineWidth = radiusL*0.1;
    ctxL.stroke();
    
    //clock centre
    ctxL.beginPath();
    ctxL.arc (0,0,radiusL*0.1,0,2*Math.PI);
    ctxL.fillStyle = "pink";
    ctxL.fill();
}
// function for drawing numbers
function drawNumbersL(ctxL, radiusL) {
    var ang;
    var num;
    //set font of drawing tool
    ctxL.font = radiusL*0.15 + "px arial";
    
    //set position of text
    ctxL.textBaseline="middle";
    ctxL.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctxL.rotate(ang);
        ctxL.translate(0, -radiusL*0.85);
        ctxL.rotate(-ang);
        ctxL.fillText(num.toString(), 0, 0);
        ctxL.rotate(ang);
        ctxL.translate(0, radiusL*0.85);
        ctxL.rotate(-ang);
    }
}

//Time function
function drawTimeL (ctxL, radiusL) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = (now.getHours()) - 2;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHandL(ctxL, hour, radiusL*0.5, radiusL*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHandL(ctxL, minute, radiusL*0.8, radiusL*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHandL(ctxL, second, radiusL*0.9, radiusL*0.02);
    
}

// function for drawing clock hands
function drawHandL(ctxL, pos, length, width) {
    ctxL.beginPath();
    ctxL.lineWidth = width;
    ctxL.lineCap = "round";
    ctxL.moveTo(0,0);
    ctxL.rotate(pos);
    ctxL.lineTo(0, -length);
    ctxL.stroke();
    ctxL.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClockL, 1000);
