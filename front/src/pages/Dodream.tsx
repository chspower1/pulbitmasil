import { getDodream } from "@api/api";
import DodreamMap from "@components/dodream/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import DodreamDetalModal from "@components/modal/DodreamDetail";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dodreamAtom } from "@atom/dodream";

export default function Dodream() {
  const [dodream, setDodream] = useRecoilState(dodreamAtom);
  const { isLoading } = useQuery(["dodream"], getDodream, {
    // dodream 데이터 변환
    onSuccess(data) {
      data.map((road: any) => {
        const nameArr = Object.keys(road.course_name) as string[];
        nameArr.map((name, mapIndex) => {
          // console.log(road.course_category_nm, index, name);
          const index = mapIndex;
          const course_category_nm = road.course_category_nm as string;
          const course_name = name as string;
          const distance = road.course_name[name][0].distance as string;
          const area_gu = road.course_name[name][0].area_gu as string;
          const lead_time = road.course_name[name][0].lead_time as string;
          const course_level = road.course_name[name][0].course_level as number;
          const content = road.course_name[name][0].content as string;
          const detail_course = road.course_name[name][0].detail_course as string;
          const reg_date = road.course_name[name][0].reg_date as number;
          const relate_subway = road.course_name[name][0].relate_subway as string;
          const traffic_info = road.course_name[name][0].traffic_info as string;
          const x = road.course_name[name][0].CPI[0].x as number;
          const y = road.course_name[name][0].CPI[0].y as number;
          const newRoad = {
            index,
            course_category_nm,
            course_name,
            area_gu,
            content,
            course_level,
            detail_course,
            distance,
            lead_time,
            reg_date,
            relate_subway,
            traffic_info,
            x,
            y,
          };
          // console.log(course_category_nm, course_name, distance, area_gu, lead_time, course_level, x, y);
          dodream === null
            ? setDodream([newRoad])
            : setDodream(prev => {
                return [...prev!, newRoad];
              });
        });
      });
    },
  });
  // console.log(isLoading);
  const courseCategory = ['한강지천길', '근교산자락길', '서울둘레길', '한양도성길', '생태문화길']

  // const handleClickCategory = (dodorem: any, e: any) => {
  //   const categoryBtnName = e.target.value;
  //   const courseCategoryNm = Object.values(dodorem.course_category_nm);
  //   const changedCategory = dodorem.filter(categoryBtnName === courseCategoryNm)
  //   console.log(changedCategory)
  // }

  return (
    <>
      {isLoading ? (
        "로딩중입니다."
      ) : (
        <WalkWrap>
          <MapContainer>
            <DodreamMap dodream={dodream!} />
          </MapContainer>
          <RightContainer>
            {/* <ChartBtn>차트로 보기</ChartBtn> */}
            <Title>서울시 산책로 현황</Title>
            <Input>
              <input placeholder="산책로를 검색해보세요!" />
              <button>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 0C4.71878 0 0 4.71878 0 10.5C0 16.2812 4.71878 21 10.5 21C13.122 21 15.5175 20.022 17.3613 18.4219L18 19.0605V21L27 30L30 27L21 18H19.0605L18.4219 17.3613C20.022 15.5175 21 13.122 21 10.5C21 4.71878 16.2812 0 10.5 0ZM10.5 3C14.6599 3 18 6.3401 18 10.5C18 14.6599 14.6599 18 10.5 18C6.3401 18 3 14.6599 3 10.5C3 6.3401 6.3401 3 10.5 3Z"
                    fill="#008037"
                  />
                </svg>
              </button>
            </Input>
            <BtnBox>
              {courseCategory.map((course, index) => (
                  <Button value={course}>{course}</Button>
              ))}
            </BtnBox>
            <CourseBox>
              <WalkTable dodream={dodream!} />
            </CourseBox>
          </RightContainer>
        </WalkWrap>
      )}
    </>
  );
}
const WalkWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -70px;
  overflow-y: hidden;
  background-image: url("/assets/images/walk.jpg");
`;

const ChartBtn = styled.button`
  position: absolute;
  width: 208px;
  height: 73px;
  left: 28px;
  top: 117px;
  background: #008037;
  border-radius: 5px;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 60px;
  line-height: 70px;
  padding-top: 100px;
  text-align: center;
  color: #008037;
`;

const Input = styled.label`
  position: relative;
  margin-top: 3.5em;

  input {
    padding: 0 15px;
    width: 360px;
    height: 50px;
    border-radius: 5px;
    font-size: 20px;
    ::placeholder {
      font-weight: 400;
      line-height: 24px;
      display: flex;
      align-items: flex-end;
      color: #b9c6cb;
    }
  }
  button {
    background-color: transparent;
    position: absolute;
    top: -10px;
    right: 5px;
    &:hover {
      background-color: transparent;
      transform: scale(1.1);
    }
  }
`;

const CourseBox = styled.div`
  width: 860px;
  height: 400px;
  background-color: #2a9c6b;
  border: none;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 60px;
  width: 55%;
  height: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
  height: 100vh;
  /* background-color: #008037; */
  /* margin: 30px; */
  margin-top: 70px;
`;

const BtnBox = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
`

const Button = styled.button`
  margin: 0 7px;
  padding: 0.5em;
  width: 140px;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
  border-radius: 5px;
  background-color: #88CAAE;
  
  :hover {
    font-weight: 900;
  }
`;