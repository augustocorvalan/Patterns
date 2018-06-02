class Renderable {
    constructor(initState) {
        this.state = initState;
    }


    setRenderState(newState) {
        this.state = {...this.state, ...newState};

        if (this.state.willRender instanceof Function) {
            this.state.willRender()
        }
    }
}
