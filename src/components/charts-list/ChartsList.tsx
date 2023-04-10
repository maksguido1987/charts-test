import { Column } from "@ant-design/charts";
import { useAppSelector } from "../../app/store/store";
import { chartSelectors } from "../../service";
import { ChartContainer } from "../chart-container/ChartContainer";

export const ChartsList = () => {
  const data = useAppSelector(chartSelectors.filteredCharts);

  const config = {
    xField: "year",
    yField: "value",
    padding: 30,
    autoFit: true,
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <div className="space-y-3">
      {data.length > 0 &&
        data.map((chart) => {
          const { data, createAt } = chart;

          return (
            <ChartContainer key={chart.id} date={new Date(createAt)}>
              <Column data={data} {...config} />
            </ChartContainer>
          );
        })}
    </div>
  );
};
