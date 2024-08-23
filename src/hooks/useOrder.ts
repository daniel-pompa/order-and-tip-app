import { useEffect, useState } from 'react';
import type { MenuItemType, OrderItemType } from '../types';

export const useOrder = () => {
  const [order, setOrder] = useState<OrderItemType[]>([]);
  const [tip, setTip] = useState(0);

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

  const removeItem = (id: MenuItemType['id']) => {
    setOrder(order.filter(orderItem => orderItem.id !== id));
  };

  const submitOrder = () => {
    setOrder([]);
    setTip(0);
  };

  useEffect(() => {
    if (order.length === 0) setTip(0);
  }, [order]);

  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    submitOrder,
  };
};
