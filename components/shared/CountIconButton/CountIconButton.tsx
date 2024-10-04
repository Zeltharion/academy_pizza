import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { ICountIconButton } from './CountIconButton.types';
import s from './CountIconButton.module.scss'

export const CountIconButton: React.FC<ICountIconButton> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(s.countIconButton, size === 'sm' ? s.countIconButton__sm : s.countIconButton__lg)}>
      {type === 'plus' ? (
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
