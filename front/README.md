# [풀빛마실] Front-end

## 사용기술(라이브러리)

<이미지로 바꾸기>  
 react, typescript, react-query, recoil, chartjs, dayjs, framer-motion, react-table, full-page, react-helmet, react-hook-form, fontawesome,
styled-components, axios, carco

## 기술 사용 이유

react

typescript ★

### react-query ★

데이터 Fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등을 쉽게 만들어 주는 React 라이브러리입니다.
캐싱 된 데이터로 인해서 API 콜을 줄여주며 서버에 대한 부담을 줄여줄수 있습니다.
서버 데이터를 패칭해 온 데이터를 캐싱했어도, 사용자가 화면을 바라보고 있을 때 시점에 있어서 가장 최신의 데이터를 바라볼 수 있도록 옵션을 줄 수 있습니다.

recoil ★

chartjs ★

dayjs

framer-motion ★

react-table ★

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

## 주요기능 설명

- 산책로

- 모임

- 후기

## 서브기능 설명
