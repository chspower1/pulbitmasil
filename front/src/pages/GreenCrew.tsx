import styled from "styled-components";
import TrashBarChart from "@components/chart/TrashBarChart";
import { Wrapper as GreenCrewWrapper } from "@style/Container";
import { useQuery } from "@tanstack/react-query";
import { getDodream } from "@api/api";
import { IDodream } from "@type/dodream";
import GreenCrewMap from "@components/greenCrew/GreenCrewMap";

export default function GreenCrew() {
  const { isLoading, data: dodream } = useQuery<IDodream[] | undefined>(["dodream", "1"], getDodream);
  return (
    <>
      {isLoading || (
        <GreenCrewWrapper>
          <GreenCrewMap dodream={dodream!} />
        </GreenCrewWrapper>
      )}
    </>
  );
}
