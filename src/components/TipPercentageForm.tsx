import type { Dispatch, SetStateAction } from 'react';

const tipOptions = [
  {
    id: 'tip-5',
    value: 0.05,
    label: '5%',
  },
  {
    id: 'tip-10',
    value: 0.1,
    label: '10%',
  },
  {
    id: 'tip-15',
    value: 0.15,
    label: '15%',
  },
  {
    id: 'tip-20',
    value: 0.2,
    label: '20%',
  },
];

type TipPercentageFormProps = {
  tip: number;
  setTip: Dispatch<SetStateAction<number>>;
};

export const TipPercentageForm = ({ tip, setTip }: TipPercentageFormProps) => {
  return (
    <div className='space-y-3 my-5'>
      <h2>Propina</h2>
      <form>
        {tipOptions.map(option => (
          <div key={option.id} className='flex items-center gap-2'>
            <input
              type='radio'
              id={option.id}
              name='tip'
              value={option.value}
              onChange={() => setTip(option.value)}
              checked={tip === option.value}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </form>
    </div>
  );
};
