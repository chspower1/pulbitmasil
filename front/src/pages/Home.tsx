import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { userAtom } from "@atom/user";
import { Wrapper as HomeWrapper } from "@style/Layout";
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
  const maxIndex = 4;
  const [user, setUser] = useRecoilState(userAtom);
  const [click, setClick] = useState(false);
  const [imgIndex, setImgIndex] = useState(1);
  const [next, setNext] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };
  const handleClickArrowBtn = (next: boolean) => {
    if (leaving) return console.log(leaving);
    else {
      setNext(next);
      toggleLeaving();
      setImgIndex(prev => (next ? (prev === maxIndex ? 1 : prev + 1) : prev === 1 ? maxIndex : prev - 1));
      // console.log("Click! and nextState:", next);
    }
  };
  const handleClickImgPoint = (imgIndex: number, num: number) => {
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
        <Img
          key={imgIndex}
          custom={next}
          variants={HomeImgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
          src={`/assets/images/home/home_img0${imgIndex}.jpg`}
          alt="#"
        />
        <ImgPointerBox>
          {[1, 2, 3, 4].map(num => (
            <ImgPointer
              key={num}
              className={imgIndex === num ? "active" : "normal"}
              onClick={() => handleClickImgPoint(imgIndex, num)}
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

const Img = styled(motion.img)`
  position: absolute;
  width: 100vw;
  height: 100vh;
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
