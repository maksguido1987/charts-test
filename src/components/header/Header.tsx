import { Menu, MenuProps } from "antd";
import {
  DashboardOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const onNavigateClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <header className="flex">
      <div className="bg-gray-200">
        <img
          src="/src/assets/logo.png"
          alt="natlex-logo"
          width={160}
          height={46}
        />
      </div>
      <Menu
        onClick={onNavigateClick}
        defaultSelectedKeys={[window.location.pathname]}
        overflowedIndicator={<EllipsisOutlined />}
        mode="horizontal"
        items={[
          {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />,
          },
          {
            label: "Settings",
            key: "/settings",
            icon: <SettingOutlined />,
          },
        ]}
        className="grow"
      />
    </header>
  );
};
