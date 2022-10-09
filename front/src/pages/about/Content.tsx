import React from "react";
import styled from "styled-components";

export default function Content() {
  return (
    <ContentWrap>
      <Section01 />
      <Section02 />
      <Section01 />
      <Section01 />
    </ContentWrap>
  );
}
const ContentWrap = styled.section`
  width: 80%;
`;
const Section01 = styled.section`
  height: 100vh;
  background-color: blue;
`;
const Section02 = styled(Section01)`
  background-color: teal;
`;
