import { Droplets, Cloud, Wheat, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { plots } from '@/data/mockData';
import { TopBar } from '@/components/TopBar';

const factors = [
  { icon: Droplets, label: 'Soil Moisture', value: 'Low (32%)', color: 'text-destructive', bg: 'bg-destructive/10', iconBg: 'bg-destructive' },
  { icon: Cloud, label: 'Weather', value: 'No rain expected', color: 'text-warning-foreground', bg: 'bg-warning/10', iconBg: 'bg-warning' },
  { icon: Wheat, label: 'Crop Stage', value: 'Grand Growth, high water need', color: 'text-accent', bg: 'bg-secondary', iconBg: 'bg-accent' },
  { icon: Clock, label: 'Last Irrigation', value: '8 days ago', color: 'text-chart-3', bg: 'bg-muted', iconBg: 'bg-muted' },
];

export function RecommendationWhyScreen() {
  const { selectedPlotId } = useApp();
  const plot = plots.find(p => p.id === selectedPlotId) ?? plots[3];
  const explanation = `Plot ${plot?.id}: soil moisture is ${plot?.moisture}%. ${plot?.status === 'required' ? 'Below the 40% threshold; irrigation is recommended.' : plot?.status === 'soon' ? 'Monitor moisture; irrigation may be needed soon.' : 'Moisture is healthy; irrigation is not required.'} Crop stage: ${plot?.stage}. Weather values are illustrative; verify actual forecasts before irrigating.`;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-4 max-w-4xl mx-auto">
      <TopBar title="Why This Recommendation?" showBack />
      <div className="space-y-4 animate-fade-in">
        {/* Explanation */}
        <div className="bg-card rounded-lg p-4 shadow-panel">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Factor cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {factors.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-card rounded-lg p-4 flex flex-col items-center gap-2 shadow-panel animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`w-10 h-10 rounded-full ${f.iconBg} flex items-center justify-center`}>
                  <Icon size={18} className="text-primary-foreground" />
                </div>
                <p className="text-xs text-muted-foreground text-center">{f.label}</p>
                <p className={`text-xs font-semibold text-center ${f.color}`}>{f.label === 'Soil Moisture' ? `${plot?.moisture}%` : f.label === 'Crop Stage' ? plot?.stage : f.value}</p>
              </div>
            );
          })}
        </div>

        {/* Confidence indicator */}
        <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={20} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">Demo advisory factors</p>
            <p className="text-xs text-accent">Requires field validation</p>
          </div>
          <div className="flex gap-1">
            {[1, 1, 1, 1].map((_, i) => (
              <div key={i} className="w-2 h-6 rounded-full bg-accent" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
