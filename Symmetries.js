class TranslationSymmetry extends Renderable {
    render(newState) {
        this.setRenderState(newState);
        
        const {
            Element,
            max,
            startX,
            startY,
            direction = 'x',
            spacing = 10,
            rotation,
        } = this.state;

        for (let translation = 0; translation <= max; translation += spacing) {
            const renderState = {
                startY: direction === 'y' ? startY + translation : startY,
                startX: direction === 'x' ? startX + translation : startX,
            }

            // hacky af
            if (rotation) {
                renderState.rotation = rotation;
            }

            Element.render(renderState);

        }
    }
}

class PlanarSymmetry extends Renderable {
    render(newState) {
        this.setRenderState(newState);
        const {
            Element,
            maxX,
            maxY,
            startX,
            startY,
            spacingX = 10,
            spacingY = 10,
            rotation
        } = this.state;

        const RowTransSymmetry = new TranslationSymmetry({
            Element,
            max: maxX,
            spacing: spacingX,
            startX,
            startY,
            rotation
        });
        const ColumnTransSymmetry = new TranslationSymmetry({
            Element: RowTransSymmetry,
            max: maxY,
            spacing: spacingY,
            startX,
            startY,
            direction: 'y'
        })
        ColumnTransSymmetry.render()
    } 
}

class ReflectionSymmetry extends Renderable {
    render(newState) {
        this.setRenderState(newState);
        const {
            Element,
            startX,
            startY,
            spacing = 10,
            rotation,
        } = this.state;

        Element.render({
            startX,
            startY,
            rotation
        });

        push()
        // why need to add this 10?
        translate(spacing + 10, 0)
        scale(-1, 1)
        Element.render({
            startX: -startX,
            startY,
            rotation
        })
        pop()
    }
}

class RotationSymmetry extends Renderable {
    render(newState) {
        this.setRenderState(newState);
        const {
            Element,
            startX,
            startY,
            order = 2,
            radius,
            elementHeight,
            rotation,
        } = this.state;

        const angle = 360 / order;
        push()
        translate(startX, startY)
        for (let i = 0; i < order; i++) {
            Element.render({
                startX: 0,
                startY: 0,
                rotation
            })
            translate(radius * 2, -elementHeight)
            rotate(angle)
        }
        pop()
    }
}


