import React, { useState } from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";
import SideBar from "@components/about/SideBar";

import Benefit from "@components/about/Benefit";
import Unique from "@components/about/Unique";
import Problem from "@components/about/Problem";

import Pulbitmasil from "@components/about/Pulbitmasil";
const anchors = ["pulbitmasil", "problem", "benefit", "unique"];

export default function Content() {
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      // sectionsColor={["#f7f7f7", "#C7E1D6", "#d8d8d8"]}
      scrollingSpeed={1000}
      onLeave={(origin, destination, direction) => {
        // console.log("onLeave event", { origin, destination, direction });
      }}
      render={({ state, fullpageApi }) => {
        // console.log("render prop change", state, fullpageApi);
        return (
          <ReactFullpage.Wrapper>
            <Section className="section">
              <Box>
                <Pulbitmasil />
              </Box>
            </Section>
            <Section className="section">
              <ProblemBox>
                <Problem />
              </ProblemBox>
            </Section>
            <Section className="section">
              <BenefitBox>
                <Benefit />
              </BenefitBox>
            </Section>
            <Section className="section">
              <UniqueBox>
                <Unique />
              </UniqueBox>
            </Section>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
}
const Section = styled.div`
  height: 100vh;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: url("/assets/images/about/about_bg_img01.jpg");
  padding: 0;
`;
const Title = styled.h1`
  font-size: 36px;
  color: ${props => props.theme.mainColor};
`;
const Description = styled.p`
  font-size: 22px;
  color: ${props => props.theme.textColor};
`;
const MoveUpBtn = styled.div`
  top: 20px;
`;
const BenefitBox = styled(Box)`
  background-image: url("/assets/images/about/benefit_bg.jpg");
`;
const UniqueBox = styled(Box)`
  background-image: url("/assets/images/about/unique_bg.jpg");
`;
const ProblemBox = styled(Box)`
  background-image: url("/assets/images/about/problem_bg.jpg");
`;
