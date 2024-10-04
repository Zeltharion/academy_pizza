import { cn } from '@/shared/lib/utils';
import { CountIconButton } from '@/components/shared';
import { ICountButtonContainer } from './CountButtonContainer.types';
import s from './CountButtonContainer.module.scss';

export const CountButtonContainer: React.FC<ICountButtonContainer> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn(s.countButtonContainer, className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        size={size}
        type="plus"
      />
    </div>
  );
};
