import { Content } from "./Guide";

export const contents1: Content[] = [
  {
    num: 1,
    title: "풀빛마실 신청",
    description: `
     풀빛마실 모임에 들어가 열려있는 시간과 코스를 확인해요.
     원하는 코스를 선택하여 참여하기 버튼을 누르면 풀빛마실 참여 신청 완료!!`,
    type: "button",
    buttonValue: "풀빛마실 신청하러가기!",
  },
  {
    num: 2,
    title: "준비물 챙기기 ",
    description: `분리수거용 가방이나 봉지(종량제 봉투, 쓰고 버린 비닐봉투 등)와 쓰레기를 집을 수 있는 집게 또는 장갑을 챙겨요.`,
    type: "normal",
  },
];

export const contents2: Content[] = [
  {
    num: 3,
    title: "풀빛마실 가기",
    description:
      `
    편안한 복장으로 약속된 시간에 맞춰 늦지 않게 모임 장소로 
    고고~` + "(❁´◡`❁) ", //(❁´◡`❁) 이모티콘 백틱안됨
    type: "normal",
  },
  {
    num: 4,
    title: "스트레칭",
    description: `갑작스러운 운동은 다칠 수 있어요.
      플로깅 시작 전 다치지 않도록 
      스트레칭해요.`,
    type: "normal",
  },
  {
    num: 5,
    title: "풀빛마실 하기",
    description: `본격적으로 지구를 위해 나를 위해 우리 같이 풀빛마실 해요.`,
    type: "normal",
  },
];

export const contents3: Content[] = [
  {
    num: 6,
    title: "플로깅 뒤처리하기",
    description: `마지막엔 쓰레기 배출까지 깔끔하게! 
    풀빛마실 루트의 마지막에는 쓰레기통이 있어요. 올바르게 분리배출해 쓰레기를 버리면 끝!!`,
    type: "button",
    buttonValue: "올바른 분리배출 알아보기",
  },
  {
    num: 7,
    title: "후기 작성하기",
    description: `풀빛마실 후 소중한 여러분의 이야기를 남겨주세요!`,
    type: "button",
    buttonValue: "후기 작성하러 가기",
  },
];
