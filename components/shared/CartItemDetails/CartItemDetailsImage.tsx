import { cn } from '@/shared/lib/utils';

interface ICartItemDetailsImage {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<ICartItemDetailsImage> = ({ src, className }) => {
  return (
    <img className={cn('w-[60px] h-[60px]', className)} src={src} alt=''/>
  );
};
