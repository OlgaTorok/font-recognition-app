/**
  ML5 Example - Simple Image Classification - MIT Licence
  Transfer Learning Feature Extractor Classification with ml5
  https://ml5js.org/
*/

let mobilenet;
let classifier;

const image = document.getElementById('image');
const label = document.getElementById('label');
const fileInput = document.getElementById('fileUploader');
const result = document.getElementById('result');


function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
};


function modelReady(){
    console.log('Model Ready');
    label.innerHTML = 'Model Ready';
    classifier.load('model/model.json', customModelReady);
}


function customModelReady() {
    console.log('Custom Model Ready');
    label.innerHTML = 'Custom Model Ready';
    // classifier.classify(classifyImage);
}


function imageReady(){
    console.log('Image Ready');
    classifier.classify(classifyImage);
}


// Initialize the Image Classifier method
mobilenet = ml5.featureExtractor('Mobilenet', modelReady);
classifier = mobilenet.classification(imageReady);


// Handle the image from user
function handleImages() {
    const curFiles = fileInput.files;

    if (curFiles.length === 0) {
        image.src = 'images/FreeSans.png';
        setTimeout(classifyImage, 100);
        label.innerHTML = 'No image selected for upload';
    } else {
        image.src = window.URL.createObjectURL(curFiles[0]);
        label.innerHTML = '';
        setTimeout(classifyImage, 100);
    }
}


// Upload image
function clickUploader() {
    fileInput.click();
}


// Image classification and result printed to the user
function classifyImage() {
    classifier.classify(image, (error, results) => {
        if(error) {
            console.error(error);
        } else {
            let resultTxt = results;
            result.innerText = resultTxt;
        }
    });
}

