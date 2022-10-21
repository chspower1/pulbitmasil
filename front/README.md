# [풀빛마실] Front-end

<br>

## 사용기술(라이브러리)

---

<img src="https://img.shields.io/badge/React-61DAFB?
          style=flat
          &logo=React
          &logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?
        style=flat
        &logo=TypeScript
        &logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?
          style=flat		
          &logo=ReactQuery
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-212121?
          style=flat		
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Chart.js-FF6384?
          style=flat		
          &logo=Chart.js
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Day.js-757575?
          style=flat		
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Framer Motion-0055FF?
          style=flat		
          &logo=Framer
          &logoColor=white"/>
<img src="https://img.shields.io/badge/react table-FF4154?
          style=flat		
          &logo=React Table
          &logoColor=white"/>
<img src="https://img.shields.io/badge/fullpage.js -A493E7?
          style=flat		
          &logoColor=white"/>
<img src="https://img.shields.io/badge/react helmet-3C2179?
          style=flat		
          &logoColor=white"/>  
<img src="https://img.shields.io/badge/React Hook Form-EC5990?
          style=flat		
          &logo=React Hook Form
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Font Awesome-528DD7?
          style=flat		
          &logo=Font Awesome
          &logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?
          style=flat		
          &logo=styled-components
          &logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?
          style=flat		
          &logo=Axios
          &logoColor=white"/>
<img src="https://img.shields.io/badge/crarco-C61C3E?
          style=flat		
          &logoColor=white"/>

<br>

## ⚒기술 사용 이유

---

### React

전체 프로그램 설계를 깔끔하고 일관성 있게 정리할 수 있는 조직성(organization)이 강하고 미리 만들어 놓은 조각을 다시 사용할 수 있어 코드 재사용성(reusability)이 높습니다. 또한, 다른 프레임워크나 라이브러리와 혼용하여 사용할 수 있습니다.

프로젝트에 조직성을 높이고 코드를 재사용하여 효율적으로 관리하고 다양한 라이브러리와 같이 사용하기 위하여 사용하였습니다.

### Typescript

타입을 직접 지정해 주어 컴파일 단계에서 오류를 포착할 수 있습니다.

명시적인 정적 타입을 지정하여 의도대로 명확하게 기술하여 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 하기 위하여 사용하였습니다.

### React-Query

데이터 Fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등을 쉽게 만들어 주는 React 라이브러리입니다.
캐싱 된 데이터로 인해서 API 콜을 줄여주며 서버에 대한 부담을 줄여줄수 있습니다.
서버 데이터를 패칭해 온 데이터를 캐싱했어도, 사용자가 화면을 바라보고 있을 때 시점에 있어서 가장 최신의 데이터를 바라볼 수 있도록 옵션을 줄 수 있습니다.

### Recoil

전역 상태관리 라이브러리로 React 전용이며 React에 최적화되어 있습니다. 선언적 프로그래밍으로 비동기처리를 위임받아 처리하는 컴포넌트를 JSX로 선언함으로써 모든 비동기 문제를 해결하여 간편하게 사용할 수 있습니다.

전역상태를 get/set하여 상태관리를 간편하게 하기위하여 사용하였습니다.

### Chart.js

차트 오픈소스 라이브러리로 ㅣ필요한 모듈만 가져다 사용할 수 있고 간편하게 차트를 만들 수 있습니다.

### Day.js

JavaScript 날짜 관련 라이브러리중 가장 가벼운 라이브러리로 날짜 연산을 위해 사용하였습니다.

### Framer-Motion

리액트를 위한 웹 애니메이션, 제스처 오픈소스 라이브러리입니다. animate props에 값을 세팅하면 CSS transitions를 자동생성하는 방법으로 애니메이션을 만들어주고, drag나 hover 등의 제스쳐를 지원해주고, 단일 애니메이션 prop으로 하위 트리까지 이어지는 애니메이션을 적용할 수도 있습니다.

### React-Table

React로 테이블 UI를 간단하게 구현할 수 있도록 도와주는 라이브러리 입니다. 쉽게 검색, 정렬기능을 구현할 수 있고 유연성과 확장성이 뛰어나 유지보수가 편한다는 이점있어서 사용하였습니다.

### full-page

전체 화면 스크롤(페이지별)을 간단하게 사용할 수 있습니다.

### react-helmet

웹사이트 타이틀(탭 이름)을 동적으로 변경할 수 있게 해줍니다.

### react-hook-form ★

기존의 폼은 각각의 input박스마다 state, 에러 state를 모두 작성해야하며, input값이 많아진다면 validation도 설정해줘야 합니다.
react-hook-form은 기존의 폼에서 입력해야 하는 여러가지 번거로운 작업을 줄여줍니다.
input에 따라서 state 변수를 지정해주지 않아도 되며, 각각에 따라서 validation을 검사할 수 있고 에러핸들링을 처리하기 쉽습니다.

### fontawesome

다양한 아이콘을 무료로 사용할 수 있으며, 아이콘 자체가 글씨로 취급되기 때문에 html의 font 속성을 사용할 수 있습니다.
따라서 CSS 속성을 내가 원하는대로 커스터마이징할 수 있습니다.

### styled-components ★

CSS의 컴포넌트화로 스타일시트의 파일을 유지보수 할 필요가 없으며, CSS 모델을 문서 레벨이 아닌 컴포넌트 레벨로 추상화합니다.
또한, React에서는 props를 활용한 조건부 스타일링이 가능합니다.

### axios

Node.js와 브라우저를 위한 Promise API를 활용하는 HTTP 통신 라이브러리로, 비동기로 HTTP 통신을 할 수 있으며 return을 promise 객체로 해주기 때문에 response 데이터를 다루기 쉽습니다.

### Craco

TypeScript에서 import를 할 때 기본적으로 상대경로를 이용합니다.
폴더 구조가 복잡한 경우 상대경로로 import를 한다면 코드가 너무 길어지고 보기 어렵기 때문에 절대경로로 바꿔주는것이 좋습니다.

Craco는 CRA를 쉽게 설정하기 위해 만들어졌습니다.  
본 프로젝트는 CRA로 만들어졌음으로 절대 경로를 설정하기 위해서 craco를 사용하였고, tsconfig.json에 작성한 옵션을 빌드 과정에서 적용하여 절대경로를 지정해주었습니다.

## 폴더구조

페이지, 라우터 간에 폴더구조가 변경이 필요해보임,,,,

> > 해당부분은 수정 필요함!!!!!!!!!!!!

```
📦front
 ┣ 📂node_modules -> 사용되는 모듈 폴더
 ┣ 📂public ->index.html , 이미지, 아이콘
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┃ ┣ 📂greencrew
 ┃ ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┣ 📂guide
 ┃ ┃ ┃ ┣ 📂home
 ┃ ┗ ┗ ┗ 📂mypage
 ┣ 📂src -> 전체 소스 폴더
 ┃ ┣ 📂api -> api 요청 파일 폴더
 ┃ ┣ 📂atom -> Recoil 전역변수 관리 파일 폴더
 ┃ ┣ 📂components ->컴포넌트 폴더
 ┃ ┃ ┣ 📂about -> 소개
 ┃ ┃ ┣ 📂chart -> 그래프
 ┃ ┃ ┣ 📂dodream -> 산책로
 ┃ ┃ ┣ 📂greenCrew -> 풀빛마실 모임
 ┃ ┃ ┣ 📂guide -> 풀빛마실 가이드
 ┃ ┃ ┣ 📂layout -> 전역 스타일 컴포넌트
 ┃ ┃ ┣ 📂modal -> Modal 띄워주는 컴포넌트
 ┃ ┃ ┗ 📂review -> 후기
 ┃ ┣ 📂data -> 가이드 문서, 차트관련 데이터
 ┃ ┣ 📂pages -> 라우터 이동 페이지 폴더
 ┃ ┃ ┣ 📂Auth -> 인증 관련 (카카오,네이버)
 ┃ ┃ ┣ 📂mypage -> 마이페이지
 ┃ ┃ ┗ 📂review
 ┃ ┣ 📂style
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┗ 📂theme
 ┃ ┗ 📂type
 ┗
```

<br>

## 주요기능 설명

---

- 산책로
- 기능1
- 기능2
- 기능3

2. 모임

- 후기

## 서브기능 설명
