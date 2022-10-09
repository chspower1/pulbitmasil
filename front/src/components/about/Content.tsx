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
            <Section01 className="section">Section 1</Section01>
            <Section02 className="section">Section 2</Section02>
            <Section03 className="section">Section 3</Section03>
          </ContentWrap>
        );
      }}
    />
  );
}
const ContentWrap = styled.div`
  width: 80vw;
  margin-left: 20vw;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Section01 = styled.div`
  height: 100%;

  font-size: 400px;
`;
const Section02 = styled(Section01)``;
const Section03 = styled(Section01)``;
