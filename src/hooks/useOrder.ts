import { useState } from 'react';
import type { MenuItemType, OrderItemType } from '../types';

export const useOrder = () => {
  const [order, setOrder] = useState<OrderItemType[]>([]);

  const addItem = (item: MenuItemType) => {
    const itemExist = order.find(orderItem => orderItem.id === item.id);
    if (itemExist) {
      const updatedOrder = order.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      const menuItem = { ...item, quantity: 1 };
      setOrder([...order, menuItem]);
    }
  };

  return {
    order,
    addItem,
  };
};
