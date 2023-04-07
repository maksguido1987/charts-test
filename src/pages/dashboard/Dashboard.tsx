import { Column, Line } from "@ant-design/charts";
import { ChartContainer, Layout } from "../../components";

const Dashboard = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
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
      <div className="space-y-3">
        <ChartContainer date={new Date()}>
          <Line {...config} />
        </ChartContainer>
        <ChartContainer date={new Date()}>
          <Column {...config} />
        </ChartContainer>
      </div>
    </Layout>
  );
};

export default Dashboard;
