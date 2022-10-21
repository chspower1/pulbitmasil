# 데이터 분석 웹 서비스 프로젝트

<img src="https://i.ibb.co/2vR8STP/Group-243.png" alt="drawing" width="300"/>   

## BE part
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white"> 
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=white">
<img src="https://img.shields.io/badge/.Env-ECD53F?style=for-the-badge&logo=.env&logoColor=black">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Handlebars-E05735?style=for-the-badge&logo=Handlebars.js&logoColor=white">
<img src="https://img.shields.io/badge/NodeMailer-30B980?style=for-the-badge&logo=nodemailer&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSONWebTokens&logoColor=white">
<img src="https://img.shields.io/badge/Multer-F46519?style=for-the-badge&logo=Multer&logoColor=white">

---

### 1. DB 설명

- #### MariaDB
  - 사용자와 상호작용을 위한 테이블 4개, 단순 저장 목적의 테이블 2개로 설계
  - **GREENCREW** : 생성된 모임을 저장하는 테이블, 하루에 3회 4개씩 구역별로 모임을 자동 생성
  - **USER** : 회원가입 시 사용자의 정보를 저장하는 테이블
  - **USERTOGREENCREW** : 사용자의 모임 참석 여부를 저장하는 테이블(USER와 GREENCREW의 m:n 관계를 표시)
  - **REVIEW** : 모임이 종료된 후 작성된 리뷰를 저장하는 테이블
  - **NAME** : 모임 자동 생성 시 이름을 무작위로 생성하기 위한 단어들이 담긴 테이블
  - **ROUTE** : 모임 생성 시 세부 경로들이 들어있는 테이블   
         <br>   
            
- #### 테이블 간의 관계(ERD)

  > <br>
  >
  > ```
  >      USER (1:m)
  >        ┣━━━━━━━━REVIEW━━━━┓
  >   (1:n)┃                  ┃
  >        ┃                  ┃
  > USERTOGREENCREW (m:n)     ┃ (m:1)
  >        ┃                  ┃
  >   (m:1)┃                  ┃
  >        ┃                  ┃
  >    GREENCREW━━━━━━━━━━━━━━┛
  >        ┃
  >   (1:1)┃
  >        ┃
  >      ROUTE
  > ```
  >
  > [자세한 구조](https://dbdiagram.io/d/634f9ad9470941019591d333)  
  >  <br>

- #### Event scheduler & Procedure

  - GREENCREW 테이블에서 모임 자동 생성 기능을 구현하기 위해 프로시저와 이벤트 스케줄러를 사용
  - crewId는 auto_increment로 처리
  - 시간은 다음 모임(6시, 12시, 18시)의 시간으로 생성
  - 모임 이름은 NAME 테이블에서 랜덤 추출하여 생성 후 auto_increment
  - 모임 참가 최대 인원 수는 3~5명 중 랜덤 생성
  - 한 타임 당 4개의 모임을 생성하는데 구역별로 하나씩 생성하였으며 구역 내에서는 무작위의 경로를 추출  
    <br>

- #### MongoDB
  - 데이터를 더 이용하기 편하도록 정리한 JSON 형태를 바로 저장하기 위해 사용
  - 서울시의 전체적인 산책로 데이터
  - 산책로의 세부 좌표

<br>

### 2. 구성

- #### db

  1. ##### MariaDB

     - mariaDB의 연결을 책임지는 부분으로 직접적으로 DB와 연결
     - connection pool을 관리하는 maria.js와 그 로그를 표시하는 logger.js로 구성

  2. ##### mongoDB
     - mongoDB의 연결을 책임지는 부분
     - DB에서 필요한 데이터를 가져오는 동작만을 수행하는 mongodb.js로 구성
       <br>

- #### middlewares

  1.  ##### error_middlewares.js
      - 네트워크 통신 과정에서 생기는 전반적인 오류들을 처리해주는 미들웨어
  2.  ##### login_required.js

      - 로그인 시 백엔드 측에서 만들어 프론트 측으로 보낸 토큰을 다시 받아 확인해주는 미들웨어
      - 토큰을 받아 원래 토큰으로 분리해주는 과정과 decode를 통해 id를 추출하는 과정으로 구성

  3.  ##### random_password.js
      - 후술할 비밀번호 초기화 기능에서 비밀번호로 사용할 무작위 문자열 생성을 위한 미들웨어
        <br>

- #### utils

  1. ##### email.js & index.handlebars

     - 후술할 비밀번호 초기화 기능에서 변경된 비밀번호를 가입한 사용자의 이메일로 전송해주기 위한 코드
     - 발송할 이메일의 형식에 대한 탬플릿

  1. ##### file_delete.js & file_upload.js

     - 리뷰 작성 시 이미지를 관리해주는 모듈로 각각 이미지 삭제, 업로드를 담당
       <br>

- #### routers

  1. ##### users.js

     - 회원가입, 로그인, 회원정보 수정, 임시 비밀번호 발급 등 사용자와 관련된 라우터
     - 회원가입 시 등록된 이메일로는 가입 불가
     - 비밀번호 수정 시 현재 비밀번호를 입력해야 수정 가능
     - 임시 비밀번호 발급 시 random_password 미들웨어로 DB를 수정하고 email.js로 사용자 이메일에 새로 발급된 비밀번호 발송

  1. ##### auth.js

     - 소셜로그인을 위한 라우터
     - 네이버, 카카오 로그인이 가능하며 새로 로그인 시 DB에 정보 저장

  1. ##### review.js

     - 리뷰 작성, 조회, 수정, 삭제를 위한 라우터
     - 리뷰 작성 시 file_upload 미들웨어를 통해 이미지 업로드
     - 리뷰 수정 시 이미지 변경
     - 리뷰 삭제 시 file_delete 미들웨어를 통해 이미지 삭제
       <br>

  1. ##### greencrew.js

     - 생성된 모임의 데이터를 받아오기 위한 라우터
     - GREENCREW, ROUTE, USERTOGREENCREW의 테이블을 JOIN으로 묶어 필요한 데이터를 송출

  1. ##### dodream.js
     - 전체 산책로 데이터를 받아오기 위한 라우터



### 3. 파일 트리
  
    📦back
    ┣ 📂src
    ┃ ┣ 📂db
    ┃ ┃ ┣ 📂mariaDB
    ┃ ┃ ┃ ┣ 📜logger.js
    ┃ ┃ ┃ ┗ 📜maria.js
    ┃ ┃ ┗ 📂mongoDB
    ┃ ┃ ┃ ┗ 📜mongodb.js
    ┃ ┣ 📂middlewares
    ┃ ┃ ┣ 📜error_middleware.js
    ┃ ┃ ┣ 📜login_required.js
    ┃ ┃ ┗ 📜random_password.js
    ┃ ┣ 📂routers
    ┃ ┃ ┣ 📜auth.js
    ┃ ┃ ┣ 📜dodream.js
    ┃ ┃ ┣ 📜greencrew.js
    ┃ ┃ ┣ 📜review.js
    ┃ ┃ ┣ 📜trash.js
    ┃ ┃ ┗ 📜users.js
    ┃ ┣ 📂utils
    ┃ ┃ ┣ 📜email.js
    ┃ ┃ ┣ 📜file_delete.js
    ┃ ┃ ┣ 📜file_upload.js
    ┃ ┃ ┗ 📜index.handlebars
    ┃ ┗ 📜app.js
    ┣ 📂uploads
    ┃ ┗ 📜default.jpg
    ┣ 📜.gitignore
    ┣ 📜babel.config.json
    ┣ 📜index.js
    ┣ 📜package-lock.json
    ┗ 📜package.json

### 4. package.json

    - axios
    - bcrypt
    - cookie-parser
    - cors
    - debug
    - express
    - fs
    - handlebars
    - http-errors
    - jsonwebtoken
    - mongodb
    - morgan
    - multer
    - mysql2
    - nodemailer
    - path
    - winston
    - dotenv
    - nodemon
    - babel
