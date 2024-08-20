import { menuItems } from './data/items';
import { MenuItem } from './components/MenuItem';

function App() {
  return (
    <>
      <header className='bg-teal-500 text-white text-center py-20 font-bold'>
        <h1 className='text-2xl md:text-5xl lg:text-6xl uppercase'>
          Calculadora de Pedidos y Propinas
        </h1>
      </header>

      <main className='max-w-full mx-auto py-20 px-10 grid md:grid-cols-2'>
        {/* Menu */}
        <div className='flex flex-col'>
          <h2 className='text-2xl md:text-5xl lg:text-6xl text-center text-teal-500 mt-5 mb-10'>
            Experiencia Gastronómica
          </h2>
          {/* Menu Items */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className='md:ml-5 lg:ml-10'>
          <h2 className='text-2xl md:text-5xl lg:text-6xl text-center text-teal-500 mt-5 mb-10'>
            Detalles de Pedidos
          </h2>
        </div>
      </main>
    </>
  );
}

export default App;
