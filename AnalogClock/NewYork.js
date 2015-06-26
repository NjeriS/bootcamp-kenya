//TOKYO
var canvasN = document.getElementById("NewYork");
//create drawing object
var ctxN = canvasN.getContext("2d");
// use canvasN height for radiusN to ensure it works with every canvasN
var radiusN = canvasN.height/2;

// remapping the drawing object to the center of canvasN
ctxN.translate (radiusN,radiusN);

// reduce radiusN to ensure it fits canvasN
radiusN = radiusN*0.90;

// create a funtion to draw the clock

function drawClockN() {
    drawFaceN(ctxN, radiusN);
    drawNumbersN(ctxN, radiusN);
    drawTimeN(ctxN, radiusN);
}

function drawFaceN(ctxN, radiusN) {
    //clockdial
    ctxN.beginPath();
    ctxN.arc (0, 0, radiusN, 0,2*Math.PI);
    ctxN.fillStyle = "green";
    ctxN.fill();
    
    // clock ring
    var gradN = ctxN.createRadialGradient(0,0,radiusN*0.95,0,0,radiusN*1.05)
    gradN.addColorStop(0,"black");
    gradN.addColorStop(0.5, "white");
    gradN.addColorStop(1, "black");
    ctxN.strokeStyle = gradN;
    ctxN.lineWidth = radiusN*0.1;
    ctxN.stroke();
    
    //clock centre
    ctxN.beginPath();
    ctxN.arc (0,0,radiusN*0.1,0,2*Math.PI);
    ctxN.fillStyle = "pink";
    ctxN.fill();
}
// function for drawing numbers
function drawNumbersN(ctxN, radiusN) {
    var ang;
    var num;
    //set font of drawing tool
    ctxN.font = radiusN*0.15 + "px arial";
    
    //set position of text
    ctxN.textBaseline="middle";
    ctxN.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctxN.rotate(ang);
        ctxN.translate(0, -radiusN*0.85);
        ctxN.rotate(-ang);
        ctxN.fillText(num.toString(), 0, 0);
        ctxN.rotate(ang);
        ctxN.translate(0, radiusN*0.85);
        ctxN.rotate(-ang);
    }
}

//Time function
function drawTimeN (ctxN, radiusN) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = (now.getHours()) - 7;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHandN(ctxN, hour, radiusN*0.5, radiusN*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHandN(ctxN, minute, radiusN*0.8, radiusN*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHandN(ctxN, second, radiusN*0.9, radiusN*0.02);
    
}

// function for drawing clock hands
function drawHandN(ctxN, pos, length, width) {
    ctxN.beginPath();
    ctxN.lineWidth = width;
    ctxN.lineCap = "round";
    ctxN.moveTo(0,0);
    ctxN.rotate(pos);
    ctxN.lineTo(0, -length);
    ctxN.stroke();
    ctxN.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClockN, 1000);


