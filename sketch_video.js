/**
 Example done from Daniel Shiffman's video
 Transfer Learning Feature Extractor Classification with ml5
 https://youtu.be/eeO-rWYFuG0

*/

let mobilenet;
let classifier;
let capture;
let videoDiv;
let resultDiv;

// Alert that model is ready
function modelReady() {
    console.log('Model is ready!!!');
    videoDiv.html('Model is Ready');
    classifier.load('model/model.json', customModelReady);
}

// Alert that custom model is ready
function customModelReady(){
    console.log('Custom Model is ready!!!');
    videoDiv.html('Custom model is Ready');
    
}

// Alert that video is ready
function videoReady() {
    console.log('Video is ready!!!');
    // label = 'Start Predicting';
    videoDiv.html('Start Predicting');
    classifier.classify(gotResults);
}




function setup() {
    
    capture = createCapture({
        audio: false,
        video: {
            facingMode: "environment"
        }, function() {
            console.log('Capture ready');
        }
    });
    capture.elt.setAttribute('playsinline', '');

    capture.hide();
    background(0);

    createCanvas(250, 250).parent('#root');
    videoDiv = createDiv('Loading...').parent('#root');
    videoDiv.addClass('label');
    videoDiv.style('font-weight', '800');

    resultDiv = createDiv().parent('#root');
    resultDiv.addClass('prediction');
    resultDiv.style('color', '#f08080');
    // resultDiv.style('font-weight', '800');

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(capture, videoReady);
}


function draw(){
    background(0);
    image(capture, 0, 0, 400, 320);
}


function gotResults(error, result) {
    if(error) {
        console.error(error);
    } else {
        videoDiv.html('MobileNet model prediction:');
        resultDiv.html(result);
        classifier.classify(gotResults);
    }
}