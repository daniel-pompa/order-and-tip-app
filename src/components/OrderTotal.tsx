import { useMemo } from 'react';
import { OrderItemType } from '../types';
import { formatCurrency } from '../utils';

type OrderTotalProps = {
  order: OrderItemType[];
  tip: number;
};

export const OrderTotal = ({ order, tip }: OrderTotalProps) => {
  const subtotalAmount = useMemo(
    () => order.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [order]
  );

  const tipAmount = useMemo(() => subtotalAmount * tip, [subtotalAmount, tip]);

  const totalAmount = useMemo(
    () => subtotalAmount + tipAmount,
    [subtotalAmount, tipAmount]
  );

  return (
    <>
      <div className='space-y-3 my-5'>
        <h2>Total del pedido</h2>
        <p>
          Subtotal: <span>{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina: <span>{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar: <span>{formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <button></button>
    </>
  );
};
