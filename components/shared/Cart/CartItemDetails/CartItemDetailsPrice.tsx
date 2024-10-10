import { cn, formatNumberToMoney } from '@/shared/lib';
import { ICartItemDetailsPrice } from './CartItemDetails.types';
import s from './CartItemDetails.module.scss';

export const CartItemDetailsPrice: React.FC<ICartItemDetailsPrice> = ({ value, className }) => {
  return (
    <h2 className={cn(s.cartItemDetailsPrice, className)}>{formatNumberToMoney(value)}</h2>
  );
};
