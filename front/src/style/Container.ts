import styled, {css} from "styled-components";
import { isPropertySignature } from "typescript";

export const Container = styled.div`
  background: #FFFFFF;
  border-radius: 15px;
  color: black;
  margin: 0.3em;
  padding: 0.3em;
  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: black;
  margin: 0.3em;
  padding: 0.3em;
  display: flex;
  justify-content: center;
`;