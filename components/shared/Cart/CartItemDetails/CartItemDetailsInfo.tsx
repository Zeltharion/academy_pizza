import { cn } from '@/shared/lib';
import { ICartItemDetailsInfo } from './CartItemDetails.types';
import s from './CartItemDetails.module.scss'

export const CartItemDetailsInfo: React.FC<ICartItemDetailsInfo> = ({ name, details, className }) => {
  return (
    <div className={cn(s.cartItemDetailsInfo, className)}>
      <h2>{name}</h2>
      {details.length > 0 && <p>{details}</p>}
    </div>
  );
};
