import { Button, Flex, Image, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled, InfoCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import type { ColumnsType } from "antd/es/table";
import type { Book } from "../../../type/Book";
import type { Author } from "../../../type/Author";
import { createBook, deleteBook, getBookById, updateBook } from "../../../services/bookService";
import { convertToSlug } from "../../../utils/convertToSlug";
import { formatDate } from "../../../utils/formatDate";
import BookForm from "../../../components/Book/BookForm";
import dayjs from "dayjs";
import { removeVietnameseTones } from "../../../utils/removeVietnameseTones";
import type { MenuItemType } from "antd/es/menu/interface";

const sortMenuItems: MenuItemType[] = [
  {
    key: 'popular',
    label: 'Phổ biến',
  },
  {
    key: 'top_seller',
    label: 'Bán chạy nhất',
  },
  {
    key: 'top_rate',
    label: 'Rate cao nhất',
  },
  {
    key: 'price_asc',
    label: 'Giá tăng dần',
  },
  {
    key: 'price_desc',
    label: 'Giá giảm dần',
  },
];

function Book() {
  const {dataBook, setDataBook} = useContext(AppContext);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ messageApi, contextHolder ] = message.useMessage();
  
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState("popular");

  const filteredBooks = useMemo(() => {
    let books = dataBook.filter((book) => {
      const matchText = filterText
        ? removeVietnameseTones(book.name.toLowerCase()).includes(
            removeVietnameseTones(filterText.trim().toLowerCase())
          )
        : true;

      const matchCategory = filterCategory
        ? book.categories?.name === filterCategory
        : true;

      return matchText && matchCategory;
    });

    switch (sortKey) {
      case "top_seller":
        books = [...books].sort(
          (a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0)
        );
        break;
      case "top_rate":
        books = [...books].sort(
          (a, b) => (b.rating_average || 0) - (a.rating_average || 0)
        );
        break;
      case "price_asc":
        books = [...books].sort(
          (a, b) => (a.current_seller?.price || 0) - (b.current_seller?.price || 0)
        );
        break;
      case "price_desc":
        books = [...books].sort(
          (a, b) => (b.current_seller?.price || 0) - (a.current_seller?.price || 0)
        );
        break;
      default:
        break;
    }

    return books;
  }, [dataBook, filterText, filterCategory, sortKey]);

  const handleCreate = async (values: any) => {
    const authors = values.authors.map((author: { name: string }) => ({
      id: Date.now(),
      name: author.name,
      slug: convertToSlug(author.name)
    }));

    const newData = {
      authors: authors,
      book_cover: null,
      categories: {
        id: Date.now(),
        name: values.categories.name,
        is_leaf: false
      },
      current_seller: {
        price: values.current_seller.price,
        id: Date.now(),
        sku: "string",
        name: "string",
        link: "string",
        logo: "string",
        product_id: "string",
        store_id: Date.now(),
        is_best_store: false,
        is_offline_installment_supported: null
      },
      original_price: values.original_price,
      list_price: values.original_price,
      quantity_sold: {
        text: `Đã bán ${values.quantity_sold.value || 0}`,
        value: values.quantity_sold.value || 0,
      },
      description: values.description,
      images: values.images,
      name: values.name,
      specifications: [  
        {
          name: "Thông tin sách",
          attributes: [
            {
              code: "publisher_vn",
              name: "Công ty phát hành",
              value: values.specifications[0].attributes[0].value
            },
            {
              code: "publication_date",
              name: "Ngày xuất bản",
              value: formatDate(new Date(values.specifications[0].attributes[1].value))
            },
            // {
            //   code: "dimensions",
            //   name: "Kích thước",
            //   value: 14 x 20.5 cm
            // },
            // {
            //   code: "dich_gia",
            //   name: "Dịch Giả",
            //   value: ["Nguyễn Bích Lan" , "Tô Yến Ly"]
            // },
            {
              code: "book_cover",
              name: "Loại bìa",
              value: values.specifications[0].attributes[2].value
            },
            {
              code: "number_of_page",
              name: "Số trang",
              value: values.specifications[0].attributes[3].value
            },
            // {
            //   code: "manufacturer",
            //   name: "Nhà xuất bản",
            //   value: values.specifications[0].attributes[0].value
            // }
          ]
        }
      ],
      rating_average: values.rating_average || 5,
    }
    
    try {
      const createdBook = await createBook(newData);
      setDataBook(prev => [createdBook, ...prev]);
      messageApi.open({
        type: "success",
        content: "Thêm sách thành công!"
      });
      setModalCreate(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thêm sách thất bại!"
      });
    }
  };

  const handleEdit = async (id: string) => {
    const book = await getBookById(id);
    if (!book) return;
    const fixedBook = {
      ...book,
      specifications: Array.isArray(book.specifications)
        ? book.specifications.map((spec) => ({
            ...spec,
            attributes: Array.isArray(spec.attributes)
              ? spec.attributes.map((attr) => ({
                  ...attr,
                  value:
                    attr.code === "publication_date" && typeof attr.value === "string"
                      ? dayjs(attr.value)
                      : attr.value,
                }))
              : [],
          }))
        : [],
    };

    setEditData(fixedBook);
    setModalEdit(true);
  };

  const handleUpdate = async (values: any) => {
    try {
      const authors = values.authors.map((author: { name: string }) => ({
        id: Date.now(),
        name: author.name,
        slug: convertToSlug(author.name)
      }));

      const updateData = {
        ...editData, 
        authors: authors,
        book_cover: null,
        categories: {
          id: Date.now(),
          name: values.categories.name,
          is_leaf: false
        },
        current_seller: {
          price: values.current_seller.price,
          id: Date.now(),
          sku: "string",
          name: "string",
          link: "string",
          logo: "string",
          product_id: "string",
          store_id: Date.now(),
          is_best_store: false,
          is_offline_installment_supported: null
        },
        original_price: values.original_price,
        list_price: values.original_price,
        quantity_sold: {
          text: `Đã bán ${values.quantity_sold.value || 0}`,
          value: values.quantity_sold.value || 0,
        },
        description: values.description,
        images: values.images,
        name: values.name,
        specifications: [  
          {
            name: "Thông tin sách",
            attributes: [
              {
                code: "publisher_vn",
                name: "Công ty phát hành",
                value: values.specifications[0].attributes[0].value
              },
              {
                code: "publication_date",
                name: "Ngày xuất bản",
                value: formatDate(new Date(values.specifications[0].attributes[1].value))
              },
              {
                code: "book_cover",
                name: "Loại bìa",
                value: values.specifications[0].attributes[2].value
              },
              {
                code: "number_of_page",
                name: "Số trang",
                value: values.specifications[0].attributes[3].value
              },
            ]
          }
        ],
        rating_average: values.rating_average || 5,
      };

      const updatedBook = await updateBook(editData.id, updateData);
      setDataBook(prev =>
        prev.map(book => (book.id === editData.id ? updatedBook : book))
      );

      messageApi.open({ type: "success", content: "Cập nhật thành công!" });
      setModalEdit(false);
    } catch (error) {
      console.error(error);
      messageApi.open({ type: "error", content: "Cập nhật thất bại!" });
    }
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
      <Flex justify="space-between" wrap={true}>
        <Flex gap={8} align="center">
          <Input.Search
            placeholder="Tìm sách theo tên"
            onChange={(e) => setFilterText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            placeholder="Chọn danh mục"
            style={{ width: 180 }}
            onChange={(val) => setFilterCategory(val)}
            allowClear
          >
            {[...new Set(dataBook.map((b) => b.categories?.name))].map((cat) => (
              <Select.Option key={cat} value={cat}>
                {cat}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Sắp xếp"
            style={{ width: 180 }}
            onChange={(val) => setSortKey(val)}
            allowClear
          >
            {sortMenuItems.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Flex>
        <Button 
          type="primary" 
          size="large"
          onClick={() => setModalCreate(true)}
        >
          <PlusCircleOutlined />Thêm mới
        </Button>
      </Flex>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Quản lý sách</h2>
        <BookForm
          open={modalCreate}
          onCancel={() => setModalCreate(false)}
          onSubmit={handleCreate}
          initialValues={null} 
          isEdit={false}   
        />
      </div>
      <Table
        dataSource={filteredBooks}
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
      <BookForm
        open={modalEdit}
        onCancel={() => setModalEdit(false)}
        onSubmit={handleUpdate}
        initialValues={editData}
        isEdit
      />
    </div>
  );
}

export default Book;