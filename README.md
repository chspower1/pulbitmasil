# 풀빛마실

- 저희는 조깅을 하며 쓰레기를 줍는 '플로깅'을 확대하여 동네 커뮤니티 단위로 함께 산책을 하며 환경을 보호하는 서비스를 만들었습니다. 환경 문제에 대해 누구나 큰 마음을 먹을 수는 없기에 작은 실천을 모아가면 좋겠다는 마음에서 시작하였습니다.

## **프로젝트 구성 안내**

## 1. 프로젝트 소개

- 사용 데이터
  - 서울시 산책로 데이터
  - 서울시 노상 쓰레기통 데이터
  - 전국 유동인구 변화량  
    <br>
- 기술 스택
  - Jupyter, MariaDB, MongoDB  
    <br>
- 사용된 라이브러리
  - numpy, pandas  
    <br>
- 웹서비스에 대한 개요
  - 저희 웹서비스는 주민들과 산책을 하며 쓰레기를 줍는 실천을 통해 환경을 보호하자는 취지로 탄생했습니다. 이를 위해 산책로 데이터와 쓰레기통 데이터를 연결하여 산책 경로의 목적지를 서울시에서 설치한 쓰레기 통으로 설정하였고 정해진 시간마다 자동으로 생성되는 모집 페이지를 통해 지구를 지키는 작은 발걸음에 동참할 수 있습니다.  
    <br>

## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의**

> <br>
> 유동인구에 대한 데이터의 분석을 통해 저희는 사회적 거리두기 해제에 따라 유동인구가 예년과 비슷한 수준까지 회복되었다는 것을 알 수 있었습니다. 이에따라 길거리에 버려지는 쓰레기가 급증하고 있다는 정보 또한 기사를 통해 접하게 되었습니다. 따라서 최근 거리두기 해제에 따라 인구가 물리면서 거리에 버려지는 쓰레기로 인한 환경 문제가 심각해지고 있다는 결론에 도달하게 되었고 쓰레기를 무단투기하는 행위 자체는 차치하더라도 버려진 쓰레기만은 해결하는 쪽으로 웹서비스의 방향을 정했습니다. 좋은 방안이 있을까 고민하던 차에 플로깅이라는 아이디어가 떠올랐고 조깅이라는 것보다 더 대중적인 산책을 접목시키기로 논의하였습니다. 이를 웹서비스로 제공하기 위하여 산책로와 쓰레기통의 위치를 제공해주는 서비스가 필요하다고 생각했고 이 두 데이터를 가공하여 산책로가 끝나는 곳에 쓰레기통이 있는 경로를 좌표 형태의 데이터로 만들어 제공하기로 했습니다.

> <br>

<br>

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**

- 주요 기능
  1. 서울시 전체 산책로 데이터 지도와 표로 보기
  2. 풀빛마실에 참여하기/취소하기
  3. 리뷰 작성/수정/삭제
- 서브 기능

  1. 서울시 산책로 데이터 전체 보기
     - 카테고리에 의한 데이터 분류 태그
     - 유형, 이름, 지역, 거리, 소요시간, 코스레벨 중 아무 값이나 입력해서 산책로를 검색할 수 있는 기능
     - 원하는 산책로 클릭 시 해당 산책로로 지도 이동 기능
  2. 풀빛마실에 참여하기/취소하기
     - 네 구역으로 나누어진 모임을 분리해서 볼 수 있는 태그
     - 전체적인 정보 표시 및 남은 시간, 참여 인원 실시간 제공
     - 하루 세번 정해진 시간(6시, 12시, 18시)에 모임 자동 생성
     - "풀빛마실을 준비하는 법" 설명 페이지 제공
  3. 리뷰 작성/수정/삭제
     - 참가했던 모임을 선택하여 리뷰 작성 가능
     - 해당 모임이 시작되기 전에는 리뷰 작성을 하지 못하게 함\
     - 리뷰 작성 시 사진 추가 기능
     - 리뷰 클릭 시 모달 팝업
  4. 그 밖의 기능
     - 회원가입, 로그인, 소셜 로그인
     - 가입된 이메일로 임시비밀번호 발급(비밀번호 찾기), 회원정보 수정
     - 반응형
       <br>

- 프로젝트만의 차별점, 기대 효과

  1. 차별점
     - 2016년부터 시작된 플로깅이라는 활동은 흔하게 접할 수는 없었을지라도 개인적인 활동이나 기업 행사 등에서 종종 있어 왔습니다. 하지만 기사나 블로그에서 찾아 볼 수 있는 플로깅의 문제점은 바로 쓰레기의 처리입니다. 쓰레기를 마땅히 버릴 곳이 없어 집으로 들고 올 수 밖에 없다는 것입니다. 분명 선한 마음에서 활동을 하였는데 결과적으로는 본인에게 손해가 될 수 있다면 활동을 하지 않게되는 일도 늘어날 것입니다. 저희는 이 부분에 대하여 차별점을 두고 있습니다. 앞서 말한 부분을 가장 큰 문제점이라고 인지하고 있고 이에 따라 도착지를 쓰레기통으로 설정함으로써 문제를 해결했습니다. 또한 혼자하는 운동보다는 여럿이 하는 운동이 동기부여 측면에서 더 좋을 것이라 판단 함께 실천하는 마을 커뮤니티를 형성할 수도 있다는 점 또한 차별점이 되겠습니다.  
       <br>
  2. 기대효과

     - 기대 효과 또한 상술한 차별점과 연관이 있습니다. 좋은 활동에서 걸림돌이 되는 문제를 해결함으로써 진입장벽을 낮춰 주었고, 커뮤니티라는 지속할 동기 또한 형성하여 이 둘의 상승 효과로 건강과 환경 모두 챙길 수 있을 것으로 기대됩니다

## 4. 프로젝트 구성도

- [웹서비스 디자인](https://www.figma.com/file/P90IfQYS5NauIDQif13PGO/%ED%92%80%EB%B9%9B%EB%A7%88%EC%8B%A4?node-id=0%3A1)
- [프로젝트의 DB구조](https://dbdiagram.io/d/634f9ad9470941019591d333)

## 5. 프로젝트 팀원 역할 분담

| 이름     | 담당 업무                   |
| -------- | --------------------------- |
| 조호성   | 팀장/데이터 분석/프론트엔드 |
| 남궁혜진 | FE장/프론트엔드/데이터 분석 |
| 임정은   | 서기/프론트엔드/데이터 분석 |
| 송태원   | BE장/백엔드/데이터 분석     |
| 지은혜   | 응원단장/백엔드/데이터 분석 |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

3.  백엔드 & 데이터 담당

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정

## 6. 버전

- 프로젝트의 버전 기입

## 7. FAQ

- 자주 받는 질문 정리
