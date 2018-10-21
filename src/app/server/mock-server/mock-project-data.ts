export module MockProject {
  export const detail : Array<object> = [
    {
      projectNumber: 0,
      title : 'FlatSwing',
      imagePath : '/assets/images/portfolio/flat-swing.png',
      summary : '해당 프로젝트는 자바 시스템 UI인 Swing을 보강하기 위한 라이브러리를 제작하였다.\n' +
        '자바 Swing의 단점 중 하나인 UI디자인을 플랫 디자인으로 제작하였으며, 스윙이 제공하기 어려운 API 부분을 스윙 로우 단계까지 분석하여 필요한 API를 직접 구현하였다. 공개 라이브러리를 생각한 공개 API의 디자인을 생각하여, 클래스와 메서드를 설계 제작했다.',
      description : '- 공개API를 제작,배포 유지보수 하기 위한 캡슐화\n' +
        '- 지속적인 리팩토링으로 코드 품질 개선을 높이며, 디자인패턴, 객체지향등을 적용하여 공부\n' +
        '- AWT Painting API를 써가며 프론트앤드 기술에 필수적인 Canvas Paint 이론을 공부',
      devSkills : ['Swing', 'AWT Painting', 'Canvas Animation']
    },
    {
      projectNumber: 1,
      title : '온라인 학습',
      imagePath : '',
      summary : '서울과학기술대학교 링크사업단과 같이 추진한 프로젝트이다. 첫번째 외주 프로젝트이다. 해당 프로젝트는 교육시설에서 학생들의 시험을 치루고 채점하고 결과를 알려주는 일련의 시스템을 웹 시스템으로 제작 하는 것이다. 웹 시스템을 통해, 교사는 시험문제를 만들 수 있으며 제작된 시험문제는 서버에 보관되며, 스마트 기기를 통해 해당 문제를 받을 수 있다. 시스템에 접속한 스마트 기기는 ID가 부여되어, 교사의 웹 시스템 화면에 테이블로 표시되며, 실시간으로 테이블이 새로 고침된다. 해당 테이블을 통해, 학생의 스마트기기와 컨텐츠를 컨트롤 할 수 있다. 예를들어, 전체 학생에게 특정 번호의 문제의 화면만 표시하게 할 수 있으며, 특정 학생의 스마트 기기의 전원을 원격으로 전원을 끌 수도 있다.',
      description : 'ASP.Net 프레임워크를 이용하여 프로젝트를 진행하였다. C#과 ASP.Net에서 만든 프론트 엔드 컴포넌트를 사용하였다. ASP.Net의 기본구조는 하나의 페이지에 3개의 파일이 존재한다. ( 프론트 담당 파일, 프론트 파일에 적용할 디자인 담당 파일, 프론트를 랜더링할때 필요한 데이터를 처리하는 서버 담당 파일 ) 이러한 구조를 통해, 프로젝트를 진행하였으며, 자체적인 ASP.Net 구조를 많이 사용하였다. 폴링 구조를 통해, 클라이언트로 들어오는 데이터를 처리하여 페이지를 랜더링 하였으며 아쉬운점은 통상적인 웹 프로젝트 개발을 해보지 않고, 자체적인 프레임워크 방식으로 웹 개발을 진행하여 이해도가 많이 떨어졌다는 점이다.',
      devSkills : ['Polling', 'ASP.Net Core', 'ASP.Net Component', 'IIS Tuning']
    },
    {
      projectNumber: 2,
      title : '과기DAY',
      imagePath : '/assets/images/portfolio/kakiday.png',
      devSkills : ['Http 통신', 'Html Table 파싱', 'JSON 파싱', '공공 정보 REST API 연동', 'Android Canvas Animation', 'Android Custom View', 'Android Permission', 'ContentProvider 연동', '비동기 프로그래밍(AsyncTask)', '멀티스레드 프로그래밍', 'MVP 아키텍쳐'],
      summary : '해당 프로젝트는 모교인 서울과학기술대학교의 정보를 앱으로 제공하는 서비스를 만들기 위해 진행하였다. 대학교가 제공하는 API가 없어서, 와이어샤크를 통해, 대학교 시스템이 작동하는 원리를 분석하였고, 그것을 토데로 기능들을 만들어 서비스를 제공하였다. 또한 학교 근처의 교통정보를 제공하기 위해 공공API인 버스, 지하철 REST API를 연동하였다. 또한 대학교 웹 정보를 파싱하여 재구성 한 후, 식단표, 연락처 정보서비스를 제공하였다.\n' +
        '깔끔한 디자인을 위해 구글 머터리얼 디자인을 준수했으며, 캔버스 애니메이션을 통해 머터리얼 자체 애니메이션을 직접 제작했다. 또한 캘린더 앱을 자체적으로 만들어 과기DAY앱에 통합하였다. ContentProvider를 통해, 자신의 일정이 그대로 연동되고, 더불어 학교 정보까지 캘린더에 표시하여 차별성을 두었다. 성능을 생각하여 멀티스레딩으로 병렬 일처리를 구성하였다.',
      description : '서비스를 제공하기 위해 학교 시스템을 분석할 필요가 있었다. 와이어샤크로 분석할 수 있다는걸 알게 되었고, 그것을 위해 전반적인 네트워크 통신을 공부하였다. ( 프로젝트 잠시 중단 후 1달~2달간 네트워크 공부 ) 공공 포털 서비스에 등록하여, 권한 승낙을 얻은 후 REST API를 통해 학교 근처 버스, 지하철 정보를 실시간으로 제공하였다. 안드로이드 하위 호환 때문에 머터리얼 디자인 라이브러리를 쓰지 않고, 커스텀 뷰로 전부 제작하였으며 (Material Calendar 참고) 머터리얼 디자인의 애니메이션을 구현하기 위해, 프론트앤드 기술인 캔버스 애니메이션, 오브젝트 애니메이션 등을 공부하여 습득 적용 하였다. 캘린더 기능은 다른 캘린더 앱의 성능과 비교해도 문제 없을 정도로 해당 서비스에 많은 노력을 하였다. 안드로이드가 제공하는 뷰를 사용하는 것이 아닌 캔버스에 직접 그림으로써, 성능향상을 추구하였으며, 멀티스레딩을 통해 빠른 동작과 수려한 애니메이션을 구현하였다. ContentProvider 연동을 통해, 안드로이드 캘린더 앱 규격을 맞추었다. \n' +
        '마지막으로 안드로이드 마시멜로우부터 요구하는 사용자 권한 체크 역시 따로 라이브러리(MommooPermission 참고)를 직접 제작하여 적용하였다.\n' +
        '제작하고 6개월 후에, MVP 아키텍쳐를 공부하여 해당앱에 적용 해보았다.'
    },
    {
      projectNumber: 3,
      title: 'Material Calendar',
      imagePath: '/assets/images/portfolio/picker-small.png',
      devSkills: ['Android Canvas Animation', 'Android Canvas View', 'Android Custom View', 'MultiThreading Programming'],
      summary: '해당 프로젝트는 머터리얼 디자인이 적용되는 롤리팝 OS 버전보다 낮은 하위 OS 버전에도 적용하기 위해 만든 머터리얼 디자인 캘린더이다. 해당 프로젝트의 특징은 기존 머터리얼 디자인이 제공하는 TimePicker, CalendarPicker, MonthPicker 의 디자인을 전부 준수하여 직접 제작하였으며, 추가적으로 AlarmPicker 까지 머터리얼 디자인으로 제작하였다. 기존의 제공하는 Picker 시리즈와는 차별적으로 손 스크롤로 선택하는 추가 모드를 만들어 전부 적용하였다. 이러한 차별점이 맘에 들었는지 외국인 개발자 몇몇 분이 감사하게도 써주신다.',
      description: '주로 안드로이드 프론트 엔드 기술공부가 많았다. 제공하는 안드로이드 기본 View가 없다보니, 캔버스로 직접 그린 위젯이 많았으며, 수려한 애니메이션을 위해 Object Animation으로 캔버스 애니메이션을 구현하였다. 또한 멀티 스레딩 프로그래밍으로 성능을 높였으며, Picker끼리 비슷한 역할들이 많아 객체지향적으로 설계연습을 많이 할 수 있었다. '
    },
    {
      projectNumber: 4,
      title: 'Scheduler',
      imagePath: '/assets/images/portfolio/scheduler-small.png',
      devSkills: ['Java AWT Painting', 'Java Canvas Animation', 'Java JNI'],
      summary: '해당 프로젝트는 나의 일정관리를 위해 필요한 프로그램을 만들기 위해 진행하게 되었다. 파일 입출력을 통한, 데이터 관리와 캔버스 뷰를 통한 위젯 제작, 직접 제작했었던 FlatSwing으로 깔끔한 플랫 디자인으로 구성하였다.',
      description: '해당 프로젝트는 객체지향 설계에 대해 신경을 많이 쓴 프로젝트다. 리팩토링을 통해, 객체지향 연습을 여러차례 시도하여 기능에 비해 제작 시간이 오래 걸렸다. 해당 프로젝트를 통해 클립보드의 원리를 이해하였으며, 복사, 이동, 취소, 삭제, 잘라내기, 붙여넣기 등을 직접 구현해보았다. 또한, 전체 리스트에서 원하는 문자열 찾기 기능을 만들기 위해 알고리즘을 고민하고 구현하였다. 자바프로그램은 기본적인 자바 javaw.exe가 대리 실행 해주는데 이때, 어플리케이션의 정보를 바꾸지 못하는 단점이 있다. 이를 해결하기위해 C++로 exe파일을 만들어서 직접 JVM을 실행시키고, 내 스케줄러 프로그램을 실행시키는 방법을 택하였다. 직접 JVM을 실행시키기 위해 Java JNI 기술을 사용하였다.'
    },
    {
      projectNumber: 5,
      title: 'SuitYourSelf',
      imagePath: '/assets/images/portfolio/suityourself.png',
      devSkills: ['Java Socket Programming', 'TCP/UDP Protocol', 'Android BlueTooth Programing','Java BlueTooth Programing', 'Java GUI Swing'],
      summary: '스마트폰으로 데스크탑을 조종할 수 있는 컨트롤러를 만들고 싶었다. 시중에 간단하게 PPT 정도만 컨트롤 할 수 있는 컨트롤러가 많았고, 그에 차별성으로 본인이 키 조합이나 윈도우 좌표값 클릭 조합으로 본인의 데스크탑에 필요한 컨트롤러를 만들었다. 또한, 통신 방법을 블루투스 방식과 와이파이 방식(동일 네트워크) 2가지를 제공하여, 사용자가 사용하기 편리한 통신 방식을 선택하게 하였다. SQLite DB를 통해, 사용자 컨트롤러의 정보를 기록하여, 여러개의 컨트롤러를 사용할 수 있게 하였다. 스마트폰을 통해 키보드 입력 뿐만아니라, 마우스 패드 제공, 안드로이드 센서를 이용하여 스마트폰으로 허공에 움직여 마우스를 이동시킬 수 있게 제작하였다. 스마트폰이 전달하는 정보를 받아 해석해야 하는 서버 프로그램은 자바로 만들었다.',
      description: '네트워크를 공부하면서 알게되었던 지식들을 프로그램 구현으로 직접 확인해봤던 프로젝트다. 대표적으로 번거롭게 사용자가 사설 서버 IP를 입력하지 않도록 서버 측에서 서버 IP를 알려줄 수 있도록 “브로드캐스트” 기법을 사용하여 스마트폰에게 알렸다. 안드로이드에서 빠르게 들어오는 데이터 값을 서버에서 어떻게 효율적으로 빠르게 처리하는지 생각해보게 되는 계기가 되었다. 또한, 항상 TCP 프로토콜을 사용하였는데, 이렇게 빠르게 값이 들어오는 특징은 UDP 프로토콜을 사용하여 값 손실이 있더라도, 빠르게 데이터를 처리하는 것이 오히려 사용자에게 매끄러운 성능을 경험하게 할 수 있다는 것을 배웠다. ## 아쉬운점// 안드로이드는 블루투스 API를 제공하는 반면, 자바는 블루투스 API가 존재하지 않았다. 그로인해, C++를 통한 JNI 기법으로 블루투스 통신을 해야하는 상황이였다. 직접 제작해보고 싶었지만, 시간이 많지 않아 결국 자바 블루투스 통신 라이브러리를 어렵게 구해 해당 통신을 구현하였다. 직접 구현하지 못했던 것이 아쉬움으로 남는다.'
    },
    {
      projectNumber: 6,
      title: 'MommooPermission',
      imagePath: '/assets/images/portfolio/permission.png',
      devSkills: ['Android Permission', 'Android Custom View', 'Android Intent Communication','Android Activity Tuning'],
      summary: '안드로이드 OS가 Marshmallow(6)가 됨으로써, 하나의 큰 변화가 있었는데, 그중 하나가 바로 권한처리 기술이다. 기존에는 간단하게 선언으로만 해결 됬었는데, 이부분을 코딩으로 동적으로 확인해야 하는 상황으로 바뀌었다. 권한처리를 간단하게 하기 위해 라이브러리를 만들었다. 특징으로는, 기존 권한처리는 안드로이드 Activity에 종속적으로 처리될 수밖에 없는 구조였지만, 해당 라이브러리는 그 단점을 투명 Activity를 만들어 띄움으로써 종속성을 낮추고, 독립적으로 권한처리를 할 수 있게 구성하였다. 또한, 권한처리에 필요한 다이얼로그도 직접 제작하여, 안드로이드 OS 상관없이 처리되게끔 하였다.',
      description: '안드로이드 시스템에 대해 많이 배우게 되었다. 액티비티를 화면 레이어로 쓰지 않고, 데이터 레이어로 쓰기에는 느렸지만 액티비티에 종속적인 권한을 해결하기 위해서는 어쩔 수 없었다. 대안책으로 액티비티 튜닝을 진행하여, 성능과 효율을 최적화 하였다. 해당 라이브러리는 공개 라이브러리라 공개 API 제작 측면(공개는 최소한으로, 필요한것만)에 신경을 많이 썼다.'
    },
    {
      projectNumber: 7,
      title: 'MyPortfolio',
      imagePath: '/assets/images/portfolio/myportfolio.png',
      devSkills: ['PHP Server', 'MariaDB', 'JQuery Core','JQuery AJAX', 'JQuery Dom Animation', '반응형 페이지'],
      summary: '제작하고 공부한 프로젝트를 어필하기 위해 제작한 웹 프로젝트이다. 해당 프로젝트는 통상적인 웹 프로젝트처럼 DB + 웹서버 + 프론트로 구성되었다. 백앤드는 PHP를 사용했으며, 프론트는 JavaScript(JQuery)를 사용했다. 데이터 처리는 PHP를 이용한 DB처리로 간단하게 진행하였고, JQuery의 AJAX를 통해 비동기적으로 데이터를 받아왔다. 프론트는 JQuery를 이용하여 Dom Animation으로 효과를 더하였다. 또한, 미디어 쿼리를 통해 반응형 페이지로 구성하였다.',
      description: '비동기 데이터 처리인 AJAX의 사용법과 원리를 알게 되었으며, JQuery의 지시자 명령어를 통해, 프론트를 구성하여 JQuery 연습을 할 수 있게 되었다. 미디어 쿼리를 구성하여 반응형 페이지를 만드는 방법을 배웠다. PHP는 서버 페이지 렌더링이 아닌 DB콜 용도로만 사용하였으며, 오히려 서버의 설정을 이것저것 구성하면서 개인 서버 리눅스 OS 공부를 많이 하게 되었다.'
    },
    {
      projectNumber: 8,
      title: 'JavaExample',
      imagePath: '/assets/images/portfolio/java-exam.png',
      devSkills: ['Maven MockProject', 'JSP Server', 'JSTL','MariaDB', 'JQuery Core/Animation', 'SCSS', '반응형 페이지'],
      summary: '자바 과외를 진행하면서, 학생들의 자바 공부를 위해 자바 퀴즈를 내곤 했다. 학생 수 가 많아지면서 자바 퀴즈 컨첸츠를 웹을 통해 서비스하면 좋을거 같다는 생각에 시작하게 되었다. 통상적인 DB + 웹서버 + 프론트 구조이다.  JSP로 백앤드를 구성하였으며, DB는 MariaDB이고, 프론트는 JavaScript(JQuery)이다. 페이지 이동시 form 태그를 통해 메시징 처리를 하였으며, JQuery를 이용하여 Dom Animation으로 효과를 더하였다.\n' +
        '미디어 쿼리를 통해 반응형 페이지로 구성하였다. CSS의 슈퍼셋인 SCSS를 도입하여, CSS의 약점인 공통코드 처리, 변수 처리 등을 해결하였다. JSTL 라이브러리를 통해 Model1의 서버랜더링 페이지로 구성하였다. ',
      description: 'Tomcat을 통해 JSP페이지를 띄우는 방법을 알게되었고, 클라이언트가 던져주는 메시지를 어떻게 받고 처리하는지의 메시징 처리 기술의 원리를 알게 되었다. 필요한 라이브러리를 일일이 다운받는 것이 아닌 Maven Project를 통해, 편리하게 의존성 관리를 할 수 있었으며 또한, 서버 페이지를 구성하면서 모르는 부분 공부를 틈틈히 진행하여 Http 통신의 지식이 더 풍부해졌다. Model1, Model2 방식을 공부하면서 스프링 프레임워크가 어떤 기반이며, 철학이 무엇인지 조금 알 수 있는 계기가 되었다. 또한 XML 선언 기반 데이터 처리를 처음 겪게 되었고 이 당시에는 이러한 방식이 크게 장점으로 다가 오지 않았다. JSTL을 통해, JSP의 데이터를 클라이언트 사이드에 전달 하는 방법에 대해 알게되었고, 원리를 공부했다. JSTL 덕분에 페이지 랜더링쪽 지식이 더 풍부해졌다. CSS를 구성할 때, 공통 값을 일일이 리터럴 값으로 채워 넣으니, 수정사항이 생기거나 추가적인 사항이 생길 때, 너무 불편했었다. 해결책을 찾기 위해 찾아본 결과 루비 엔진 기반의 SCSS을 알게되었고, 적용하여서 크게 만족했던 경험이 있다. 반응형 페이지를 위해 CSS 미디어 쿼리 뿐만 아니라 자바스크립트를 통해 미디어 쿼리를 동적으로 작성해보았다.'
    },
  ];

  export const simple: Array<object> = detail.map(info=> ({
    projectNumber: info['projectNumber'],
    title: info['title'],
    imagePath: info['imagePath'],
    devSkills: info['devSkills'],
    summary: info['summary']
  }))
}
