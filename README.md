# Order and Tip App

Order and Tip App is a application designed to streamline restaurant ordering and tip calculation. It allows users to manage their menu selections, calculate the total cost including the tip, and view the final amount due. This app enhances the dining experience by simplifying the ordering process and ensuring accurate tip calculations.

## Table of Contents

1. [Requirements](#requirements)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Hooks](#hooks)
6. [Usage](#usage)
7. [Demo](#demo)
8. [Contributing](#contributing)
9. [License](#license)
10. [Author](#author)
11. [Acknowledgements](#acknowledgements)

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

## Technology Stack

Vite, React, HTML, CSS, TypeScript, Tailwind CSS.

<div>
  <img src="https://skillicons.dev/icons?i=vite" alt="Vite" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=react" alt="React" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=html" alt="HTML5" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=css" alt="CSS3" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=tailwindcss" alt="Tailwind CSS" width="40" height="40" />
</div>

## Project Structure

```bash
├───📁 public/
├───📁 src/
│   ├───📁 assets/
│   ├───📁 components/
│   ├───📁 data/
│   ├───📁 hooks/
│   ├───📁 types/
│   ├───📁 utils/
│   ├───📄 App.tsx
│   ├───📄 index.css
│   ├───📄 main.tsx
│   └───📄 vite-env.d.ts
├───📄 eslint.config.js
├───📄 index.html
├───📄 package-lock.json
├───📄 package.json
├───📄 postcss.config.js
├───📄 README.md
├───📄 tailwind.config.js
├───📄 tsconfig.app.json
├───📄 tsconfig.json
├───📄 tsconfig.node.json
└───📄 vite.config.ts
```

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/order-and-tip-app.git
```

2. **Navigate to the project directory:**

```bash
cd order-and-tip-app
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the development server:**

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:5173>, but check the output on your terminal to be sure.

## Hooks

<!-- TODO: Update description, and example -->
`useOrder` is a custom Hook designed to manage an order list in a restaurant. It allows you to add items to an order, update the quantity of existing items, and manage the state of the order, including handling tips and submitting the order.

### Features

- **Add Items**: Add new items to the order or update the quantity if the item already exists.
- **Remove Items**: Remove items from the order by their ID.
- **Manage Tip**: Set and reset the tip associated with the order.
- **Submit Order**: Simulate the submission of the order, resetting the order list and tip

```ts
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
```

### Example

```ts
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
```

## Usage

Once the application is running, you can:

- **Browse the menu:**  
  View available dishes along with descriptions and prices. Explore all the options before placing your order.

- **Add items to your order:**  
  Select items from the menu that you want to order. Each time you click on a dish, it will be added to your order, or the quantity will be updated if you've already selected it.

- **Remove items from your order:**  
  If you change your mind, you can remove any dish from your order, allowing you to adjust your selection before confirming.

- **Calculate the tip:**  
  Choose a tip percentage to add to your total. This will be automatically included in your final bill.

- **View total amount:**  
  See the total cost of your order, including the selected tip.

- **Save the order:**  
  Once you're satisfied with your selection, you can save your order for later review or submission.

## Demo

<!-- TODO: Add link to application deployed in Vercel or Netlify -->

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge for see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

## Acknowledgements

- **[Vite](https://vitejs.dev/)** for the fast and modern build tool.
- **[React](https://es.react.dev/)** for the powerful UI library.

I would like to extend my sincere thanks to:

- **[Node.js](https://nodejs.org/en)** for offering a powerful and efficient runtime environment for JavaScript.
- **[npm](https://www.npmjs.com/)** for being a crucial tool in managing project dependencies and packages.
- **[Tailwind CSS](https://tailwindcss.com/)** for providing a utility-first CSS framework that made styling the application efficient and highly customizable.
- **[Skillicons](https://skillicons.dev/)** for high-quality icons that enhance the visual appeal of this project.
- **Open Source Community** for the countless resources, tutorials, and tools available that have supported our learning journey.

[Back to Top](#table-of-contents)
