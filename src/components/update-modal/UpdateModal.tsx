import { FC, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
  Space,
} from "antd";
import {
  CURRENT_YEAR,
  MIN_CHART_DATA_FIELD_LENGTH,
} from "../../shared/constants";
import { Chart, ChartData } from "../../app/types";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { chartActions } from "../../service/slice";
import { chartSelectors } from "../../service";

export const UpdateModal: FC = () => {
  const isOpenUpdateModal = useAppSelector(chartSelectors.isOpenUpdateModal);
  const { id, createAt, data, color, lineWidth } = useAppSelector(
    chartSelectors.updateChartData
  );

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = async () => {
    await form.validateFields(["chartUpdateData"]);
    const { chartUpdateData, color, lineWidth } = form.getFieldsValue();

    const body: Chart = {
      id,
      createAt,
      data: chartUpdateData.sort(
        (a: ChartData, b: ChartData) => a.year - b.year
      ),
      color,
      lineWidth,
    };
    dispatch(chartActions.updateChart({ data: body, id }));
    onCloseModal();
  };

  const onResetForm = () => {
    form.setFieldValue("color", color);
    form.setFieldValue("lineWidth", lineWidth);
    form.setFieldsValue({
      chartUpdateData: data,
    });
  };

  const onCloseModal = () => {
    dispatch(chartActions.setIsOpenUpdateModal(false));
    dispatch(chartActions.clearUpdateChartData());
  };

  useEffect(() => {
    form.setFieldValue("color", color);
    form.setFieldValue("lineWidth", lineWidth);
    form.setFieldValue("chartUpdateData", data);
  }, [isOpenUpdateModal]);

  const initialYear = 1990;
  const initialValue = 0;

  return (
    <Modal
      forceRender
      title={<Typography className="modalTitle">Create chart</Typography>}
      open={isOpenUpdateModal}
      onCancel={onCloseModal}
      footer={[
        <Button key="close" onClick={onCloseModal}>
          Close
        </Button>,
        <Button key="clear" type="primary" onClick={onResetForm}>
          Reset
        </Button>,
        <Button
          key="update"
          type="primary"
          htmlType="submit"
          onClick={onFinish}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        {...layout}
        form={form}
        name="create-chart"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.List
          rules={[
            {
              validator: async (_, names) => {
                if (names.length < MIN_CHART_DATA_FIELD_LENGTH) {
                  return Promise.reject(
                    new Error(
                      `The minimum number of fields has not been reached. (Min is ${MIN_CHART_DATA_FIELD_LENGTH})`
                    )
                  );
                }
              },
            },
          ]}
          name="chartUpdateData"
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  className="flex justify-center mb-2"
                  align="center"
                >
                  <Form.Item
                    {...restField}
                    initialValue={initialYear}
                    name={[name, "year"]}
                    className="mb-0"
                  >
                    <InputNumber
                      min={initialYear}
                      max={CURRENT_YEAR}
                      placeholder="Year"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    initialValue={initialValue}
                    name={[name, "value"]}
                    className="mb-0"
                  >
                    <InputNumber min={0} placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add data field
                </Button>
              </Form.Item>
              <Form.ErrorList className="mb-4 text-red-600" errors={errors} />
            </>
          )}
        </Form.List>

        <Form.Item label="Color" name="color">
          <Input className="py-0 px-1" type="color" allowClear />
        </Form.Item>

        <Form.Item label="LineWidth" name="lineWidth">
          <InputNumber min="1" max="5" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
