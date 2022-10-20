import { Wrapper } from "@style/Layout";
import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <Wrapper>
      <img src="/loading.gif" />
    </Wrapper>
  );
}
