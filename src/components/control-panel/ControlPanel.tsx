import { useMemo, useState } from "react";
import { Space, InputNumber, Button, Select } from "antd";
import { MAX_CHARTS } from "../../shared/constants";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { chartActions } from "../../service/slice";
import { chartSelectors } from "../../service";

export const ControlPanel = () => {
  const dispatch = useAppDispatch();

  const [charts, setCharts] = useState<string | number | null>(10);

  const data = useAppSelector(chartSelectors.data);

  const onGenerateCharts = () => {
    dispatch(chartActions.initializationCharts(charts as number)); //TODO: подумать над типизацией
  };

  const onFilterChange = (value: string) => {
    dispatch(chartActions.setFilterValue(value));
  };

  const years = useMemo(() => {
    return [
      ...new Set(
        data
          .map((value) => new Date(value.createAt).getFullYear())
          .sort((a, b) => a - b)
      ),
    ].map((value) => {
      return {
        value: String(value),
        label: String(value),
      };
    });
  }, [data]);

  const isSorting = data.length > 0;

  //TODO при усложнении логики разнести по компонентам
  return (
    <div
      className={`p-4 border border-red-600 flex justify-${
        isSorting ? "between" : "end"
      }`}
    >
      {isSorting && (
        <Select
          showSearch
          style={{ width: 160 }}
          placeholder="Filter by year"
          optionFilterProp="children"
          onChange={onFilterChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={years}
        />
      )}
      <Space>
        <InputNumber
          min={0}
          max={MAX_CHARTS}
          value={charts}
          onChange={setCharts}
        />
        <Button onClick={onGenerateCharts}>Generate charts</Button>
      </Space>
    </div>
  );
};
