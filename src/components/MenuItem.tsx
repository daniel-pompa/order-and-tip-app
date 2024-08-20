import type { MenuItemType } from '../types';

type MenuItemProps = {
  item: MenuItemType;
};

export const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <button className='border rounded border-teal-500 w-full p-4 flex justify-between hover:bg-teal-200'>
      <p>{item.name}</p>
      <p className='font-bold'>${item.price}€</p>
    </button>
  );
};
