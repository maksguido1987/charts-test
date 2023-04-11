import { ChartsList, ControlPanel, Layout } from "../../components";

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <ControlPanel />
      <ChartsList />
    </Layout>
  );
};

export default Dashboard;
