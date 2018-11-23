import {ComponentFactoryResolver, Injector} from '@angular/core';
/** angular 프레임워크가 제공하는 의존성 주입에 위배 되는 행동이다.
 * 몇몇 서비스 객체는 컴포넌트 생성자로 받기엔, 복잡해지고 컴포넌트에 의존관련이 없는 객체들도 존재한다.
 * 그러한 객체들을 쉽게 받기 위해 작성되었다. */
export class AppToolkit{
  private static readonly INSTANCE = new AppToolkit();
  private injector : Injector;

  public static getInstance() : AppToolkit {
    return AppToolkit.INSTANCE;
  }

  public setInjector(injector : Injector){
    this.injector = injector;
  }

  public getComponentFactoryResolver() : ComponentFactoryResolver {
    return this.injector.get(ComponentFactoryResolver);
  }
}
