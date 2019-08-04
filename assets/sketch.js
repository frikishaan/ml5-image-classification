console.log('ml5 version:', ml5.version);

resultsP = document.getElementById('results');
const loader = document.querySelector('.loader');
const data = document.getElementById('data');
const prob = document.getElementById('prob');

/*
const loaded = () => {
    console.log('Model Loaded Successfully !!');

};
const classifier = ml5.imageClassifier('MobileNet', loaded);

document.getElementById('predict').addEventListener('click', () => {
    classifier.classify(document.getElementById('image'), showResults);
});

function showResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
}
*/

var video = document.getElementById('video');

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();

        navigator.permissions.query({ name: 'camera' }).then(function (result) {
            console.log(result.state);

            if (result.state == 'granted') {
                // showLocalNewsWithGeolocation();
                console.log('Granted');

            } else if (result.state == 'prompt') {
                // showButtonToEnableLocalNews();
                console.log('Prompted');
            } else {
                console.log('Error..!!');
            }
            // Don't do anything if the permission was denied.
        });
    });
}
// else {
//     resultsP.innerHTML = 'Please allow app to access your camera.';
// }


// if (typeof mediaStreamTrack != "undefined") {
//     mediaStreamTrack.onended = function () {//for Chrome.
//         console.log('Your webcam is busy!');
//     }
// } else console.log('Permission denied!');


function setup() {
    noCanvas();
    // Initialize the Image Classifier method with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
    // resultsP.innerHTML = 'Loading model and video...';
}
function modelReady() {
    console.log('Model Ready...!!');
    loader.style.display = 'none';
    classifyVideo();
}
// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(gotResult);
}
// When we get a result
function gotResult(err, results) {
    // The results are in an array ordered by confidence.
    let li = `
        
    `;
    data.innerHTML = results[0].label;
    prob.innerHTML = nf(results[0].confidence * 100, 0, 2);
    resultsP.innerHTML = '';
    classifyVideo();
}
