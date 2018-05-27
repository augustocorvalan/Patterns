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
