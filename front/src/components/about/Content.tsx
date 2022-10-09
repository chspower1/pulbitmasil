import React from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";
const anchors = ["firstPage", "secondPage", "thirdPage"];
export default function Content() {
  return (
    <ContentWrap id="fullpage">
      <ReactFullpage
        anchors={anchors}
        navigation
        navigationTooltips={anchors}
        sectionsColor={["#7fff00", "#00ffff", "#29ab87"]}
        onLeave={(origin, destination, direction) => {
          console.log("onLeave event", { origin, destination, direction });
        }}
        render={({ state, fullpageApi }) => {
          // console.log("render prop change", state, fullpageApi);

          return (
            <div>
              <Section01 className="section">
                <h3>Section 1</h3>
              </Section01>
              <Section02 className="section">
                <h3>Section 2</h3>
              </Section02>
              <Section03 className="section">
                <h3>Section 3</h3>
              </Section03>
            </div>
          );
        }}
      />
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
