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
            height
        } = this.state;

        ellipse(startX, startY, width, height)
    }
}
