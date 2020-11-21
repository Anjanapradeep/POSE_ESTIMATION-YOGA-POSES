let video;
let poseNet;
let pose;
let skeleton;
let timerValu=0;
let timerValue=60;
let brain;
let poseLabel = "Y";
let dingdong;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  dingdong = loadSound('bell.mp3');
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'modelqwer/model.json',
    metadata: 'modelqwer/model_meta.json',
    weights: 'modelqwer/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  //console.log(results[0].confidence);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  textSize(120);
  textAlign(CENTER, CENTER);
  if(poseLabel=='R')
    {
      ///////////////ANGLE CALCULATION//////////////
    let ex= pose.rightElbow.x;
    let ey= pose.rightElbow.y;
    let sx= pose.rightShoulder.x;
    let sy= pose.rightShoulder.y;
    let wx= pose.rightWrist.x;
    let wy= pose.rightWrist.y;
    
    a1=wx-ex;
    b1=wy-ey;
    a2=sx-ex;
    b2=sy-ey;
    ewes=(a1*a2)+(b1*b2);
    ew=sqrt((a1*a1)+(b1*b1));
    es=sqrt((a2*a2)+(b2*b2));
    ang= acos(ewes/(ew*es));
    angle= 59.2958*ang;
    //console.log("ang ==> ", ang);
    //console.log("angle ==> ", angle);
    
    if(angle>=177 && angle<=185)
      {
       
        timerValu=timerValu+1;
        console.log(timerValu);
        console.log("right pose");
        
        dingdong.play();
        //pop();
        push();
        fill(0,128,0);
        noStroke();
        textSize(40);
        textAlign(CENTER, CENTER);
        text('RIGHT POSE', 100, 100);
        pop();
        
        ///////
        fill(13,128,220);
        noStroke();
        textSize(60);
        
        if (timerValue >= 0) {
          text(timerValue + "", 450, 30);
          timerValue --;
         }
 
        if (timerValue == 0) {
        text('GOOD JOB', width / 4, height / 4 + 15);
         }
      }
    }
  
  else
      text(poseLabel, width / 2, height / 2);
}