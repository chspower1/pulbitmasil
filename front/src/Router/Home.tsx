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
      setImgIndex(prev => (next ? (prev === 3 ? 1 : prev + 1) : prev === 1 ? 3 : prev - 1));
      console.log("Click! and nextState:", next);
    }
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
          src={`/assets/images/home_img0${imgIndex}.jpg`}
          alt="#"
        />

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
  height: 100vh;
  overflow-y: hidden;
`;
const Img = styled(motion.img)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
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
