export class ClassUtils {
  public applyMixins(targetClass: any, baseClasses: any[]) {
    baseClasses.forEach(baseClass => {
      Object.getOwnPropertyNames(baseClass.prototype).forEach(propertyName => {
        targetClass.prototype[propertyName] = baseClass.prototype[propertyName];
      });
    });
  }
}
