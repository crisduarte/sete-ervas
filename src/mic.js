class Mic {
    constructor(canvas, dev) {
      this.canvas = canvas;
      if (!dev) dev = new p5.AudioIn(this.showError);
      this.dev = dev;
      this.state = getAudioContext().state;
    }
    
    getLevel(smoothig) {
      return this.dev.getLevel(smoothig);
    }
  
    isAudioRunning() {
      if (getAudioContext().state !== "running") {
        if (this.canvas) this.canvas.mousePressed(() => { 
          this.startAudio(this);
        });
        this.showGestureMsg();
        return false;
      } else if (this.state !== "running") {
        this.state = "running";
        background(0);
      }
      return true;
    }
  
    startAudio(mic) {
      if (getAudioContext().state !== "running") {
        getAudioContext().resume();
        mic.dev.start();
      } else if (mic.canvas) {
        mic.canvas.mousePressed(false);
      }
    }
  
    showGestureMsg() {
      background(0);
      textSize(40);
      textAlign(CENTER);
      fill(62, 62, 66);
      text("click or touch to \nstart microphone", 
           width / 2,
           height / 2);
    }
  
    showError() {
      textSize(40);
      textAlign(CENTER);
      fill(62, 62, 66);
      text("microphone could not \nbe started", 
           width / 2, 
           height / 2);
    }
  }
  