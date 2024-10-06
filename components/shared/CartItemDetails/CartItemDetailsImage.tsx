import { cn } from '@/shared/lib';
import { ICartItemDetailsImage } from './CartItemDetails.types';
import s from './CartItemDetails.module.scss';

export const CartItemDetailsImage: React.FC<ICartItemDetailsImage> = ({ src, className }) => {
  return (
    <img className={cn(s.cartItemDetailsImage, className)} src={src} alt=''/>
  );
};
