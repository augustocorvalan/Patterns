const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

const ROWS = 10;

const PADDING_Y = 50;
const PADDING_X = 10;

const SPACING_X = randomNum(50, 100)
const SPACING_Y = randomNum(50, 100)
const ROTATION = randomNum(0, 360)


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    textSize(60)

    noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)
}

function draw() {
    const Element = new TextElement('DA')

    const TextPlanarSymmetry = new PlanarSymmetry({
        Element,
        maxX: CANVAS_WIDTH,
        maxY: CANVAS_HEIGHT,
        startX: PADDING_X,
        startY: PADDING_Y,
        rotation: ROTATION,
        spacingX: SPACING_X,
        spacingY: SPACING_Y
    })
    TextPlanarSymmetry.render()
}

