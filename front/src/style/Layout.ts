import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 70px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.mainColor};
`;
