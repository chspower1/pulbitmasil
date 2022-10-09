import React from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";
const anchors = ["firstPage", "secondPage", "thirdPage"];
export default function Content() {
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      sectionsColor={["#7fff00", "#00ffff", "#29ab87"]}
      onLeave={(origin, destination, direction) => {
        console.log("onLeave event", { origin, destination, direction });
      }}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state, fullpageApi);
        return (
          <ContentWrap>
            <Section01 id="1" className="section"></Section01>
            <Section02 id="2" className="section"></Section02>
            <Section03 id="3" className="section"></Section03>
          </ContentWrap>
        );
      }}
    />
  );
}
const ContentWrap = styled.div`
  width: 80vw;
  margin-left: 20vw;
  height: 100vw;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Section01 = styled.div`
  height: 100vh;

  font-size: 400px;
`;
const Section02 = styled(Section01)``;
const Section03 = styled(Section01)``;
