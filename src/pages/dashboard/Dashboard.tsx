import { Column } from "@ant-design/charts";
import { ChartContainer, ControlPanel, Layout } from "../../components";
import { useAppSelector } from "../../app/store/store";
import { chartSelectors } from "../../service";

const Dashboard = () => {
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
    <Layout>
      <ControlPanel />
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
    </Layout>
  );
};

export default Dashboard;
