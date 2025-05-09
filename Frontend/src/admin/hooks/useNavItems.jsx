import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdKeyboardArrowDown } from "react-icons/md";

export const useNavItems = () => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const fetchAndTransformMenu = async () => {
      try {
        // 1. Fetch menu items from API
        const response = await axios.get('http://localhost:3000/menu/all');
        const flatItems = response.data;

        // 2. Build hierarchical tree structure
        const buildTree = (items, parentId = null) => {
          return items
            .filter(item => 
              (item.parent === parentId) || 
              (item.parent?._id === parentId)
            )
            .sort((a, b) => a.order - b.order)
            .map(item => ({
              ...item,
              children: buildTree(items, item._id)
            }));
        };

        // 3. Transform to navItems format
        const transformItem = (item) => ({
          id: item._id,
          title: item.title,
          path: getPath(item),
          icon2: item.children?.length ? <MdKeyboardArrowDown /> : null,
          dropdown: item.children?.map(transformItem)
        });

        const getPath = (item) => {
          switch (item.type) {
            case 'page':
              return `/pages/${item.page?.slug}`;
            case 'category':
              return `/categories/${item.category?.slug}`;
            case 'custom':
              return item.url;
            default:
              return '#';
          }
        };

        const menuTree = buildTree(flatItems);
        setNavItems(menuTree.map(transformItem));
        
      } catch (error) {
        console.error('Error loading navigation:', error);
        setNavItems([]);
      }
    };

    fetchAndTransformMenu();
  }, []);

  return navItems;
};