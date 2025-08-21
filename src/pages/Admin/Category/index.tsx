import { Button, Flex, Input, message, Modal, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, InfoCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { AppContext } from "../../../context/AppProvider";
import { createCategory, deleteCategory, getCategoryById, updateCategory } from "../../../services/categoryService";
import type { Category } from "../../../type/Category";
import CategoryForm from "../../../components/Category/CategoryForm";
import { removeVietnameseTones } from "../../../utils/removeVietnameseTones";
import { getAllBooks, updateBook } from "../../../services/bookService";
import type { Book } from "../../../type/Book";

function Category() {
  const { dataCategory, setDataCategory } = useContext(AppContext);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterText, setFilterText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const filteredCategories = useMemo(() => {
    return dataCategory.filter((cat) =>
      removeVietnameseTones(cat.name.toLowerCase()).includes(
        removeVietnameseTones(filterText.trim().toLowerCase())
      )
    );
  }, [dataCategory, filterText]);

  const handleCreate = async (values: Category) => {
    try {
      const newCategory = await createCategory({
        ...values,
        id: Date.now(), 
        createdAt: new Date().toISOString(),
      });
      setDataCategory((prev) => [newCategory, ...prev]);
      messageApi.success("Thêm danh mục thành công!");
      setModalCreate(false);
    } catch (error) {
      messageApi.error("Thêm danh mục thất bại!");
    }
  };

  const handleEdit = async (id: number) => {
    const category = await getCategoryById(id);
    if (!category) return;
    setEditData(category);
    setModalEdit(true);
  };

  const handleUpdate = async (values: Category) => {
    try {
      if (!editData) return;

      const updatedCategory = await updateCategory(editData.id, {
        ...values,
        createdAt: editData.createdAt,
      });

      setDataCategory((prev) =>
        prev.map((c) => (c.id === editData.id ? updatedCategory : c))
      );

      const allBooks: Book[] = await getAllBooks();
      const relatedBooks = allBooks.filter(
        (b) => b.categories?.id === editData.id
      );

      for (const book of relatedBooks) {
        await updateBook(book.id.toString(), {
          ...book,
          categories: {
            ...book.categories,
            name: values.name, 
          },
        });
      }

      messageApi.success("Cập nhật thành công!");
      setModalEdit(false);
    } catch (error) {
      console.error(error);
      messageApi.error("Cập nhật thất bại!");
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setModalDelete(true);
  };

  const handleOkDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteCategory(deleteId);
      setDataCategory((prev) => prev.filter((c) => c.id !== deleteId));
      messageApi.success("Xóa thành công!");
    } catch (error) {
      messageApi.error("Xóa thất bại!");
    } finally {
      setModalDelete(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setModalDelete(false);
    setDeleteId(null);
  };

  const columns: ColumnsType<Category> = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record.id)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {contextHolder}
      <Flex justify="space-between" wrap>
        <Input.Search
          placeholder="Tìm danh mục"
          onChange={(e) => setFilterText(e.target.value)}
          style={{ width: 200 }}
          allowClear
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
        <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>
        <CategoryForm
          open={modalCreate}
          onCancel={() => setModalCreate(false)}
          onSubmit={handleCreate}
          initialValues={null}
          isEdit={false}
        />
      </div>

      <Table
        dataSource={filteredCategories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="overflow-x-auto"
      />

      <Modal
        title={
          <>
            <InfoCircleFilled className="text-2xl !text-yellow-500" /> Bạn có chắc muốn xóa danh mục này?
          </>
        }
        open={modalDelete}
        onCancel={handleCancelDelete}
        onOk={handleOkDelete}
      />

      <CategoryForm
        open={modalEdit}
        onCancel={() => setModalEdit(false)}
        onSubmit={handleUpdate}
        initialValues={editData}
        isEdit
      />
    </div>
  );
}

export default Category;