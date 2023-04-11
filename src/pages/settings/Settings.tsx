import { Button } from "antd";
import { ChartsList, Layout } from "../../components";

const Settings = () => {
  return (
    <Layout title="Settings">
      <Button className="mb-4" type="primary">
        Create new chart
      </Button>
      <ChartsList isSettingPage />
    </Layout>
  );
};

export default Settings;
