import { AlertTriangle, Clock, Calendar, Droplets, HelpCircle, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TopBar } from '@/components/TopBar';
import { plots } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export function RecommendationScreen() {
  const { navigate, irrigationMinutes, selectedPlotId } = useApp();
  const plot = plots.find(p => p.id === selectedPlotId) ?? plots[3];
  const required = plot?.status === 'required';
  const details = [
    { icon: Clock, label: 'Recommended duration', value: `${irrigationMinutes} minutes` },
    { icon: Calendar, label: 'Best time', value: '6:00 AM start' },
    { icon: Droplets, label: 'Estimated water', value: `${(irrigationMinutes * 100).toLocaleString()} L` },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-4 max-w-4xl mx-auto">
      <TopBar title="AI Recommendation" showBack />
      <div className="space-y-4 animate-fade-in">
        {/* Status card */}
        <div className="rounded-lg bg-destructive p-4 text-destructive-foreground shadow-panel">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-destructive-foreground/15">
              <AlertTriangle size={22} />
            </div>
            <div>
              <p className="font-heading text-lg font-semibold">{required ? "Irrigation required today" : plot?.status === "soon" ? "Monitor moisture closely" : "Irrigation not required"}</p>
              <p className="text-xs text-destructive-foreground/70">{plot?.name}</p>
            </div>
          </div>
        </div>

        {/* Recommendation details */}
        <div className="panel">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {details.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="grid size-10 flex-shrink-0 place-items-center rounded-lg bg-secondary">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-bold text-foreground">{d.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why button */}
        <Button
          variant="secondary"
          onClick={() => navigate('recommendationWhy')}
          className="w-full"
        >
          <HelpCircle size={18} />
          Why this recommendation?
        </Button>

        {/* Action buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Button
            disabled={!required} onClick={() => navigate('irrigation')}
            className="h-11"
          >
            <Play size={18} />
            Start Irrigation
          </Button>
        </div>
      </div>

    </div>
  );
}
