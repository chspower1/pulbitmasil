import React from "react";
import $ from "jquery";
import "fullpage.js";
import styled from "styled-components";
export default function Content() {
  $((): void => {
    ($("#fullpage") as any).fullpage({
      scrollOverflow: true,
    });
  });
  return (
    <ContentWrap id="fullpage">
      <Section01 className="section" />
      <Section02 className="section" />
      <Section03 className="section" />
    </ContentWrap>
  );
}
const ContentWrap = styled.div`
  height: 1000vh;
  width: 80%;
  margin-left: 20%;
`;
const Section01 = styled.div`
  height: 100vh;
  background-color: blue;
`;
const Section02 = styled(Section01)`
  background-color: teal;
`;
const Section03 = styled(Section01)`
  background-color: tomato;
`;
