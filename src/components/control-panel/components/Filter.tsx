import { Select } from "antd";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { chartActions } from "../../../service/slice";
import { chartSelectors } from "../../../service";

export const Filter = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(chartSelectors.data);

  const onChangeFilter = (value: string) =>
    dispatch(chartActions.setFilterValue(value));

  const onClearFilter = () => dispatch(chartActions.setFilterValue(""));

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

  return (
    <Select
      showSearch
      style={{ width: 130 }}
      placeholder="Filter by year"
      optionFilterProp="children"
      allowClear
      onClear={onClearFilter}
      onChange={onChangeFilter}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={years}
    />
  );
};
