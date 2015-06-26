//TOKYO
var canvasT = document.getElementById("Tokyo");
//create drawing object
var ctxT = canvasT.getContext("2d");
// use canvasT height for radiusT to ensure it works with every canvasT
var radiusT = canvasT.height/2;

// remapping the drawing object to the center of canvasT
ctxT.translate (radiusT,radiusT);

// reduce radiusT to ensure it fits canvasT
radiusT = radiusT*0.90;

// create a funtion to draw the clock

function drawClockT() {
    drawFaceT(ctxT, radiusT);
    drawNumbersT(ctxT, radiusT);
    drawTimeT(ctxT, radiusT);
}

function drawFaceT(ctxT, radiusT) {
    //clockdial
    ctxT.beginPath();
    ctxT.arc (0, 0, radiusT, 0,2*Math.PI);
    ctxT.fillStyle = "white";
    ctxT.fill();
    
    // clock ring
    var gradT = ctxT.createRadialGradient(0,0,radiusT*0.95,0,0,radiusT*1.05)
    gradT.addColorStop(0,"black");
    gradT.addColorStop(0.5, "white");
    gradT.addColorStop(1, "black");
    ctxT.strokeStyle = gradT;
    ctxT.lineWidth = radiusT*0.1;
    ctxT.stroke();
    
    //clock centre
    ctxT.beginPath();
    ctxT.arc (0,0,radiusT*0.1,0,2*Math.PI);
    ctxT.fillStyle = "pink";
    ctxT.fill();
}
// function for drawing numbers
function drawNumbersT(ctxT, radiusT) {
    var ang;
    var num;
    //set font of drawing tool
    ctxT.font = radiusT*0.15 + "px arial";
    
    //set position of text
    ctxT.textBaseline="middle";
    ctxT.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctxT.rotate(ang);
        ctxT.translate(0, -radiusT*0.85);
        ctxT.rotate(-ang);
        ctxT.fillText(num.toString(), 0, 0);
        ctxT.rotate(ang);
        ctxT.translate(0, radiusT*0.85);
        ctxT.rotate(-ang);
    }
}

//Time function
function drawTimeT (ctxT, radiusT) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = (now.getHours()) + 6;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHandT(ctxT, hour, radiusT*0.5, radiusT*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHandT(ctxT, minute, radiusT*0.8, radiusT*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHandT(ctxT, second, radiusT*0.9, radiusT*0.02);
    
}

// function for drawing clock hands
function drawHandT(ctxT, pos, length, width) {
    ctxT.beginPath();
    ctxT.lineWidth = width;
    ctxT.lineCap = "round";
    ctxT.moveTo(0,0);
    ctxT.rotate(pos);
    ctxT.lineTo(0, -length);
    ctxT.stroke();
    ctxT.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClockT, 1000);


