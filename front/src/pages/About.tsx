import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";

import Benefit from "@components/about/Benefit";
import Unique from "@components/about/Unique";
import Problem from "@components/about/Problem";

import Pulbitmasil from "@components/about/Pulbitmasil";
const about = ["pulbitmasil", "problem", "benefit", "unique"];

export default function Content() {
  return (
    <ReactFullpage
      navigation
      navigationTooltips={about}
      scrollingSpeed={1000}
      onLeave={(origin, destination, direction) => {
      }}
      render={({ state, fullpageApi }) => {

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
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: url("/assets/images/about/about_bg_img01.jpg");
  background-size: cover;
  padding: 0;

  @media screen and (min-width: 1124px) {
    width: 100%;
  }
`;
const BenefitBox = styled(Box)`
  background-image: url("/assets/images/about/benefit_bg.jpg");
  @media screen and (min-width: 1124px) {
    width: 100%;
  }
`;
const UniqueBox = styled(Box)`
  background-image: url("/assets/images/about/unique_bg.jpg");
  @media screen and (min-width: 1124px) {
    width: 100%;
  }
`;
const ProblemBox = styled(Box)`
  background-image: url("/assets/images/about/problem_bg.jpg");
  @media screen and (min-width: 1124px) {
    width: 100%;
  }
`;
