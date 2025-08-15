import { Button, Image, message, Modal, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled, InfoCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import type { ColumnsType } from "antd/es/table";
import type { Book } from "../../../../type/Book";
import type { Author } from "../../../../type/Author";
import { deleteBook } from "../../../services/bookService";
import CreateBook from "../../../components/Book/CreateBook";

function Book() {
  const {dataBook, setDataBook} = useContext(AppContext);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ messageApi, contextHolder ] = message.useMessage();
  
  const handleCreate = (values: any) => {
    console.log("Dữ liệu sách mới:", values);
    setModalCreate(false);
  };
  
  const handleCancelDelete = () => {
    setModalDelete(false);
    setDeleteId(null);
  };

  const handleOkDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBook(deleteId);
      setDataBook(prev => prev.filter(book => book.id !== deleteId));
      messageApi.open({
        type: 'success',
        content: 'Xóa sách thành công!',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Xóa sách thất bại!',
      });
    } finally {
      setModalDelete(false);
      setDeleteId(null);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setModalDelete(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit book", id);
  };

  const columns: ColumnsType<Book> = [
    {
      title: "Ảnh bìa",
      dataIndex: "images",
      key: "image",
      render: (images) => (
        <Image
          src={images?.[0]?.small_url}
          width={60}
          preview={true}
        />
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Tác giả",
      dataIndex: "authors",
      key: "authors",
      render: (authors: Author[]) => authors?.map((a) => a.name).join(", ") || "—",
    },
    {
      title: "Danh mục",
      dataIndex: "categories",
      key: "categories",
      render: (cat) => <Tag color="blue">{cat.name}</Tag>,
    },
    {
      title: "Giá",
      dataIndex: "current_seller",
      key: "price",
      render: (seller) =>
        seller?.price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Đã bán",
      dataIndex: "quantity_sold",
      key: "sold",
      render: (sold) => sold?.text,
    },
    {
      title: <>Đánh giá <StarFilled className="!text-yellow-500"/></>,
      dataIndex: "rating_average",
      key: "rating",
    },
    {
      title: "Nhà XB",
      key: "publisher",
      render: (_, record) => {
        const publisher = record.specifications[0]?.attributes.find(
          (a) => a.code === "publisher_vn"
        )?.value;
        return publisher || "—";
      },
    },
    {
      title: "Ngày XB",
      key: "pub_date",
      render: (_, record) => {
        const pubDate = record.specifications[0]?.attributes.find(
          (a) => a.code === "publication_date"
        )?.value;
        return pubDate?.split(" ")[0] || "—";
      },
    },
    {
      title: "Loại bìa",
      key: "cover",
      render: (_, record) => {
        const cover = record.specifications[0]?.attributes.find(
          (a) => a.code === "book_cover"
        )?.value;
        return cover || "—";
      },
    },
    {
      title: "Số trang",
      key: "pages",
      render: (_, record) => {
        const pages = record.specifications[0]?.attributes.find(
          (a) => a.code === "number_of_page"
        )?.value;
        return pages || "—";
      },
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
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Quản lý sách</h2>
        <Button 
          type="primary" 
          size="large"
          onClick={() => setModalCreate(true)}
        >
          <PlusCircleOutlined />Thêm mới
        </Button>
        <CreateBook
          open={modalCreate}
          onCancel={() => setModalCreate(false)}
          onSubmit={handleCreate}
        />
      </div>
      <Table
        dataSource={dataBook}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="overflow-x-auto"
      />
      <Modal
        title={
          <>
            <InfoCircleFilled className="text-2xl !text-yellow-500"/> Bạn có đồng ý muốn xóa bản ghi này?
          </>
          }
        open={modalDelete}
        onCancel={handleCancelDelete}
        onOk={handleOkDelete}
      >
      </Modal>
    </div>
  );
}

export default Book;