import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollBtn() {
  const [isScroll, setIsScroll] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 제거
    };
  }, []);

  const btnVariation = {
    whileHover: {
      scale: 1.1,
    },
    whileTap: {
      scale: 0.9,
    },
  };

  const handleScroll = () => {
    const scrollTop = document.getElementById("app")?.scrollTop;
    if (window.scrollY >= 50) {
      // console.log(isScroll);
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  const scrollToTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BtnContainer>
      {isScroll && (
        <Btn whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop}>
          {/* <FontAwesomeIcon icon={faAngleDoubleUp} /> */}
        </Btn>
      )}
    </BtnContainer>
  );
}

const BtnContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;

const Btn = styled(motion.button)`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
