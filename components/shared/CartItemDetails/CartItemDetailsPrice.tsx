import { cn } from '@/shared/lib/utils';

interface ICartItemDetailsPrice {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<ICartItemDetailsPrice> = ({ value, className }) => {
  return (
    <h2 className={cn('font-bold', className)}>
      {value} ₽
    </h2>
  );
};
