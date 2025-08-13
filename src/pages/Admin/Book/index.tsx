import { Button, Image, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import type { ColumnsType } from "antd/es/table";
import type { Book } from "../../../../type/Book";
import type { Author } from "../../../../type/Author";

function Book() {
  const {dataBook} = useContext(AppContext);

  const handleEdit = (id: string) => {
    console.log("Edit book", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete book", id);
  }

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
        // <img
        //   src={images?.[0]?.small_url}
        //   alt="Book cover"
        //   width={60}
        //   className="rounded shadow"
        // />
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
      <h2 className="text-xl font-bold mb-4">Quản lý sách</h2>
      <Table
        dataSource={dataBook}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="overflow-x-auto"
      />
    </div>
  );
}

export default Book;