import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
  DEFAULT_CHART_LINE_COLOR,
  DEFAULT_CHART_LINE_WIDTH,
  MIN_CHART_DATA_FIELD_LENGTH,
} from "../../shared/constants";
import { Chart } from "../../app/types";
import { useAppDispatch } from "../../app/store/store";
import { chartActions } from "../../service/slice";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const CreateChartModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = async () => {
    await form.validateFields(["year", "value", "chartCreateData"]);
    const { chartCreateData, color, lineWidth } = form.getFieldsValue();

    const body: Chart = {
      id: uuidv4(),
      createAt: new Date(),
      data: chartCreateData,
      color,
      lineWidth,
    };
    dispatch(chartActions.createChart(body));
    onResetForm();
    onCloseModal();
  };

  const onResetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      chartCreateData: [
        { year: initialYear, value: initialValue },
        { year: initialYear, value: initialValue },
      ],
    });
  };

  const onCloseModal = () => setIsOpen(false);

  useEffect(() => {
    form.setFieldValue("color", DEFAULT_CHART_LINE_COLOR);
    form.setFieldValue("lineWidth", DEFAULT_CHART_LINE_WIDTH);
  }, [isOpen]);

  const initialYear = 1990;
  const initialValue = 0;

  return (
    <Modal
      forceRender
      title={<Typography className="modalTitle">Create chart</Typography>}
      open={isOpen}
      onCancel={onCloseModal}
      footer={[
        <Button key="close" onClick={onCloseModal}>
          Close
        </Button>,
        <Button key="clear" type="primary" onClick={onResetForm}>
          Reset
        </Button>,
        <Button key="save" type="primary" htmlType="submit" onClick={onFinish}>
          Save
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
          initialValue={[
            { year: initialYear, value: initialValue },
            { year: initialYear, value: initialValue },
          ]}
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
          name="chartCreateData"
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
