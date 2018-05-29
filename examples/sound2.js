const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

const PADDING_Y = 50;
const PADDING_X = 50;

const AMP_THRESHOLD = 6.25;

const RADIUS = randomNum(10, 75)

// COLOR VARS
const darkThemeParameter = randomNum(0, 2);
const BG_COLOR = darkThemeParameter ? 0 : 255;
const FORE_COLOR = darkThemeParameter ? 255 : 0;

const SYMMETRY_PARAMETER = randomNum(0, 2)

// PLANAR SYMMETRY VARS
const SHOULD_APPLY_PLANAR_REFLECTION = randomNum(0, 2);

// ROTATION SYMMETRY VARS
const ORDER = randomNum(2, 12)

// REFLECTION SYMMETRY VARS
const REFLECTION_TRANSLATION_MAX = CANVAS_WIDTH / randomNum(2, 4)
const REFLECTION_SPACING = randomNum(0, 50)
const REFLECTION_ROTATION = randomNum(0, 180)

// these are the parameters we might re-randomize
const getSpacing = randomNum.bind(null, 50, 100);
const getRotation = randomNum.bind(null, 0, 360);
let spacingX = getSpacing()
let spacingY = getSpacing()
let rotation = getRotation()


let sound;
let amplitude;

function preload(){
    sound = loadSound('./mozart.m4a')
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    textSize(60)

    // noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)

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

    sound.play()
}

function draw() {
    background(BG_COLOR)


    let motif;

    // get element
    const element = new EllipseElement({
        width: RADIUS
    });


    switch(SYMMETRY_PARAMETER) {
        case 0:
            renderPlanarSymmetry(element)
            break;
        case 1:
            renderReflectionSymmetry(element)
            break;
    }




    // ROTATION SYMMETRY
    // const translationSymmetry = new TranslationSymmetry({
    //     Element: element,
    //     max: 200,
    //     spacing: 50
    // })
    // // translationSymmetry.render()
    // const rotationSymmetry = new RotationSymmetry({
    //     Element: translationSymmetry,
    //     elementHeight: 300,
    //     startX: CANVAS_WIDTH / 4,
    //     startY: CANVAS_HEIGHT / 2,
    //     order: ORDER,
    //     radius: 50 
    // })
    // rotationSymmetry.render()
}

function renderPlanarSymmetry(element) {
    // multiply volume 100 to make it easier to work with
    var ampLevel = amplitude.getLevel() * 100;
    var ampThreshold = SHOULD_APPLY_PLANAR_REFLECTION ? 5 : 7;

    // if the volume reaches a certain threshold we're going to re-randomize a parameter
    if (ampLevel > ampThreshold) {
        const randomParameter = randomNum(0, 3)

        switch(randomParameter) {
            case 0:
                spacingX = getSpacing()
                break;
            case 1:
                spacingY = getSpacing()
                break;
            case 2:
                rotation = getRotation()
                break;
        }
    }

    // do we want to add a little reflection to the element?
    if (SHOULD_APPLY_PLANAR_REFLECTION) {
        motif = new ReflectionSymmetry({
            Element: element,
            spacing: REFLECTION_SPACING,
            rotation: REFLECTION_ROTATION,
        });
    } else {
        motif = element;
    }

    // apply the planar symmetry
    const planarSymmetry = new PlanarSymmetry({
        Element: motif,
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

function renderReflectionSymmetry(element) {
    // multiply volume 100 to make it easier to work with
    var ampLevel = amplitude.getLevel() * 100;
    var ampThreshold = 6;

    // if the volume reaches a certain threshold we're going to re-randomize a parameter
    if (ampLevel > ampThreshold) {
        const randomParameter = randomNum(0, 3)

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

    // REFLECTION SYMMETRY
    // first we build the translation symmetry with the element
    const translationSymmetry = new TranslationSymmetry({
        Element: element,
        max: REFLECTION_TRANSLATION_MAX,
        spacing: spacingX,
        startX: PADDING_X,
        startY: PADDING_Y,
        rotation,
    })
    const reflectionSymmetry = new ReflectionSymmetry({
        Element: translationSymmetry,
        startX: CANVAS_WIDTH / 2,
        startY: PADDING_Y,
        spacing: REFLECTION_SPACING,
        rotation: REFLECTION_ROTATION,
    })
    const columnTranslation = new TranslationSymmetry({
        Element: reflectionSymmetry,
        max: CANVAS_HEIGHT,
        startX: CANVAS_WIDTH / 2,
        startY: 100,
        spacing: spacingX * 2,
        direction: 'y'
    })
    columnTranslation.render()
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
