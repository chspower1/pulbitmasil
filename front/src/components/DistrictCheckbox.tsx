import { useState } from "react";
import styled from "styled-components";
import { Box, Container } from "../style/Layout";
import json from "../test_data/new_trash_count.json";

interface TrashCount {
  [key: string]: {
    담배꽁초: number;
    일반담배꽁초: number;
    일반쓰레기: number;
    재활용쓰레기: number;
    항아리형: number;
  };
}

export default function DistrictCheckbox() {
  const [trash, setTrash] = useState<TrashCount>(json);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const labels = Object.keys(trash);
  // console.log(labels);

  const onCheckedElement = (checked: boolean, item: string) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== item));
    }
  };

  // console.log(checkedList)
  return (
    <CheckBox>
      <DistrictCheckBox>
        <Form>
          {labels.map((item, index) => {
            return (
              <div>
                <span>
                  <input
                    key={index}
                    type="checkbox"
                    value={item}
                    onChange={e => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes(item) ? true : false}
                  />
                  <label>{item}</label>
                </span>
              </div>
            );
          })}
        </Form>
      </DistrictCheckBox>
    </CheckBox>
  );
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const CheckBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size: 0.9em;
  height: 350px;
  margin: 1.5em;
  font-family: sans-serif;
`;
const DistrictCheckBox = styled(CheckBox)`
  height: 150px;
`;
const CheckContainer = styled(Container)`
  flex-wrap: wrap;
`;
const ItemBox = styled(Box)`
  margin: 0.2em 0.5em;
  padding: 0.5em 0.7em;
  background-color: rgba(25, 76, 29, 0.1);
`;
