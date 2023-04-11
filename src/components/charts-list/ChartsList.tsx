import { Line } from "@ant-design/charts";
import { useAppSelector } from "../../app/store/store";
import { chartSelectors } from "../../service";
import { ChartContainer } from "../chart-container/ChartContainer";
import { Pagination } from "antd";
import { FC, useState } from "react";

interface Props {
  isSettingPage?: boolean;
}

export const ChartsList: FC<Props> = ({ isSettingPage }) => {
  const data = useAppSelector(chartSelectors.filteredCharts);

  const [page, setPage] = useState(1);
  const [chartsPerPage, setChartsPerPage] = useState(10);

  if (data.length === 0) {
    return null;
  }

  const onShowSizeChange = (current: number, size: number) => {
    setChartsPerPage(size);
  };

  const config = {
    xField: "year",
    yField: "value",
    padding: 30,
    autoFit: true,
  };

  const indexOfLastPage = page + chartsPerPage;
  const indexOfFirstPage = indexOfLastPage - chartsPerPage;
  const currentCharts = data.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <div className="space-y-3">
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        pageSize={chartsPerPage}
        total={data.length}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
      />
      {currentCharts.map((chart) => {
        const { data, createAt, color, stroke, lineWidth } = chart;

        return (
          <ChartContainer
            isSettingPage={isSettingPage}
            id={chart.id}
            key={chart.id}
            date={new Date(createAt)}
          >
            <Line
              data={data}
              color={color}
              lineStyle={{ stroke, lineWidth }}
              {...config}
            />
          </ChartContainer>
        );
      })}
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        pageSize={chartsPerPage}
        total={data.length}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};
