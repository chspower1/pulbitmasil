import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getInfo } from "@api/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

//Variants
const HomeImgVariants = {
  initial: (next: boolean) => {
    console.log("exit", next);
    return {
      x: next ? -1920 : 1920,

      transition: {
        duration: 1,
      },
    };
  },
  exit: (next: boolean) => {
    console.log("entry", next);
    return {
      x: next ? 1920 : -1920,
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

  const [imgIndex, setImgIndex] = useState(1);
  const [next, setNext] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => {
    setLeaving(prev => !prev);
  };
  const onClickArrowBtn = (next: boolean) => {
    if (leaving) return console.log(leaving);
    else {
      setNext(next);
      toggleLeaving();
      setImgIndex(prev => (next ? (prev === maxIndex ? 1 : prev + 1) : prev === 1 ? maxIndex : prev - 1));
      console.log("Click! and nextState:", next);
    }
  };
  const onClickImgPoint = (imgIndex: number, num: number) => {
    toggleLeaving();
    setImgIndex(num);
    imgIndex < num ? setNext(true) : setNext(false);
  };

  useEffect(() => {
    const URL = {
      name: "trash",
    };
    getInfo(URL);
  }, []);
  return (
    <HomeWrap>
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
              onClick={() => onClickImgPoint(imgIndex, num)}
            />
          ))}
        </ImgPointerBox>
        <RightBtn onClick={() => onClickArrowBtn(true)}>오른쪽</RightBtn>
        <LeftBtn onClick={() => onClickArrowBtn(false)}>왼쪽</LeftBtn>
      </AnimatePresence>
      <div></div>
    </HomeWrap>
  );
}
const HomeWrap = styled.div`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ::-webkit-scrollbar-track {
    display: none;
    width: 0;
  }
`;
const Img = styled(motion.img)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  overflow: hidden;
`;
const RightBtn = styled(motion.button)`
  position: absolute;
  width: 100px;
  top: 50%;
  right: 0px;
`;
const LeftBtn = styled(RightBtn)`
  left: 0px;
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
    background-color: rgba(255, 255, 255, 0.3);
  }
  &.active {
    background-color: rgba(255, 255, 255, 1);
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
