class TextElement {
    constructor(text = 'TEST') {
        this.text = text;
    }

    render({ startX = 10, startY = 10, rotation = 0 }) {
        push()
        translate(startX, startY)
        rotate(rotation)
        text(this.text, 0, 0)
        pop()
    }
}

class EllipseElement extends Renderable {
    render(newState) {
        this.state = {...this.state, ...newState};

        const {
            startX = 0,
            startY = 0,
            width = 10,
            height = 10
        } = this.state;

        ellipse(startX, startY, width, height)
    }
}

class RectElement extends Renderable {
    render(newState) {
        this.state = {...this.state, ...newState};

        const {
            startX = 0,
            startY = 0,
            width = 10,
            height = 10
        } = this.state;

        rect(startX, startY, width, height)
    }
}

class PolygonElement extends Renderable {
    render(newState) {
        this.state = {...this.state, ...newState};

        const {
            startX = 0,
            startY = 0,
            radius = 20,
            sides = 6,
            rotation = 0
        } = this.state;

        push();
        translate(startX, startY);
        rotate(rotation)
        const rotAngle = 360 / sides;

        beginShape();
        for (let i = 0; i < sides; i++) {
            const thisVertex = pointOnCircle(0, 0, radius / 2, i * rotAngle)
            vertex(thisVertex.x, thisVertex.y)
        }
        endShape(CLOSE)

        pop()
    }
}

