import { Form, Input, Modal } from "antd";
import type { Category } from "../../type/Category";
import { useEffect } from "react";

interface CategoryFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Category) => void;
  initialValues: Category | null;
  isEdit: boolean;
}

const CategoryForm = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEdit,
}: CategoryFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      open={open}
      title={isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
      okText={isEdit ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
            form.resetFields();
          })
          .catch(() => {});
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;