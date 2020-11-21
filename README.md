# POSE_ESTIMATION-YOGA-POSES
Yoga Pose Estimation using POSENET vision model. The project is implemented using JAVASCRIPT ( P5.js and ml5.js ). 

MODEL USED

PoseNet is a computer vision and Machine learning model which helps in tracking full size human poses with 17 keypoints as the output.
Note: Keypoints are nothing but the basic human skeleton joints on body which on connecting resembles the human skeleton structure. 
The model was introduced by TesorFlow community and was trained using full size human pose(from eyes to ankles) and therefore the model works well when the user provides full size human input.

JAVASCRIPT LIBRARIES INVOLVED

P5.js - A javascript library that makes javascript code much easy by providing simpler functions as well as it integrates well with Ml5.js library.
Ml5.js- A javascript library that makes Machine Learning on Web with so much ease.

TRANSFER LEARNING

In this project, an attempt has been made to implement transfer learning with PoseNet model.Transfer learning is a method by which a trained Machine Learning model is retrained again for specific conditions. There is a trained PoseNet model which on implementing provides skeletal outputs referencing the keypoins in it.Now, in transfer Learning, the output from the PoseNet model(i.e the keypoints) is introduced as the inputs to another model and this model is trained for required poses that the user wants to estimate.   

ANGLE CALCULATION FOR ACCURACY

For making the pose estimation little more accurate, for a particular pose,lets say, for a half squat there are particular angle measurements that has to be taken care of (i.e. spinal cord being straight, angle between the hip,knee and ankle, angle between the shoulder,elbow and wrist) and by formulating a method to calculate these angles when a pose is being identifed(differs for each pose being trained),it becomes more efficient to estimate accurate poses. 

The json file(qwer.json) contains the training data for each of the poses trained.q,w,e,r(reference poses).In place of these poses, while training the model during transfer learning process, provide basic yoga poses as inputs to achieve yoga pose estimation. Model files are generated while training the data and it is used for the deployment of the model.
On identifying the correct pose, an audio alert is made to intimate the user that the desired pose has been achieved.

It is recommended to refer the following topics before downloading /cloning and then run it in local :)
1. p5.js(tutorial)-https://p5js.org/get-started/
2. Onine P5.js editor(provides live results and easy to work with)-https://editor.p5js.org/
3. Ml5.js(tutorial)-https://learn.ml5js.org/#/
4. Ml5.js for PoseNet-https://ml5js.org/reference/api-PoseNet/
5. PoseNet Model working-https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html
6. My Medium Artice on PoseNet-https://medium.com/happiestneurons/extensive-thoughts-on-machine-learning-in-javascript-878802398459

