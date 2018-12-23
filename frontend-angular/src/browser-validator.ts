import * as bowser from 'bowser'; // for browser version check

enum BrowserType {
  IE = 'Internet Explorer',
  EDGE = 'Edge',
  CHROME = 'Chrome',
  FIREFOX = 'FireFox'
}

interface BrowserSpec {
  name: BrowserType;
  bowserName: string; // bowser library wanted name
  supportVersionNumber: number;
}

export class BrowserValidator {
  private static readonly supportBrowserFinder = [
    BrowserValidator.getBrowserIESpec(),
    BrowserValidator.getBrowserEdgeSpec(),
    BrowserValidator.getBrowserChromeSpec(),
    BrowserValidator.getBrowserFirefoxSpec()
  ];

  private static getBrowserIESpec(): BrowserSpec {
    return {
      name: BrowserType.IE,
      bowserName: 'msie',
      supportVersionNumber: 10
    };
  }

  private static getBrowserEdgeSpec(): BrowserSpec {
    return {
      name: BrowserType.EDGE,
      bowserName: 'msedge',
      supportVersionNumber: 12
    };
  }

  private static getBrowserChromeSpec(): BrowserSpec {
    return {
      name: BrowserType.CHROME,
      bowserName: 'chrome',
      supportVersionNumber: 53
    };
  }

  private static getBrowserFirefoxSpec(): BrowserSpec {
    return {
      name: BrowserType.FIREFOX,
      bowserName: 'firefox',
      supportVersionNumber: 45
    };
  }

  private static isUnSupportBrowser(): boolean {
    return !this.supportBrowserFinder
      .some(spec => bowser[spec.bowserName]);
  }

  private static isUnSupportBrowserVersion(): boolean {
    return !this.supportBrowserFinder
      .some(spec => bowser[spec.bowserName] && spec.supportVersionNumber <= bowser.version);
  }

  private static findCurrentBrowserName(): BrowserType {
    return this.supportBrowserFinder
      .filter(spec => bowser[spec.bowserName])
      .map(spec => spec.name)[0];
  }

  private static findCurrentBrowserSupportVersion(): number {
    const currentBrowserName = this.findCurrentBrowserName();
    return this.supportBrowserFinder
      .find(spec => spec.name === currentBrowserName)
      .supportVersionNumber;
  }

  public static check(): boolean {
    if (this.isUnSupportBrowser()) {
      const unSupportBrowserWarningMsg = `지원하지 않는 브라우저 입니다.\n지원 브라우저 : [${this.supportBrowserFinder.map(spec => spec.name).join(',')}]`;
      alert(unSupportBrowserWarningMsg);
      return false;
    }

    if (this.isUnSupportBrowserVersion()) {
      const unSupportVersionWarningMsg =
        `${this.findCurrentBrowserName()} 브라우저 ${bowser.version}버전은 지원하지 않습니다.\n${this.findCurrentBrowserSupportVersion()} 버전 이상 부터 지원합니다.`;
      alert(unSupportVersionWarningMsg);
      return false;
    }

    return true;
  }
}
