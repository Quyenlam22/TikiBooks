import { useEffect, useState } from 'react';
import { getAllorders } from '../../../services/orderService';
import type { Order } from '../../../type/order';
import { Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { deleteOrder, updateOrder } from '../../../services/orderService';

const Order = () => {
    // Modal & message state
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
    const [messageApi, contextHolder] = message.useMessage();
    const [modalEdit, setModalEdit] = useState(false);
    const [editOrder, setEditOrder] = useState<Order | null>(null);
    const [editLoading, setEditLoading] = useState(false);

    // Xử lý xóa order
    const handleDelete = (id?: number) => {
    if (id === undefined) return;
    setDeleteId(id);
    setModalDelete(true);
    };
    const handleOkDelete = async () => {
        if (!deleteId) return;
        try {
            setEditLoading(true);
            await deleteOrder(deleteId);
            setOrders(prev => prev.filter(order => order.id !== deleteId));
            messageApi.open({ type: 'success', content: 'Xóa đơn hàng thành công!' });
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : 'Xóa đơn hàng thất bại!';
            messageApi.open({ type: 'error', content: errMsg });
        } finally {
            setEditLoading(false);
            setModalDelete(false);
            setDeleteId(undefined);
        }
    };
    const handleCancelDelete = () => {
        setModalDelete(false);
        setDeleteId(undefined);
    };

    // Xử lý edit order
    const handleEdit = (id?: number) => {
    if (id === undefined) return;
    const order = orders.find(o => o.id === id);
    if (!order) return;
    setEditOrder(order);
    setModalEdit(true);
    };

    // Khai báo columns cho bảng order
    const columns: ColumnsType<Order> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên khách',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (text: string | undefined) => text || '-',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
            render: (text: string | undefined) => text || '-',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products: Order['products']) => (
                <ul className="list-disc pl-4">
                    {products.map((p, idx) => (
                        <li key={idx}>{p.name} <span className="text-xs text-gray-500">(x{p.quantity || 1})</span></li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price: number) => `${price.toLocaleString()}₫`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: Order['status']) => (
                <span className={
                    status === 'Đã hủy' ? 'bg-red-100 text-red-700 px-2 py-1 rounded' :
                    status === 'Đã giao' ? 'bg-green-100 text-green-700 px-2 py-1 rounded' :
                    status === 'Đang giao' ? 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded' :
                    status === 'Đã xác nhận' ? 'bg-blue-100 text-blue-700 px-2 py-1 rounded' :
                    'bg-gray-100 text-gray-700 px-2 py-1 rounded'
                }>{status}</span>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string | undefined) => date ? new Date(date).toLocaleString() : '-',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_unused: unknown, record: Order) => (
                <Space>
                    <Button icon={<EditOutlined />} type="primary" onClick={() => handleEdit(record.id)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllorders()
            .then(data => setOrders(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Xử lý lưu chỉnh sửa đơn hàng
    const handleSaveEdit = async () => {
        if (!editOrder || !editOrder.id) return;
        try {
            setEditLoading(true);
            const updated = await updateOrder(editOrder.id!, editOrder);
            setOrders(prev => prev.map(order => order.id === editOrder.id ? updated : order));
            messageApi.open({ type: 'success', content: 'Cập nhật đơn hàng thành công!' });
            setModalEdit(false);
            setEditOrder(null);
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : 'Cập nhật thất bại!';
            messageApi.open({ type: 'error', content: errMsg });
        } finally {
            setEditLoading(false);
        }
    };

    // Xử lý thay đổi trường trong modal edit
    const handleChangeEdit = (field: keyof Order, value: any) => {
        if (!editOrder) return;
        setEditOrder({ ...editOrder, [field]: value });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            {contextHolder}
            <h2 className="text-xl font-bold mb-4">Quản lý đơn hàng</h2>
            {loading ? <p className="text-center">Đang tải...</p> : (
                <>
                    {/* Modal xác nhận xóa */}
                    <Modal
                        title={
                            <>
                                <InfoCircleFilled className="text-2xl !text-yellow-500"/> Bạn có đồng ý muốn xóa đơn hàng này?
                            </>
                        }
                        open={modalDelete}
                        onCancel={handleCancelDelete}
                        onOk={handleOkDelete}
                        confirmLoading={editLoading}
                    />
                    {/* Modal chỉnh sửa đơn hàng */}
                    <Modal
                        title={<span className="font-bold">Chỉnh sửa đơn hàng</span>}
                        open={modalEdit}
                        onCancel={() => { setModalEdit(false); setEditOrder(null); }}
                        footer={[
                            <Button key="cancel" onClick={() => { setModalEdit(false); setEditOrder(null); }}>Hủy</Button>,
                            <Button key="save" type="primary" loading={editLoading} onClick={handleSaveEdit}>Lưu</Button>
                        ]}
                    >
                        {editOrder && (
                            <form className="flex flex-col gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Tên khách</label>
                                    <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editOrder.fullname || ''}
                                        onChange={e => handleChangeEdit('fullname', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">SĐT</label>
                                    <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editOrder.phone || ''}
                                        onChange={e => handleChangeEdit('phone', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Địa chỉ</label>
                                    <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editOrder.address}
                                        onChange={e => handleChangeEdit('address', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Trạng thái</label>
                                    <select
                                        className="border rounded px-2 py-1 w-full"
                                        value={editOrder.status}
                                        onChange={e => handleChangeEdit('status', e.target.value)}
                                    >
                                        <option value="Đang xử lý">Đang xử lý</option>
                                        <option value="Đã xác nhận">Đã xác nhận</option>
                                        <option value="Đang giao">Đang giao</option>
                                        <option value="Đã giao">Đã giao</option>
                                        <option value="Đã hủy">Đã hủy</option>
                                    </select>
                                </div>
                            </form>
                        )}
                    </Modal>
                    <Table
                        dataSource={orders}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        className="overflow-x-auto"
                    />
                </>
            )}
        </div>
    );
};

export default Order;