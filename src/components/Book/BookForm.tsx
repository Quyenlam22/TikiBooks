import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

interface BookFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any; 
  isEdit?: boolean;   
}

const BookForm: React.FC<BookFormProps> = ({ open, onCancel, onSubmit, initialValues, isEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); 
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa sách" : "Thêm mới sách"} 
      open={open}
      onCancel={() => { form.resetFields(); onCancel(); }}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
      width={800}
    >
      <Form 
        form={form} 
        layout="vertical"
        initialValues={isEdit ? undefined : { quantity_sold: { value: 0 }, rating_average: 5 }}
      >
        <Form.Item
          label="Tên sách"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
        >
          <Input placeholder="Nhập tên sách" />
        </Form.Item>

        <Form.Item
          label="Giá gốc"
          name="original_price"
          rules={[{ required: true, message: "Vui lòng nhập giá gốc" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Giá bán"
          name={["current_seller", "price"]}
          rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name={["categories", "name"]}
          rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          label="Số lượng đã bán"
          name={["quantity_sold", "value"]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Đánh giá (rating)"
          name="rating_average"
        >
          <InputNumber min={0} max={5} step={0.1} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Nhà xuất bản"
          name={["specifications", 0, "attributes", 0, "value"]}
        >
          <Input placeholder="Nhập nhà xuất bản" />
        </Form.Item>

        <Form.Item
          label="Ngày xuất bản"
          name={["specifications", 0, "attributes", 1, "value"]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Loại bìa"
          name={["specifications", 0, "attributes", 2, "value"]}
        >
          <Select
            options={[
              { value: "Bìa mềm", label: "Bìa mềm" },
              { value: "Bìa cứng", label: "Bìa cứng" },
            ]}
          />
        </Form.Item>

        {/* Số trang */}
        <Form.Item
          label="Số trang"
          name={["specifications", 0, "attributes", 3, "value"]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.List name="authors">
          {(fields, { add, remove }) => (
            <>
              <label className="font-medium">Tác giả</label>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-2 items-baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "Nhập tên tác giả" }]}
                    className="flex-1"
                  >
                    <Input placeholder="Tên tác giả" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm tác giả
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.List name="images">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              <label className="font-medium">Hình ảnh</label>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="p-4 border rounded-md space-y-2 relative">
                  <Form.Item
                    {...restField}
                    name={[name, "base_url"]}
                    label="Base URL"
                    rules={[{ required: true, message: "Nhập base_url" }]}
                  >
                    <Input placeholder="Nhập base_url" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "large_url"]}
                    label="Large URL"
                    rules={[{ required: true, message: "Nhập large_url" }]}
                  >
                    <Input placeholder="Nhập large_url" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "medium_url"]}
                    label="Medium URL"
                    rules={[{ required: true, message: "Nhập medium_url" }]}
                  >
                    <Input placeholder="Nhập medium_url" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "small_url"]}
                    label="Small URL"
                    rules={[{ required: true, message: "Nhập small_url" }]}
                  >
                    <Input placeholder="Nhập small_url" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "thumbnail_url"]}
                    label="Thumbnail URL"
                    rules={[{ required: true, message: "Nhập thumbnail_url" }]}
                  >
                    <Input placeholder="Nhập thumbnail_url" />
                  </Form.Item>

                  <Button
                    danger
                    type="dashed"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Xóa ảnh này
                  </Button>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                className="w-full"
              >
                Thêm ảnh
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default BookForm;
