import { Button, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router";

function Notice() {
  const itemTemplate = (
    <div className="flex hover:bg-gray-50 py-1.5 border-b border-gray-300">
      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
        <BellOutlined className="!text-yellow-500 text-xl" />
      </div>
      <div className="flex-1 ml-2">
        <div className="font-semibold text-sm">You received a new message</div>
        <div className="text-xs text-gray-500">8 minutes ago</div>
      </div>
    </div>
  );

  const items = [
    { label: itemTemplate, key: "0" },
    { label: itemTemplate, key: "1" },
    { label: itemTemplate, key: "3" },
    { label: itemTemplate, key: "4" },
    { label: itemTemplate, key: "5" },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      popupRender={(menu) => (
        <div className="shadow-lg bg-white rounded-md min-w-[300px]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 font-semibold">
              <BellOutlined /> Notification
            </div>
            <div>
              <Link to="/admin" className="text-blue-500 hover:underline">
                View All
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-300 max-h-[250px] overflow-y-auto">
            {menu}
          </div>
        </div>
      )}
    >
      <Button icon={<BellOutlined />} type="text" />
    </Dropdown>
  );
}

export default Notice;