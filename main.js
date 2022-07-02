var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var x = document.getElementById("camera");
    if(x.style.display==="none"){
        x.style.display="block";
    }
    else{
        x.style.display="none";
    }
    
function start(){
    document.getElementById("textbox").innerHTML="";
    recognition.start();
    
}

recognition.onresult=function(event){
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML=Content;
    if (Content=="take my selfie"){
        speak();   
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds"
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    setTimeout(function () {
        takeSnapshot();
        save();
    },5000);
    Webcam.attach(camera);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: "png",
    png_quality: 90
});

camera=document.getElementById("camera");

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='selfie_image' src='"+data_uri+"'>";
    })
}

function save(){
    link=document.getElementById("link");
    image=document.getElementById("selfie_image").src;
    link.href=image;
    link.click();
}