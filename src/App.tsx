import { menuItems } from './data/items';
import { MenuItem, OrderSummary, OrderTotal, TipPercentageForm } from './components';
import { useOrder } from './hooks/useOrder';

function App() {
  const { order, tip, setTip, addItem, removeItem, submitOrder } = useOrder();

  return (
    <>
      <header className='bg-teal-500 text-white text-center py-20 font-bold'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl uppercase'>
          Sistema de Gestión de Pedidos
        </h1>
      </header>

      <main className='max-w-full mx-auto py-20 px-10 grid md:grid-cols-2'>
        {/* Menu */}
        <div className='flex flex-col'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl text-center text-teal-500 mt-5 mb-10'>
            Experiencia Gastronómica
          </h2>
          {/* Menu Items */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>
        {/* Orders */}
        <div className='md:ml-5 lg:ml-10 px-5 shadow-md'>
          <OrderSummary order={order} removeItem={removeItem} />
          {order.length ? (
            <>
              <TipPercentageForm tip={tip} setTip={setTip} />
              <OrderTotal order={order} tip={tip} submitOrder={submitOrder} />
            </>
          ) : (
            <p className='text-center pb-10 text-slate-400 font-bold'>
              El pedido está vacío. ¡Añade artículos para continuar!
            </p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
