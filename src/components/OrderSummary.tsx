import { MenuItemType, OrderItemType } from '../types';
import { formatCurrency } from '../utils';

type OrderSummaryProps = {
  order: OrderItemType[];
  removeItem: (id: MenuItemType['id']) => void;
};

export const OrderSummary = ({ order, removeItem }: OrderSummaryProps) => {
  return (
    <div>
      <h2 className='text-2xl md:text-4xl lg:text-5xl text-center text-teal-500 mt-5 mb-10'>
        Resumen del Pedido
      </h2>

      <div className='space-y-5 mt-5'>
        {order.length === 0 ? (
          <p className='text-center pb-10 text-slate-400 font-bold'>
            No hay elementos en el pedido
          </p>
        ) : (
          <>
            {order.map(item => (
              <div
                className='flex items-center justify-between pt-5 border-t border-slate-200 last-of-type:border-b last-of-type:pb-5'
                key={item.id}
              >
                <div className='space-y-2'>
                  <p>{item.name}</p>
                  <p className='text-slate-500 font-bold'>
                    Cantidad: {item.quantity} -{' '}
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  className='text-red-600 font-bold h-8 w-8'
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
