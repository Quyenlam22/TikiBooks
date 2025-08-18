import { Button, Flex, Input, Modal, Space, Table, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import type { ColumnsType } from "antd/es/table";
import {
  createUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../../../services/authService";
import UserForm from "../../../components/User/userform";

import type { User } from "../../../../type/user";
import { getUsers } from "../../../services/authService";
import { useEffect } from "react";
import dayjs from "dayjs";
import { isAxiosError } from "axios";

function UserAdmin() {
  const { dataUser, setDataUser } = useContext(AppContext);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchEmail, setSearchEmail] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setDataUser(users);
      } catch (err) {
        console.error("Lỗi khi lấy user:", err);
      }
    };

    fetchUsers();
  }, [setDataUser]);


  const handleCreate = async (values: User) => {
    const payload = {
      email: values.email,
      password: values.password, // BẮT BUỘC cho json-server-auth
      fullName: values.fullName || "",
      phone: values.phone || "",
      address: values.address || "",
      gender: values.gender || undefined,
      birthDay: values.birthDay ? dayjs(values.birthDay).format("YYYY-MM-DD") : undefined,
      nickName: values.nickName || "",
      role: values.role || "user",
    };

    try {
      const newUser = await createUser(payload);
      setDataUser((prev) => [newUser, ...(prev ?? [])]); // thêm vào danh sách
      messageApi.success("Thêm user thành công!");
      setModalCreate(false);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 400) {
        messageApi.error("Email đã tồn tại hoặc payload không hợp lệ!");
      } else {
        messageApi.error("Thêm user thất bại!");
      }
      console.error("Lỗi create:", error);
    }
  };




  // EDIT
  const handleEdit = async (id: number) => {
    try {
      const user = await getUserById(id);
      if (user) {
        setEditData(user);
        setModalEdit(true);
      }
    } catch (err) {
      console.error(err);
      messageApi.error("Không tìm thấy user!");
    }
  };

  // UPDATE
  const handleUpdate = async (values: Partial<User>) => {
    try {
      if (!editData?.id) return;
      const updatedUser = await updateUserById(editData.id, values);
      setDataUser((prev: User[]) =>
        prev.map((u) => (u.id === editData.id ? updatedUser : u))
      );
      messageApi.success("Cập nhật thành công!");
      setModalEdit(false);
      setEditData(null);
    } catch (err) {
      console.error(err);
      messageApi.error("Cập nhật thất bại!");
    }
  };

  // DELETE
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setModalDelete(true);
  };

  const handleOkDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUserById(deleteId);
      setDataUser((prev: User[]) => prev.filter((u) => u.id !== deleteId));
      messageApi.success("Xóa user thành công!");
    } catch (err) {
      console.error(err);
      messageApi.error("Xóa user thất bại!");
    } finally {
      setModalDelete(false);
      setDeleteId(null);
    }
  };
  // const columns: ColumnsType<User> = [
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email"
  //   },
  //   {
  //     title: "Họ và tên",
  //     dataIndex: "fullName",
  //     key: "fullName",
  //     render: (text) => text || "---"
  //   },
  //   {
  //     title: "Số điện thoại",
  //     dataIndex: "phone",
  //     key: "phone",
  //     render: (text) => text || "---"
  //   },
  //   {
  //     title: "Địa chỉ",
  //     dataIndex: "address",
  //     key: "address",
  //     render: (text) => text || "---"
  //   },
  //   {
  //     title: "Hành động",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space>
  //         <Button
  //           icon={<EditOutlined />}
  //           type="primary"
  //           onClick={() => handleEdit(record.id!)}
  //         />
  //         <Button
  //           icon={<DeleteOutlined />}
  //           danger
  //           onClick={() => handleDelete(record.id!)}
  //         />
  //       </Space>
  //     ),
  //   },
  // ];

  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => text || "---"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "---"
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => text || "---"
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) =>
        record.role !== "admin" ? (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleEdit(record.id!)}
            />
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id!)}
            />
          </Space>
        ) : null,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {contextHolder}

      <Flex justify="space-between">
        <Input.Search
          placeholder="Tìm user theo email"
          style={{ width: 200 }}
          allowClear
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => setModalCreate(true)}
        >
          <PlusCircleOutlined /> Thêm mới
        </Button>
      </Flex>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
        <Table
          dataSource={dataUser
            ?.filter((u) => u.role === "admin")
            ?.filter((u) =>
              u.email?.toLowerCase().includes(searchEmail.toLowerCase())
            )}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal xác nhận xóa */}
      <Modal
        title={
          <>
            <InfoCircleFilled className="text-yellow-500" /> Bạn có muốn xóa user
            này?
          </>
        }
        open={modalDelete}
        onCancel={() => setModalDelete(false)}
        onOk={handleOkDelete}
      />

      {/* Form thêm */}
      <UserForm
        open={modalCreate}
        onCancel={() => setModalCreate(false)}
        onSubmit={handleCreate}
        isEdit={false}
      />

      {/* Form sửa */}
      <UserForm
        open={modalEdit}
        onCancel={() => setModalEdit(false)}
        onSubmit={handleUpdate}
        initialValues={editData ?? undefined}
        isEdit
      />
    </div>
  );
}

export default UserAdmin;
