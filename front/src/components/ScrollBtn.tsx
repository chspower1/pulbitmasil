import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ScrollBtn() {
  const [isScroll, setIsScroll] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 제거
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = document.getElementById("app")?.scrollTop;
    if (window.scrollY >= 50) {
      console.log(isScroll);
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

  return <BtnContainer>{isScroll && <button onClick={scrollToTop}></button>}</BtnContainer>;
}

const BtnContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;
