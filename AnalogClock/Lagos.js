//LAGOS
var canvasLag = document.getElementById("Lagos");
//create drawing object
var ctxLag = canvasLag.getContext("2d");
// use canvasLag height for radiusLag to ensure it works with every canvasLag
var radiusLag = canvasLag.height/2;

// remapping the drawing object to the center of canvasLag
ctxLag.translate (radiusLag,radiusLag);

// reduce radiusLag to ensure it fits canvasLag
radiusLag = radiusLag*0.90;

// create a funtion to draw the clock

function drawClockLag() {
    drawFaceLag(ctxLag, radiusLag);
    drawNumbersLag(ctxLag, radiusLag);
    drawTimeLag(ctxLag, radiusLag);
}

function drawFaceLag(ctxLag, radiusLag) {
    //clockdial
    ctxLag.beginPath();
    ctxLag.arc (0, 0, radiusLag, 0,2*Math.PI);
    ctxLag.fillStyle = "white";
    ctxLag.fill();
    
    // clock ring
    var grad = ctxLag.createRadialGradient(0,0,radiusLag*0.95,0,0,radiusLag*1.05)
    grad.addColorStop(0,"brown");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "brown");
    ctxLag.strokeStyle = grad;
    ctxLag.lineWidth = radiusLag*0.1;
    ctxLag.stroke();
    
    //clock centre
    ctxLag.beginPath();
    ctxLag.arc (0,0,radiusLag*0.1,0,2*Math.PI);
    ctxLag.fillStyle = "pink";
    ctxLag.fill();
}
// function for drawing numbers
function drawNumbersLag(ctxLag, radiusLag) {
    var ang;
    var num;
    //set font of drawing tool
    ctxLag.font = radiusLag*0.15 + "px arial";
    
    //set position of text
    ctxLag.textBaseline="middle";
    ctxLag.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctxLag.rotate(ang);
        ctxLag.translate(0, -radiusLag*0.85);
        ctxLag.rotate(-ang);
        ctxLag.fillText(num.toString(), 0, 0);
        ctxLag.rotate(ang);
        ctxLag.translate(0, radiusLag*0.85);
        ctxLag.rotate(-ang);
    }
}

//Time function
function drawTimeLag (ctxLag, radiusLag) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = (now.getHours()) - 2;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHandLag(ctxLag, hour, radiusLag*0.5, radiusLag*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHandLag(ctxLag, minute, radiusLag*0.8, radiusLag*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHandLag(ctxLag, second, radiusLag*0.9, radiusLag*0.02);
    
}

// function for drawing clock hands
function drawHandLag(ctxLag, pos, length, width) {
    ctxLag.beginPath();
    ctxLag.lineWidth = width;
    ctxLag.lineCap = "round";
    ctxLag.moveTo(0,0);
    ctxLag.rotate(pos);
    ctxLag.lineTo(0, -length);
    ctxLag.stroke();
    ctxLag.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClockLag, 1000);

