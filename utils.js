function randomNum(min, max = 1) {
    return min + Math.floor(Math.random() * Math.floor(max));
}

const pointOnCircle = (posX, posY, radius, angle) => {
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
}
