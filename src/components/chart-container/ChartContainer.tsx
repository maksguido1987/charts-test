import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { FC, Key, ReactNode } from "react";
import { useAppDispatch } from "../../app/store/store";
import { chartActions } from "../../service/slice";

interface Props {
  id: string;
  date: Date;
  children: ReactNode;
  key: Key;
  isSettingPage?: boolean;
}

export const ChartContainer: FC<Props> = ({
  date,
  children,
  id,
  isSettingPage = false,
}) => {
  const dispatch = useAppDispatch();

  const formattedDate = new Intl.DateTimeFormat("ru", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  }).format(date);

  return (
    <div className="p-4 shadow-md rounded-lg">
      <div className="mb-2 text-sm font-mono font-semibold flex justify-between">
        Created: {formattedDate}
        {isSettingPage && (
          <div>
            <EditOutlined
              style={{ cursor: "pointer", padding: "5px" }}
              onClick={() => undefined}
            />
            <Popconfirm
              placement="topRight"
              okText="Да"
              okType="danger"
              cancelText="Нет"
              title="Вы точно хотите удалить?"
              onConfirm={() => dispatch(chartActions.deleteChart(id))}
            >
              <DeleteOutlined
                style={{ cursor: "pointer", padding: "5px", color: "red" }}
              />
            </Popconfirm>
          </div>
        )}
      </div>
      <div className="h-48">{children}</div>
    </div>
  );
};
