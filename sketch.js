//Pitch Detection
let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe'
let pitch;
let audioContext;
let mic;
let freq = 0;

//Visual
let Y_AXIS = 1;
let X_AXIS = 2;
let h, s, b, h1, s1, b1;
let stringTone;
let stringName;
     
function setup() {
  createCanvas(500, 550); 
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);

  frameRate(10);

  textFont('futura');
  colorMode(HSB); 
  noStroke();
  ellipseMode(RADIUS);


}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      freq = frequency;
    }

  }
  pitch.getPitch(gotPitch);
}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function draw() {
  background(0);
  stroke(330, 100, 100);
  strokeWeight(2)
  noFill();

  lineStart();

  noStroke();

  let diff = freq - stringTone;
  //let amt = map(abs(diff), -200, 200, 0, 1);

  rc = map(abs(diff), -10, 10, -60, 60);


//   rc = rc;
  fill(h + rc, s, b);
  ellipse(width / 2, height / 2 - 80, 150, 150);


  circleGradient(width / 2, height / 2 - 80);

//   textAlign(CENTER, CENTER);
//   fill(255);
  //textSize(16);
  //text(freq.toFixed(2), width/2, height-80);
//   textSize(36);
  //fill(h-5,100,80,0.4);
  //text(stringName, width/2, height/2);
//   textSize(18);
  console.log(freq);
  if (freq >= 140 && freq < 150) {
    console.log(`D3  `)
  } else if (freq >= 150 && freq < 160) {
    console.log(`D#3/Eb3  `)
  } else if (freq >= 160 && freq < 170) {
    console.log(`E3  `)
  } else if (freq >= 170 && freq < 180) {
    console.log(`F3  `)
  } else if (freq >= 180 && freq < 190) {
    console.log(`F#3/Gb3  `)
  } else if (freq >= 190 && freq < 200) {
    console.log(`G3  `)
  } else if (freq >= 200 && freq < 210) {
    console.log(`G#3/Ab3  `)
  } else if (freq >= 210 && freq < 230) {
    console.log(`A3  `)
  } else if (freq >= 230 && freq < 240) {
    console.log(`A#3/Bb3  `)
  } else if (freq >= 240 && freq < 255) {
    console.log(`B3  `)
  } else if (freq >= 255 && freq < 270) {
    console.log(`C4  `)
  } else if (freq >= 270 && freq < 285) {
    console.log(`C#4/Db4  `)
  } else if (freq >= 285 && freq < 300) {
    console.log(`D4  `)
  } else if (freq >= 300 && freq < 320) {
    console.log(`D#4/Eb4  `)
  } else if (freq >= 320 && freq < 340) {
    console.log(`E4  `)
  } else if (freq >= 340 && freq < 360) {
    console.log(`F4  `)
  } else if (freq >= 360 && freq < 380) {
    console.log(`F#4/Gb4  `)
  } else if (freq >= 380 && freq < 405) {
    console.log(`G4  `)
  } else if (freq >= 405 && freq < 425) {
    console.log(`G#4/Ab4  `)
  } else if (freq >= 425 && freq < 455) {
    console.log(`A4  `)
  } else if (freq >= 455 && freq < 475) {
    console.log(`A#4/Bb4  `)
  } else if (freq >= 475 && freq < 505) {
    console.log(`B4  `)
  } else if (freq >= 505 && freq < 540) {
    console.log(`C5  `)
  } else if (freq >= 540 && freq < 570) {
    console.log(`C#5/Db5  `)
  } else if (freq >= 570 && freq < 600) {
    console.log(`D5  `)
  }



  if (diff <= 2 && diff >= -2) {

    fill('white');
    textAlign(CENTER, CENTER);
    text('PERFECTO!', width / 2, height - 180);
  } else if (diff < -2) {

    fill(h, 95, 95);
    textAlign(CENTER, CENTER);
    text('TOO LOW!', width / 2, height - 180);
  } else if (diff > 2) {

    fill(h, 95, 95);
    textAlign(CENTER, CENTER);
    text('TOO HIGH!', width / 2, height - 180);
  }

}


function lineStart() {

  let lineStart = 400;
  let lineEnd = 500;
  let lineX = 225;
  let lineDist = 50;

  for (var i = lineX; i <= lineX + 75; i += lineDist) {
    line(i, lineStart, i, lineEnd);
    ellipse(i, lineStart, 2, 2);
    ellipse(i, lineEnd, 2, 2);
    if (i == lineX) {
      stroke(180, 100, 100);
    } else if (i == lineX + 50) {
      stroke(150, 100, 100);
    } else if (i == lineX + 100) {
      stroke(270, 100, 100);
    }
  }

  if (mouseIsPressed) {
    if (mouseY <= lineEnd && mouseY >= lineStart) {

      if (mouseX >= lineX - 5 && mouseX <= lineX + 5) {

        h = 330;
        s = 100;
        b = 100;
        stringTone = 196;
        stringName = 'G3';

      } else if (mouseX >= lineX + lineDist - 5 && mouseX <= lineX + lineDist + 5) {

        h = 180;
        s = 100;
        b = 100;
        stringTone = 146.83;
        stringName = 'D3';
      } 
    }
  }
}

function circleGradient(x, y) {
  let radius = 150;
  for (let r = 0; r < radius; ++r) {
    let ra1 = map(r, 0, 100, 0, 0.02);
    colorChange(ra1);
    ellipse(x, y, r, r);

  }
}

function colorChange(opacity) {
  fill(h, s, b, opacity);
}