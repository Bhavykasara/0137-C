object=[];
statusa="";

function preload() {
    vedio=createVideo("video.mp4");
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    vedio.hide();
}

function start() {
    objectDetector=ml5.objectDetector("cocossd",modalLoaded);
    document.getElementById("stat").innerHTML="Status : Detecting Objects";
}

function modalLoaded() {
    console.log("modal is loaded"); 
    statusa=true;
    vedio.loop();
    vedio.speed(1);
    vedio.volume(0);
}

function gotResult(error,result) {
    if (error) {
        console.log(error);
        console.log("od");
    }
    else {
        console.log(result);
        object=result;
    }
}

function draw() {
    image(vedio,0,0,380,380);
    if (statusa!="") {
        objectDetector.detect(vedio,gotResult);
        for (i=0;i<object.length;i++) {
            fill(255,0,0);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(255,0,0);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}