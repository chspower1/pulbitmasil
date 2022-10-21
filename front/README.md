# [풀빛마실] Front-end

<br>

## 사용기술(라이브러리)

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

### :gem: React

프로젝트에 조직성을 높이고 코드를 재사용하여 효율적으로 관리하고 다양한 라이브러리와 같이 사용하기 위하여 사용하였습니다.

### :sa: Typescript

타입을 직접 지정해 주어 컴파일 단계에서 오류를 포착할 수 있습니다.  
명시적인 정적 타입을 지정하여 의도대로 명확하게 기술하여 코드의 가독성을 높이고  
예측할 수 있게 하며 디버깅을 쉽게 하기 위하여 사용하였습니다.

### :question: React-Query

데이터 Fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등을 쉽게 만들어 주는 React 라이브러리입니다.  
캐싱 된 데이터로 인해서 API 콜을 줄여주며 서버에 대한 부담을 줄여줄수 있습니다.  
서버 데이터를 패칭해 온 데이터를 캐싱했어도, 사용자가 화면을 바라보고 있을 시점에  
가장 최신의 데이터를 바라볼 수 있도록 옵션을 줄 수 있습니다.

axios로 비동기 처리와 함께 사용하여, CRUD를 구현하였고  
데이터가 업데이트 되었을 때 최신 데이터가 사용자에게 보여질 수 있도록 사용하였습니다.

### :loop: Recoil

모든 비동기 문제를 해결하고 전역적으로 관리하기 위하여, 유저정보와 모달의 상태관리에 사용하였습니다.

### :bar_chart: Chart.js

간편하게 차트를 만들 수 있는 차트 라이브러리를 이용하여 유동인구 정보를 시각화 하였습니다.

### :date: Day.js

JavaScript Date 내장객체의 포맷 형태를 편리하게 만들기 위하여  
날짜 관련 라이브러리중 가장 가벼운 라이브러리를 사용하였습니다.

### :spades: Framer-Motion

리액트를 위한 웹 애니메이션, 제스처 오픈소스 라이브러리로  
navigation bar, 모달에 애니메이션을 주어 동적인 느낌을 주었습니다.

### :triangular_flag_on_post: React-Table

React로 테이블 UI를 간단하게 구현할 수 있도록 도와주는 라이브러리로  
산책로 데이터를 테이블화 하여 검색, 정렬기능을 구현하였습니다.

### :page_with_curl: full-page

소개페이지에서 스크롤 했을 경우 한 페이지가 보여지도록 구성하기위해 사용하였습니다.

### :bike: react-helmet

웹사이트 타이틀(탭 이름)을 추가하기 위해 사용하였습니다.

### :rocket: react-hook-form

로그인, 회원가입, 후기 작성, 이름변경, 비밀번호 변경 등  
form과 input을 사용하는 부분에서 state와 validation을  
편리하게 관리하기 위해서 사용하였습니다.

### :dizzy: fontawesome

다양한 아이콘을 무료로 사용하고 커스터마이징 하기 위하여 사용했습니다.

### :nail_care: styled-components

컴포넌트 별로 스타일을 관리하고, props를 이용하여 조건부 스타일을 적용하여 손쉽게 유지보수 할 수 있도록 사용하였습니다.

### :globe_with_meridians: axios

Node.js와 브라우저를 위한 Promise API를 활용하는 HTTP 통신 라이브러리로  
비동기로 HTTP 통신을 할 수 있으며 return을 promise 객체로 해주기 때문에 response 데이터를 다루기 쉽습니다.  
react-query과 함께 사용하여, 비동기 통신을 적용하기 위해 사용하였습니다.

### :love_letter: Craco

CRA로 만들어진 본 프로젝트에 절대 경로를 설정하기 위해서 craco를 사용하였고,  
tsconfig.json에 작성한 옵션을 빌드 과정에서 적용하여 절대경로를 지정해주었습니다.

<br>

## 폴더구조

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
 ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📂review
 ┃ ┣ 📂style -> 스타일 관련 폴더
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┗ 📂theme
 ┃ ┗ 📂type  -> 타입 관련 폴더
 ┗
```

<br>

## 기능 설명

<br>

### 주요기능

<br>

> 서울시 전체 산책로 데이터 지도와 표로 보기

- 지도에 마커를 지정하여 산책로 위치를 보여줌
- 지도에 마커를 클릭하면 산책로의 디테일한 정보를 볼 수 있음
- 산책로 데이터를 테이블로 구성
- 테이블에 검색, 정렬 필터 기능 추가
- 테이블에 산책로 이름을 클릭하면 지도에 표시

<br>

> 풀빛마실 참여하기/취소하기

- 지역으로 나누어 플로깅 모임을 위한 정보를 보여줌(6시간마다 업데이트)
- 지도에 경로를 추가하여 시작 지점 끝(쓰레기통 정보) 지점을 보여줌
- 참여,취소 기능

<br>
      
> 리뷰 작성/수정/삭제
- 전체적인 리뷰를 보여줌
- 후기 작성 및 수정 ( 참여한 모임만 가능 )   
  참여이력, 내용, 이미지로 후기를 작성 
- 후기 삭제

<br>

> 마이페이지

- 정보수정 (이름, 비밀번호)
- 홈 (현재진행중인 풀빛마실 리스트)
- 로그인된 유저가 적은 리뷰의 리스트를 보여줌
- 참여 진행중이거나 완료된 리스트를 보여줌

<br>

### 서브기능

> 유저 인증(회원가입,로그인,소셜 로그인)

- 기본 로그인
- 카카오 로그인
- 네이버 로그인
- 회원가입

<br>

> 애니메이션

- 홈 화면 이미지 슬라이드
- 모달
- 네비게이션 탑바 포인터
- 모바일 사이드바
- 로딩

<br>

> 반응형

- 홈
- 소개
- 산책로
- 모임
- 후기
- 마이페이지
- 전체적인 모달

<br>

> 원페이지스크롤

- 소개페이지 fullpage 적용

<br>

> 로딩처리

- suspense와 react query를 이용하여 전역적으로 로딩페이지 관리

<br>

> 실시간 시간 계산

- 모임 시작 시간과 현재 시간을 비교하여 남은시간을 보여줌

<br>
