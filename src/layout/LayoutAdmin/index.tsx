import { Button, Dropdown, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from "react";
import NoticeAdmin from "../../components/Admin/Notice";
import MenuSiderAdmin from "../../components/Admin/MenuSider";
import { NavLink, Outlet } from "react-router-dom";
import Logout from "../../components/Admin/Logout";

function LayoutAdmin () {
    const [collapse, setCollapse] = useState(false);

    const login = [
        {
            key: "userinfo",
            label: <NavLink to="user-info">Thông tin tài khoản</NavLink>
        },
        {
            key: "logout",
            label: <Logout/>
        }
    ]

    return (
        <Layout className="min-h-screen bg-gray-50">
            <header className="flex items-center border-b border-gray-300 bg-white sticky top-0 z-50">
                <div className={`${collapse ? "w-20" : "w-50"} flex justify-center items-center border-r border-gray-300 transition-all duration-300`}>
                    <div className="w-14">
                        <img src="/src/assets/icons/tiki-logo.png" alt="Logo" className="w-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 p-2 flex items-center justify-between">
                    <div className="flex items-center text-xl">
                        <div className="mr-5 cursor-pointer" onClick={() => setCollapse(!collapse)}>
                            {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </div>
                        <div>
                            <SearchOutlined />
                        </div>
                    </div>

                    <div className="flex items-center text-xl">
                        <div className="mx-2">
                            <NoticeAdmin />
                        </div>
                        <div className="mx-2 px-2">
                            <Dropdown menu={{ items:login }} placement="bottom">
                                <Button><UserOutlined /></Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>

            <Layout>
                <Sider theme="light" className="!bg-white" collapsed={collapse}>
                    <MenuSiderAdmin/>
                </Sider>
                <Content className="p-5">
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutAdmin;