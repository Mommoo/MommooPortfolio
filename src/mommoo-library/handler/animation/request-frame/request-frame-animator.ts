import {EasingFunctions, FrameAnimationStatusListener, FrameAnimationConfig, Vendors, Easing} from '../types';

export class RequestFrameAnimator {
  private static readonly defaultDuration = 600;
  private static readonly defaultEasing: Easing = 'easeInCubic';
  private requestAnimationFrame;
  private cancelAnimationFrame;
  private animationID: number;

  public constructor(private animationConfig: FrameAnimationConfig) {
    this.buildAnimationConfig();
    this.buildAnimationFrame();
  }

  private buildAnimationFrame() {
    this.requestAnimationFrame = window.requestAnimationFrame;
    this.cancelAnimationFrame = window.cancelAnimationFrame;

    for (let index = 0; index < Vendors.length && !this.requestAnimationFrame; index++) {
      this.requestAnimationFrame = window[Vendors[index] + 'RequestAnimationFrame'];
      this.cancelAnimationFrame = window[Vendors[index] + 'CancelAnimationFrame']
        || window[Vendors[index] + 'CancelRequestAnimationFrame'];
    }

    if (!this.requestAnimationFrame) {
      let lastTime = 0;
      this.requestAnimationFrame = callback => {
        const currentTime = new Date().getTime();
        /** almost 60 frames 16[1000/60] */
        const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
        lastTime = currentTime + timeToCall;
        return window.setTimeout(()=> callback(currentTime + timeToCall), timeToCall);
      }
    }

    if (!this.cancelAnimationFrame) {
      this.cancelAnimationFrame = (id:number)=> clearTimeout(id);
    }
  }

  private buildAnimationConfig() {
    const basicConfig: FrameAnimationConfig = {
      duration: RequestFrameAnimator.defaultDuration,
      easing: RequestFrameAnimator.defaultEasing
    };

    this.animationConfig = Object.assign(basicConfig, this.animationConfig);
  }

  public startAnimation(frameAnimationStatusListener: FrameAnimationStatusListener){
    let startTime;

    const requestAnimationCallback = timeStamp => {
      if ( !startTime ) startTime = timeStamp;
      const easing = EasingFunctions[this.animationConfig.easing];
      const elapsedTime: number = Math.min(this.animationConfig.duration, timeStamp - startTime);
      const progress: number = Math.min(1, elapsedTime / this.animationConfig.duration);
      const easingProgress: number = easing(progress);

      frameAnimationStatusListener({
        progress: parseFloat(easingProgress.toFixed(2)),
        elapsedTime: Math.floor(elapsedTime)
      });

      if ( progress !== 1 ) {
        this.animationID
          = this.requestAnimationFrame(timeStamp => requestAnimationCallback(timeStamp));
      }
    };

    this.animationID
      = this.requestAnimationFrame(timeStamp => requestAnimationCallback(timeStamp));
  }

  public cancelAnimation() {
    this.cancelAnimationFrame(this.animationID);
  }
}
