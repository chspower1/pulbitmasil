# 데이터 분석 웹 서비스 프로젝트

## BE part

<br>

1.  **DB 설명**

    - MariaDB

      > <br>
      > i. 사용자와 상호작용을 위한 테이블 4개, 단순 저장 목적의 테이블 2개로 설계
      >
      > - **GREENCREW** : 생성된 모임을 저장하는 테이블, 하루에 3회 4개씩 구역별로 모임을 자동 생성
      > - **USER** : 회원가입 시 사용자의 정보를 저장하는 테이블
      > - **USERTOGREENCREW** : 사용자의 모임 참석 여부를 저장하는 테이블(USER와 GREENCREW의 m:n 관계를 표시)
      > - **REVIEW** : 모임이 종료된 후 작성된 리뷰를 저장하는 테이블
      > - **NAME** : 모임 자동 생성 시 이름을 무작위로 생성하기 위한 단어들이 담긴 테이블
      > - **ROUTE** : 모임 생성 시 세부 경로들이 들어있는 테이블
      >   <br> > <br>

      > ii. 테이블 간의 관계
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
      > iii. Event scheduler & Procedure
      >
      > - GREENCREW 테이블에서 모임 자동 생성 기능을 구현하기 위해 프로시저와 이벤트 스케줄러를 사용
      > - crewId는 auto_increment로 처리
      > - 시간은 다음 모임(6시, 12시, 18시)의 시간으로 생성
      > - 모임 이름은 NAME 테이블에서 랜덤 추출하여 생성 후 auto_increment
      > - 모임 참가 최대 인원 수는 3~5명 중 랜덤 생성
      > - 한 타임 당 4개의 모임을 생성하는데 구역별로 하나씩 생성하였으며 구역 내에서는 무작위의 경로를 추출  
      >   <br>

    - MongoDB
      > <br>
      > i. 데이터를 더 이용하기 편하도록 정리한 JSON 형태를 바로 저장하기 위해 사용
      >
      > - 서울시의 전체적인 산책로 데이터
      > - 산책로의 세부 좌표  
      >   <br>

<br>

2.  **구성**
    <br>

    - **db**

      > <br>
      > i. mariaDB
      >
      > - mariaDB의 연결을 책임지는 부분으로 직접적으로 DB와의 연결을 만들어주고 connection pool을 관리하는 maria.js와 그 로그를 표시하는 logger.js로 구성  
      >   <br>

      > ii. mongoDB
      >
      > - mongoDB의 연결을 책임지는 부분으로 DB에서 필요한 데이터를 가져오는 동작만을 수행하는 mongodb.js로 구성  
      >   <br>

    <br>

    - **middlewares**

      > <br>
      > i. error_middlewares.js
      >
      > - 네트워크 통신 과정에서 생기는 전반적인 오류들을 처리해주는 미들웨어  
      >   <br>

      > ii. login_required.js
      >
      > - 로그인 시 백엔드 측에서 만들어 프론트 측으로 보낸 토큰을 다시 받아 확인해주는 미들웨어
      > - 토큰을 받아 원래 토큰으로 분리해주는 과정과 decode를 통해 id를 추출하는 과정으로 구성  
      >   <br>

      > iii. random_password.js
      >
      > - 후술할 비밀번호 초기화 기능에서 비밀번호로 사용할 무작위 문자열 생성을 위한 미들웨어  
      >   <br>

       <br>

    - **utils**

      > <br>
      > i. email.js & index.handlebars
      > - 후술할 비밀번호 초기화 기능에서 변경된 비밀번호를 가입한 사용자의 이메일로 전송해주기 위한 코드와 발송할 이메일의 형식에 대한 탬플릿   
      >   <br>

      > ii. file_delete.js & file_upload.js
      >
      > - 리뷰 작성 시 이미지를 관리해주는 모듈로 각각 이미지 삭제, 업로드를 담당  
      >   <br>

    - **routers**

      > <br>
      > i. users.js
      > - 회원가입, 로그인, 회원정보 수정, 임시 비밀번호 발급 등 사용자와 관련된 라우터
      > - 회원가입 시 등록된 이메일로는 가입 불가
      > - 비밀번호 수정 시 현재 비밀번호를 입력해야 수정 가능
      > - 임시 비밀번호 발급 시 random_password 미들웨어로 DB를 수정하고 email.js로 사용자 이메일에 새로 발급된 비밀번호 발송
      >   <br>

      > ii. auth.js
      >
      > - 소셜로그인을 위한 라우터
      > - 네이버, 카카오 로그인이 가능하며 새로 로그인 시 DB에 정보 저장
      >   <br>

      > iii. review.js
      >
      > - 리뷰 작성, 조회, 수정, 삭제를 위한 라우터
      > - 리뷰 작성 시 file_upload 미들웨어를 통해 이미지 업로드
      > - 리뷰 수정 시 이미지 변경
      > - 리뷰 삭제 시 file_delete 미들웨어를 통해 이미지 삭제  
      >   <br>

      > iv. greencrew.js
      >
      > - 생성된 모임의 데이터를 받아오기 위한 라우터
      > - GREENCREW, ROUTE, USERTOGREENCREW의 테이블을 JOIN으로 묶어 필요한 데이터를 송출
      >   <br>

      > v. dodream.js
      >
      > - 전체 산책로 데이터를 받아오기 위한 라우터  
      >   <br>

<br>

    ```
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
    ```

3.  **사용 패키지**
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
