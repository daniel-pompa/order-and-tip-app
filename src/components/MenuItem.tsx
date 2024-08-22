import type { MenuItemType } from '../types';

type MenuItemProps = {
  item: MenuItemType;
  addItem: (item: MenuItemType) => void;
};

export const MenuItem = ({ item, addItem }: MenuItemProps) => {
  return (
    <button
      className='border rounded border-teal-500 w-full p-4 flex justify-between hover:bg-teal-200'
      onClick={() => addItem(item)}
    >
      <p>{item.name}</p>
      <p className='font-bold'>${item.price}€</p>
    </button>
  );
};
