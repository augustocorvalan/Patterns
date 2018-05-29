const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

const ELEMENT_HEIGHT = 44;

const PADDING_Y = 100;
const PADDING_X = 100;

const SPACING_X = randomNum(50, 100)
const SPACING_Y = randomNum(50, 100)
const ROTATION = randomNum(0, 360)

const RADIUS = randomNum(1, 60);
const ORDER = randomNum(2, 12); 

const CIRCLE_DIAMETER = RADIUS * 2 + ELEMENT_HEIGHT * 2 + SPACING_X * 2

let fft;
let amplitude;
let sound;
let element;
let RotSym;
let SoundPlanarSymmetry;

function preload(){
    sound = loadSound('http://localhost:8000/mozart.m4a')
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    textSize(60)

    // noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)

    sound.play()

    fft = new p5.FFT(0.8, 32);
    amplitude = new p5.Amplitude()


    // Element = new TextElement('C')
    // RotSym = new RotationSymmetry({
    //     Element,
    //     elementHeight: ELEMENT_HEIGHT,
    //     startX: PADDING_X,
    //     startY: PADDING_Y,
    //     order: ORDER,
    //     rotation: ROTATION,
    //     radius: RADIUS
    // })
    // SoundPlanarSymmetry = new PlanarSymmetry({
    //     Element: RotSym,
    //     maxX: CANVAS_WIDTH,
    //     maxY: CANVAS_HEIGHT,
    //     startX: 0,
    //     startY: 0,
    //     rotation: ROTATION,
    //     spacingX: SPACING_X,
    //     spacingY: SPACING_Y
    // })
}

function draw() {
    background(0)

    var spectrum = fft.analyze();
    var averageSpectrum = fft.linAverages(Math.floor(CANVAS_WIDTH / SPACING_X))
    // console.log(spectrum)
    var waveform = fft.waveform(16);
    // console.log(waveform)
    // volume
    // var ampLevel = amplitude.getLevel()
    // energies
    var bass = fft.getEnergy('bass');
    var lowMid = fft.getEnergy('lowMid');
    var mid = fft.getEnergy('mid');
    var highMid = fft.getEnergy('highMid');
    var treble = fft.getEnergy('treble');
    var energies = [bass, lowMid, mid, highMid, treble]


    fill(255);

    // for (var i = 0; i < waveform.length; i++) {
    // for (var i = 0; i < energies.length; i++) {
    for (var i = 0; i < spectrum.length; i++) {
        // const width = map(waveform[i], -1, 1, 10, 20);
        // const width = energies[i]
        const width = spectrum[i]
        const ellipse = new EllipseElement({
            width
        });
        const RowSymmetry = new TranslationSymmetry({
            Element: ellipse,
            max: CANVAS_WIDTH,
            spacing: SPACING_X,
            startX: SPACING_X,
            startY: SPACING_Y * i,
            rotation: ROTATION
        });
        RowSymmetry.render()
    }

    // const ColumnTransSymmetry = new TranslationSymmetry({
    //     Element: RowTransSymmetry,
    //     max: maxY,
    //     spacing: spacingY,
    //     startX,
    //     startY,
    //     direction: 'y'
    // })
    // ColumnTransSymmetry.render()

    // noStroke();
    // for (var i = 0; i < spectrum.length/20; i++) {
    //     fill(spectrum[i], spectrum[i]/10, 0);
    //     var x = map(i, 0, spectrum.length/20, 0, width);
    //     var h = map(spectrum[i], 0, 255, 0, height);
    //     rect(x, height, spectrum.length/20, -h);
    // }

    // RotSym.render({
    //     rotation: mapToRotation(treble, 0, 255),
    //     order: map(treble, 0, 255, 3, 12, true),
    //     radius: treble
    // })

    // rotation += mapToRotation(level, 0, 1)

    // SoundPlanarSymmetry.render({
    //     rotation
    // })


    // noFill();
    // beginShape();
    // stroke(255,0,0); // waveform is red
    // strokeWeight(1);
    // for (var i = 0; i< waveform.length; i++){
    //     var x = map(i, 0, waveform.length, 0, width);
    //     var y = map( waveform[i], -1, 1, 0, height);
    //     vertex(x,y);
    // }
    // endShape();
}

function mapToRotation(value, minValue, maxValue) {
    return map(value, minValue, maxValue, 0, 360, true);
}

function mousePressed() {
    togglePlay(sound)
}

function togglePlay(sound) {
    if ( sound.isPlaying() ) {
        sound.stop();
    } else {
        sound.play();
    }
}



// function setup(){
//     var cnv = createCanvas(100,100);
//     fft = new p5.FFT(0.8, 16);
//     sound.play();
// }

// function draw(){
//     background(0);

//     var spectrum = fft.analyze();
//     noStroke();
//     fill(0,255,0); // spectrum is green
//     for (var i = 0; i< spectrum.length; i++){
//         var x = map(i, 0, spectrum.length, 0, width);
//         var h = -height + map(spectrum[i], 0, 255, height, 0);
//         rect(x, height, width / spectrum.length, h )
//     }

//     text('click to play/pause', 4, 10);
// }

// // fade sound if mouse is over canvas
// function togglePlay() {
//     if (sound.isPlaying()) {
//         sound.pause();
//     } else {
//         sound.loop();
//     }
// }
