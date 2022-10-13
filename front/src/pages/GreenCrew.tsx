import styled from "styled-components";
import { Wrapper as GreenCrewWrapper, Container, Box, Title } from "@style/Layout";
import { useQuery } from "@tanstack/react-query";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";
import { useState } from "react";
import { getGreenCrews } from "@api/greenCrew";
import { IGreenCrew } from "@type/greenCrew";
import { GreenCrew } from "@/components/greenCrew/GreenCrew";
type Area = ["강남", "강서", "강북", "강동"];
export default function GreenCrew() {
  const { isLoading } = useQuery<IGreenCrew>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      setGreenCrew(data);
    },
  });
  const [greenCrew, setGreenCrew] = useState<IGreenCrew>();
  const [area, setArea] = useState<Area>();
  if (isLoading) return <>로딩중</>;
  return (
    <GreenCrewWrapper>
      <Container>
        <Title>풀빛마실 참여하기</Title>
        <Container>
          <>
            <Title>GreenCrew?.title</Title>
          </>
          <GreenCrewMap />
        </Container>
      </Container>
    </GreenCrewWrapper>
  );
}
