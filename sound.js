class sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.loaded = false;
        this.audio = new Audio('sound/' + this.fileName);
        this.audio.addEventListener('canplaythrough', () => {
            this.loaded = true;
        });
    }
    start(onEndCallback) {
        if (this.loaded) {
            this.audio.play();
            if (typeof onEndCallback == 'function') {
                this.audio.onended = onEndCallback;
            }
        }
    }
    stop() {
        this.audio.pause();
    }
    onEnd() {

    }
}