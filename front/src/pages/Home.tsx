import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { userAtom } from "@atom/user";
import { Container, Wrapper as HomeWrapper } from "@style/Layout";
import { Link } from "react-router-dom";

const HOMETEXT = [
  {
    title1: `당신, 지구`,
    title2: `모두 소중합니다`,
    button1: `풀빛마실이란 ?`,
    button2: `풀빛마실 시작하기 >`,
  },
  {
    title1: `지구를 지키는`,
    title2: `풀빛 발걸음`,
    button1: `풀빛마실이란 ?`,
    button2: `풀빛마실 시작하기 >`,
  },
  {
    title1: `당신의 발걸음`,
    title2: `지구의 푸르름을 지켜요`,
    button1: `풀빛마실이란 ?`,
    button2: `풀빛마실 시작하기 >`,
  },
  {
    title1: `우리 강산의`,
    title2: `풀빛을 위한 마실을 떠나요`,
    button1: `풀빛마실이란 ?`,
    button2: `풀빛마실 시작하기 >`,
  },
];

//Variants
const HomeImgVariants = {
  initial: (next: boolean) => {
    // console.log("exit", next);
    return {
      x: next ? -window.innerWidth : window.innerWidth,

      transition: {
        duration: 1,
      },
    };
  },
  exit: (next: boolean) => {
    // console.log("entry", next);
    return {
      x: next ? window.innerWidth : -window.innerWidth,
    };
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};
export default function Home() {
  const imgMaxIndex = 4;
  const textMaxIndex = 3;
  const [user, setUser] = useRecoilState(userAtom);
  const [click, setClick] = useState(false);
  const [imgIndex, setImgIndex] = useState(1);
  const [next, setNext] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };
  const handleClickArrowBtn = (next: boolean) => {
    if (leaving) return console.log(leaving);
    else {
      setNext(next);
      toggleLeaving();
      setImgIndex(prev => (next ? (prev === imgMaxIndex ? 1 : prev + 1) : prev === 1 ? imgMaxIndex : prev - 1));
      setTextIndex(prev => (next ? (prev === textMaxIndex ? 0 : prev + 1) : prev === 0 ? textMaxIndex : prev - 1));
      // console.log("Click! and nextState:", next);
    }
  };
  const handleClickPoint = (imgIndex: number, num: number) => {
    if (leaving) return console.log(leaving);
    toggleLeaving();
    setImgIndex(num);
    imgIndex < num ? setNext(true) : setNext(false);
  };
  // const timer = setInterval(() => {
  //   handleClickArrowBtn(true);
  // }, 7000);
  useEffect(() => {
    // console.log("turn");
    const timer = setInterval(() => {
      handleClickArrowBtn(true);
    }, 7000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [click]);
  return (
    <HomeWrapper>
      <AnimatePresence initial={false} custom={next} onExitComplete={toggleLeaving}>
        <HomeContainer
          key={imgIndex}
          custom={next}
          variants={HomeImgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
        >
          <Img src={`/assets/images/home/home_img0${imgIndex}.jpg`} alt="#" />
          <HomeText>
            <Title>{HOMETEXT[textIndex].title1}</Title>
            <Title>{HOMETEXT[textIndex].title2}</Title>
            <BtnBox>
              <Link to="About">
                <Button>{HOMETEXT[textIndex].button1}</Button>
              </Link>
              <Link to="GreenCrew">
                <Button>{HOMETEXT[textIndex].button2}</Button>
              </Link>
            </BtnBox>
          </HomeText>
        </HomeContainer>
        <ImgPointerBox>
          {[1, 2, 3, 4].map(num => (
            <ImgPointer
              key={num}
              className={imgIndex === num ? "active" : "normal"}
              onClick={() => handleClickPoint(imgIndex, num)}
            />
          ))}
        </ImgPointerBox>
      </AnimatePresence>
      <RightBtn
        onClick={() => {
          setClick(cur => !cur);
          handleClickArrowBtn(true);
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} size={"4x"} />
      </RightBtn>
      <LeftBtn onClick={() => handleClickArrowBtn(false)}>
        <FontAwesomeIcon icon={faChevronLeft} size={"4x"} />
      </LeftBtn>
    </HomeWrapper>
  );
}
const HomeContainer = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
const SlideContainer = styled.div`
  width: 100vw;
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  filter: brightness(0.7);
  object-fit: cover;
`;
const RightBtn = styled(motion.button)`
  background-color: transparent;
  position: absolute;
  width: 100px;
  top: 50%;
  right: 0;
  opacity: 0.5;
  &:hover {
    background-color: transparent;
    transform: scale(1.1);
    opacity: 0.7;
  }
`;
const LeftBtn = styled(RightBtn)`
  left: 0;
`;
const ImgPointerBox = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 10px;
  width: 80px;
  right: 0;
  left: 0;
  margin: auto;
`;
const ImgPointer = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 1s ease;
  &.normal {
    background-color: rgba(255, 255, 255, 0.7);
  }
  &.active {
    background-color: rgba(22, 158, 92, 0.7);
  }
  &:hover {
    background-color: rgb(106, 202, 156, 0.7);
  }
`;

const HomeText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 10%;
  color: white;
`;
const BtnBox = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0;
`;
const Button = styled.button`
  width: 200px;
  height: 60px;
  margin-right: 12px;
  background: #169e5c;
  border-radius: 10px;
  font-weight: 400;
  font-size: 19px;
  line-height: 24px;
`;
const Title = styled.div`
  font-size: 52px;
  line-height: 83px;
  font-weight: 400;
`;
