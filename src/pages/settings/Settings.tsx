import { Button } from "antd";
import {
  ChartsList,
  Layout,
  CreateChartModal,
  UpdateModal,
} from "../../components";
import { useState } from "react";

const Settings = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <Layout title="Settings">
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setIsOpenCreateModal(true)}
      >
        Create new chart
      </Button>
      <ChartsList isSettingPage />
      <CreateChartModal
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
      />
      <UpdateModal />
    </Layout>
  );
};

export default Settings;
