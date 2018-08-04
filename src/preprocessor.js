/**
 * 본 자바스크립트 파일은, 앵귤러 프레임워크가 실행되기 전에,
 * 미리 실행되어야 할 작업을 진행한다.
 *
 * 작업해야 할 항목은 아래와 같다.
 *  1. 최소 지원 브라우저 체크
 *
 * 자바스크립트 코드는 최소 브라우저 버전에 상관없이 실행되어야 한다.
 * 따라서, 자바스크립트 API를 사용할때 주의 해야 한다. ( ex) ie8 not support object.keys api )
 */
(function() {

  var BrowserTypeNames = {
    IE : "Internet Explorer",
    EDGE : "Edge",
    CHROME : "Chrome",
    FIREFOX : "FireFox"
  };

  verifyBrowser();

  function verifyBrowser() {

    var browserVerifiers = [
      new BrowserVerifier(BrowserTypeNames.CHROME, 53),
      new BrowserVerifier(BrowserTypeNames.IE, 10),
      new BrowserVerifier(BrowserTypeNames.FIREFOX, 45),
      new BrowserVerifier(BrowserTypeNames.EDGE, 12)
    ];

    var targetBrowserVerifier;

    for (var index = 0; index < browserVerifiers.length ; index++) {
      if ( browserVerifiers[index].isTargetBrowser() ) {
        targetBrowserVerifier = browserVerifiers[index];
        break;
      }
    }

    if ( targetBrowserVerifier === undefined ) {
      alert("지원하지 않는 브라우저 입니다.");
      return;
    }

    if ( !targetBrowserVerifier.isValid() ) {
      alert("사용중인 "+targetBrowserVerifier.getTypeName()+" 버전 " + targetBrowserVerifier.getCurrentVersionNumber()+"은 지원하지 않습니다.\n" +
        targetBrowserVerifier.getTypeName()+" 버전 "+targetBrowserVerifier.getSupportVersionNumber()+"이상 부터 지원합니다.");
      return;
    }
  }

  // class
  /**
   * 본 클래스는 bowser.js가 먼저 로딩 되어야 한다.
   * angular-cli의 전역 스크립트를 기입할때, 본 파일 ( preprocessor.js ) 보다, bowser.js를 먼저 기입 해야 한다.
   *
   * bowser.js 라이브러리를 통해, 지원하는 브라우저의 유효성을 검사한다.
   */

  function BrowserVerifier(typeName, supportVersionNumber){

    this.getSupportVersionNumber = function() {
      return supportVersionNumber;
    };

    this.getTypeName = function() {
      return typeName;
    };

    this.isTargetBrowser = function() {
      switch(typeName) {
        case BrowserTypeNames.IE :
          return bowser.msie;
        case BrowserTypeNames.EDGE :
          return bowser.msedge;
        case BrowserTypeNames.CHROME :
          return bowser.chrome;
        case BrowserTypeNames.FIREFOX :
          return bowser.firefox;
      }

      return false;
    };

    this.getCurrentVersionNumber = function() {
      if (!this.isTargetBrowser()) {
        return -1;
      }

      return bowser.version;
    };

    this.isValid = function() {
      return this.isTargetBrowser() && supportVersionNumber <= bowser.version;
    }
  }

})();
