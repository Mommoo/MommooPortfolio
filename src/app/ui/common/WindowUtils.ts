export class WindowUtils{
  private static readonly RESIZING_HOLD_TIME = 400;
  private static readonly eventMap = new Map<string, [string, any]>();

  public static addDoneResizingEvent(eventID : string, eventListener) : boolean {
    if ( this.eventMap.has(eventID) ) {
      console.error('done resizing event id is duplicated please using another event id');
      return false;
    }
    let resizeID;
    const resizeCallback = () => {
      clearTimeout(resizeID);
      resizeID = setTimeout(eventListener, WindowUtils.RESIZING_HOLD_TIME);
    };
    window.addEventListener('resize', resizeCallback);
    this.eventMap.set(eventID, ['resize', resizeCallback]);
  }

  public static removeEvent(eventID : string) {
    const [eventName, eventListener] = this.eventMap.get(eventID);
    window.removeEventListener(eventName, eventListener);
    this.eventMap.delete(eventID);
  }
}
