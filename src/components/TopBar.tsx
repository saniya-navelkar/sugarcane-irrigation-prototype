import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ReactNode } from 'react';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  rightSlot?: ReactNode;
}

export function TopBar({ title, showBack = false, rightSlot }: TopBarProps) {
  const { goBack } = useApp();
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={goBack}
            className="grid size-9 place-items-center rounded-lg border border-border bg-card hover:bg-secondary"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
        )}
        <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
      </div>
      {rightSlot}
    </div>
  );
}
