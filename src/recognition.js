
class Recognition {
    constructor(onresult, onerror) {
      let SpeechRecognition;
      this.state = "stopped";
      this.onerror = onerror;
      try {
        SpeechRecognition = webkitSpeechRecognition;
      } catch(e) {
        SpeechRecognition = null;
      }
      if (SpeechRecognition) {
        this.state = "running";
        this.dev = new SpeechRecognition();
        this.dev.continuous = true;
        this.dev.lang = lang;
        this.dev.interimResults = false;
        this.dev.maxAlternatives = 1;
        this.dev.onresult = onresult;
        this.dev.start();
      }
    }
    
    isRecognitionRunning() {
      if (this.state !== "running") {
        this.onerror();
        return false;
      }
      return true;
    }
  }
  