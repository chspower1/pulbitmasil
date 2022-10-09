import styled from "styled-components";
import { faker } from "@faker-js/faker";
faker.locale = "ko";
faker.seed(30);

export default function WalkTable( data: any ) {
  const columns = ["District", "Name", "Catrgory", "Level", "Distance", "Time"];

  type Columns = {
    District: string
    Name: string
    Catrgory: string
    Level: number
    Distance: number
    Time: number
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((test:string, index:number) => (
          <tr key={index}>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>

  )

}