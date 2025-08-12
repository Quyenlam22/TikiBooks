import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import type { Category } from "../../../type/Category";

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from "react-router";
type MenuItem = Required<MenuProps>['items'][number];

const CategoryAccordion: React.FC = () => {
  const {dataCategory} = useContext(AppContext);

  const items: MenuItem[] = dataCategory.map((category: Category, index) => {
    return {
      key: String(index + 1),
      label: category.name,
      children: category.books.map((book) => ({
        key: book.id,
        label: <Link to={`/book/${book.id}`}>{book.name}</Link>,
      })) as MenuItem[], 
    } as MenuItem;
  })

  console.log(dataCategory);
  

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold m-4">Khám phá theo danh mục</h2>
      <Menu
      mode="inline"
      defaultOpenKeys={['1']}
      style={{ width: 280 }}
      items={items}
    />
    </div>
  );
};

export default CategoryAccordion;