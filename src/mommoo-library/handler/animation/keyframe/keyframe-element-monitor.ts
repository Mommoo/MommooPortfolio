export class KeyframeElementMonitor {
  private elementsToManage = new Map<HTMLElement, any>();

  public monitorTo(targetElement: HTMLElement) {
    if ( this.elementsToManage.has(targetElement) ) {
      return;
    }
    const animateNameDestroyListener = ()=> KeyframeElementMonitor.resetKeyframeAnimation(targetElement);
    this.elementsToManage.set(targetElement, animateNameDestroyListener);
    targetElement.addEventListener('animationend', animateNameDestroyListener);
  }

  public clear() {
    this.elementsToManage.forEach((listener, element)=> {
      KeyframeElementMonitor.resetKeyframeAnimation(element);
      element.removeEventListener('animationend', listener);
    });
  }

  private static resetKeyframeAnimation(element: HTMLElement) {
    element.style.animation = null;
  }
}
