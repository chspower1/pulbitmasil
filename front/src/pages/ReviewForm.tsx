import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";

interface ReviewForm {
  contents: string;
}

export default function ReviewForm() {
  const [runningDate, setRunningDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReviewForm>();

  //확인버튼 누를때 현재시간 생성후 넘겨줌,

  return (
    <div>
      <></>
      <input type="text" />

      <DatePicker selected={runningDate} onChange={(date: Date) => setRunningDate(date)} />
    </div>
  );
}
