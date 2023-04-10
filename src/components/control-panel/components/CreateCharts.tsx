import { Space, InputNumber, Button } from "antd";
import { MAX_CHARTS } from "../../../shared/constants";
import { useState } from "react";
import { useAppDispatch } from "../../../app/store/store";
import { chartActions } from "../../../service/slice";

export const CreateCharts = () => {
  const dispatch = useAppDispatch();

  const [charts, setCharts] = useState<string | number | null>(10);

  const onGenerateCharts = () => {
    dispatch(chartActions.initializationCharts(charts as number)); //TODO: подумать над типизацией
  };

  return (
    <Space>
      <InputNumber
        min={0}
        max={MAX_CHARTS}
        value={charts}
        onChange={setCharts}
      />
      <Button onClick={onGenerateCharts}>Generate charts</Button>
    </Space>
  );
};
