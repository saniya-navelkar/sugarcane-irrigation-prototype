import { CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast-in">
      <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-panel">
        <CheckCircle2 size={18} />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
