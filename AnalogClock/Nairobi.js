var canvasNbi = document.getElementById("Nairobi");
//create drawing object
var ctxNbi = canvasNbi.getContext("2d");
// use canvasNbi height for radiusNbi to ensure it works with every canvasNbi
var radiusNbi = canvasNbi.height/2;

// remapping the drawing object to the center of canvasNbi
ctxNbi.translate (radiusNbi,radiusNbi);

// reduce radiusNbi to ensure it fits canvasNbi
radiusNbi = radiusNbi*0.90;

// create a funtion to draw the clock

function drawClock() {
    drawFace(ctxNbi, radiusNbi);
    drawNumbers(ctxNbi, radiusNbi);
    drawTime(ctxNbi, radiusNbi);
}

function drawFace(ctxNbi, radiusNbi) {
    //clockdial
    ctxNbi.beginPath();
    ctxNbi.arc (0, 0, radiusNbi, 0,2*Math.PI);
    ctxNbi.fillStyle = "violet";
    ctxNbi.fill();
    
    // clock ring
    var grad = ctxNbi.createRadialGradient(0,0,radiusNbi*0.95,0,0,radiusNbi*1.05)
    grad.addColorStop(0,"#FF6666");
    grad.addColorStop(0.5, "#FFE6E6");
    grad.addColorStop(1, "#E60000");
    ctxNbi.strokeStyle = grad;
    ctxNbi.lineWidth = radiusNbi*0.1;
    ctxNbi.stroke();
    
    //clock centre
    ctxNbi.beginPath();
    ctxNbi.arc (0,0,radiusNbi*0.1,0,2*Math.PI);
    ctxNbi.fillStyle = "pink";
    ctxNbi.fill();
}
// function for drawing numbers
function drawNumbers(ctxNbi, radiusNbi) {
    var ang;
    var num;
    //set font of drawing tool
    ctxNbi.font = radiusNbi*0.15 + "px arial";
    
    //set position of text
    ctxNbi.textBaseline="middle";
    ctxNbi.textAlign="center";
    
    //set print position of numbers
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctxNbi.rotate(ang);
        ctxNbi.translate(0, -radiusNbi*0.85);
        ctxNbi.rotate(-ang);
        ctxNbi.fillText(num.toString(), 0, 0);
        ctxNbi.rotate(ang);
        ctxNbi.translate(0, radiusNbi*0.85);
        ctxNbi.rotate(-ang);
    }
}

//Time function
function drawTime (ctxNbi, radiusNbi) {
    //Using Date to get hrs, min, seconds
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //calc angle of hour hand and give it length and width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctxNbi, hour, radiusNbi*0.5, radiusNbi*0.07);
    
    //minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctxNbi, minute, radiusNbi*0.8, radiusNbi*0.07);
    
    //second hand
    second=(second*Math.PI/30);
    drawHand(ctxNbi, second, radiusNbi*0.9, radiusNbi*0.02);
    
}

// function for drawing clock hands
function drawHand(ctxNbi, pos, length, width) {
    ctxNbi.beginPath();
    ctxNbi.lineWidth = width;
    ctxNbi.lineCap = "round";
    ctxNbi.moveTo(0,0);
    ctxNbi.rotate(pos);
    ctxNbi.lineTo(0, -length);
    ctxNbi.stroke();
    ctxNbi.rotate(-pos);
}


//start clock calling draw clock at intervals
setInterval(drawClock, 1000);



