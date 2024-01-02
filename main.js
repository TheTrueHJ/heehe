song1 = "";
song2 = "";
rx =0
ry =0
lx =0
ly = 0
lscore = 0
rscore = 0
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(480,360);
    video = createCapture(VIDEO);
    video.hide();
    canvas.position('center');
    background("white");
    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,480,360);
    color("red");
    stroke(3);
    if(lscore >0.1){
        circle(lx,ly,5);
        song2.stop()
        if(song1.isPlaying() == "false"){
            song1.play();
            document.getElementById("h3").innerHTML = "Song 1 Playing"
        }
    }
}

function ModelLoaded(){
    print("loaded")
}

function gotPoses(results){
    if(results.length > 0){
        print(results);
        lscore = results[0].pose.keypoints[9].score;
        rscore = results[0].pose.keypoints[10].score;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
        lx = results[0].pose.leftWrist.x;
        lx = results[0].pose.leftWrist.y;
    }
}