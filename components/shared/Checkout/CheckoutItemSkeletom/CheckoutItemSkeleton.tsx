import { Skeleton } from "@/components/ui";
import { cn } from "@/shared/lib";
import s from './CheckoutItemSkeleton.module.scss'

interface ICheckoutItemSkeleton {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<ICheckoutItemSkeleton> = ({ className }) => {
  return (
    <div className={cn(s.checkoutItemSkeleton, className)}>
      <div className="flex items-center gap-5">
        <Skeleton className="w-[60px] h-[60px]" />
        <Skeleton className="w-40 h-5" />
      </div>
      <Skeleton className="h-5 w-10" />
      <Skeleton className="h-8 w-[133px]" />
    </div>
  );
};
