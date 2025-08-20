import { Form, Input, Modal, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { User } from "../../../type/user";
import { useEffect } from "react";

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: User) => void;
  initialValues?: User;
  isEdit?: boolean;
}

function UserForm({ open, onCancel, onSubmit, initialValues, isEdit }: UserFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          birthDay: initialValues.birthDay ? dayjs(initialValues.birthDay) : null,
        });
      } else {
        form.resetFields(); // 👈 luôn clear khi thêm mới
      }
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={isEdit ? "Chỉnh sửa User" : "Thêm User"}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        {!isEdit && (
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item name="fullName" label="Họ và tên">
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Số điện thoại">
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>

        <Form.Item name="birthDay" label="Ngày sinh">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Select
            options={[
              { value: "male", label: "Nam" },
              { value: "female", label: "Nữ" },
              { value: "other", label: "Khác" },
            ]}
          />
        </Form.Item>

        <Form.Item name="nickName" label="Nickname">
          <Input />
        </Form.Item>

        <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserForm;
