const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

const ELEMENT_HEIGHT = 44;

const PADDING_Y = 50;
const PADDING_X = 50;

const AMP_THRESHOLD = 7;

const RADIUS = randomNum(10, 75)

const FORE_COLOR = 255;

// these are the parameters we might re-randomize
const getSpacing = randomNum.bind(null, 50, 100);
const getRotation = randomNum.bind(null, 0, 360);
let spacingX = getSpacing()
let spacingY = getSpacing()
let rotation = getRotation()

let sound;
let amplitude;

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

    amplitude = new p5.Amplitude()

    // randomly set fill or stroke for shapes
    const randomFill = randomNum(0, 2)
    if (randomFill) {
        fill(FORE_COLOR);
    } else {
        noFill()
        stroke(FORE_COLOR)
        const randStrokeWeight = randomNum(1, 10)
        strokeWeight(randStrokeWeight)
    }
}

function draw() {
    background(0)

    // multiply volume 100 to make it easier to work with
    var ampLevel = amplitude.getLevel() * 100;

    // if the volume reaches a certain threshold we're going to re-randomize a parameter
    if (ampLevel > AMP_THRESHOLD) {
        const randomParameter = randomNum(0, 3)
        console.log('randomParameter', randomParameter)

        switch(randomParameter) {
            case 0:
                spacingX = getSpacing()
                break;
            case 1:
                spacingY = getSpacing()
                break;
            case 2:
                rotation = getSpacing()
                break;
        }
    }

    const ellipse = new EllipseElement({
        width: RADIUS
    });
    const planarSymmetry = new PlanarSymmetry({
        Element: ellipse,
        maxX: CANVAS_WIDTH,
        maxY: CANVAS_HEIGHT,
        startX: PADDING_X,
        startY: PADDING_Y,
        rotation,
        spacingX,
        spacingY
    })
    planarSymmetry.render()
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
