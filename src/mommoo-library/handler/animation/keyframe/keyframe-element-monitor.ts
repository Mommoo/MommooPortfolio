export class KeyframeElementMonitor {
  private elementsToManage = new Set<HTMLElement>();

  public monitorTo(targetElement: HTMLElement) {
    if ( this.elementsToManage.has(targetElement) ) {
      return;
    }
  }

  public clear() {
    this.elementsToManage.forEach((listener, element)=> KeyframeElementMonitor.resetKeyframeAnimation(element));
    this.elementsToManage.clear();
  }

  private static resetKeyframeAnimation(element: HTMLElement) {
    element.style.animation = null;
  }
}
