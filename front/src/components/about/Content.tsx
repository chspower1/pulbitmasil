import React, { useRef, useEffect } from "react";
import styled from "styled-components";
export default function Content() {
  const wrapRef = useRef<any>();
  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      // 스크롤 행동 구현
    };
    const wrapRefCurrent: any = wrapRef.current;
    wrapRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      wrapRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <ContentWrap ref={wrapRef}>
      <Section01 id="1" />
      <Section02 id="2" />
      <Section03 id="3" />
    </ContentWrap>
  );
}
const ContentWrap = styled.div`
  width: 80%;
  margin-left: 20%;
`;
const Section01 = styled.section`
  height: 100vh;
  background-color: blue;
`;
const Section02 = styled(Section01)`
  background-color: teal;
`;
const Section03 = styled(Section01)`
  background-color: tomato;
`;
