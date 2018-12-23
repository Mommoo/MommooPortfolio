export class IEFixedImagePolyfill {
  private static readonly isIE = navigator.userAgent.match(/Trident\/7\./);
  private static readonly polyfillEventNames = ["mousewheel", "keydown"];
  private static readonly polyfillEvent = IEFixedImagePolyfill.createPolyfillEvent();
  private static isOn = false;

  private static createPolyfillEvent() {
    return (event: Event) => {
      switch (event.type) {
        case "mousewheel":
          this.polyfillMouseWheelEvent(event as MouseWheelEvent);
          break;

        case "keydown":
          this.polyfillKeyDownEvent(event as KeyboardEvent);
          break;
      }
    };
  }

  private static polyfillMouseWheelEvent(event: MouseWheelEvent) {
    // prevent ie default smooth scrolling
    event.preventDefault();
    // scroll without smoothing
    const wheelDelta = event.wheelDelta;
    const currentScrollPosition = window.pageYOffset;
    window.scrollTo(0, currentScrollPosition - wheelDelta);
  }

  private static polyfillKeyDownEvent(event: KeyboardEvent) {
    event.preventDefault();
    const currentScrollPosition = window.pageYOffset;
    const keyboardDelta = 120;

    switch ( event.keyCode ) {
      case 38:
        window.scrollTo(0, currentScrollPosition - keyboardDelta);
        break;
      case 40:
        window.scrollTo(0, currentScrollPosition + keyboardDelta);
        break;
    }
  }

  public static execute() {
    if ( IEFixedImagePolyfill.isIE && !this.isOn ) {
      this.isOn = true;
      this.polyfillEventNames
        .forEach(eventName => document.body.addEventListener(eventName, this.polyfillEvent));
    }
  }

  public static clear() {
    if ( IEFixedImagePolyfill.isIE && this.isOn ) {
      this.isOn = false;
      this.polyfillEventNames
        .forEach(eventName => document.body.removeEventListener(eventName, this.polyfillEvent));
    }
  }
}
