import { MapPin, Sun, Cloud, Droplets, Calendar, Sprout, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TopBar } from '@/components/TopBar';
import { MoistureGauge } from '@/components/MoistureGauge';
import { MiniLineChart } from '@/components/MiniLineChart';
import { plots } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export function PlotDetailsScreen() {
  const { selectedPlotId, navigate } = useApp();
  const plot = plots.find((p) => p.id === selectedPlotId) ?? plots.find((p) => p.id === '04');

  if (!plot) return null;

  const infoRows = [
    { icon: MapPin, label: 'Area', value: `${plot.area} acres` },
    { icon: Sun, label: 'Soil Type', value: plot.soilType },
    { icon: Sprout, label: 'Variety', value: plot.variety },
    { icon: Calendar, label: 'Planted', value: plot.plantingDate },
    { icon: Calendar, label: 'Stage', value: `${plot.stage} (Day ${plot.stageDay})` },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-4 max-w-7xl mx-auto">
      <TopBar title={`Plot ${plot.id}`} showBack />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
        {/* Left column: gauge + chart */}
        <div className="space-y-4">
          {/* Plot header card */}
          <div className="rounded-lg bg-primary p-4 text-primary-foreground shadow-panel">
            <p className="font-heading text-base font-semibold">{plot.name}</p>
            <p className="mt-1 text-xs text-primary-foreground/70">{plot.stage} · Day {plot.stageDay}</p>
          </div>

          {/* Moisture gauge */}
          <div className="panel flex flex-col items-center">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Soil Moisture</p>
            <MoistureGauge value={plot.moisture} size={110} />
          </div>

          {/* 7-day moisture chart */}
          <div className="panel">
            <p className="mb-2 text-xs font-medium text-muted-foreground">7-Day Moisture Trend</p>
            <div className="flex justify-center">
              <MiniLineChart data={plot.moistureHistory} width={280} height={70} />
            </div>
            <div className="flex justify-between mt-1 px-1">
              {['7d', '6d', '5d', '4d', '3d', '2d', 'Now'].map((d) => (
                <span key={d} className="text-[9px] text-muted-foreground">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: info + weather + recommendation */}
        <div className="lg:col-span-2 space-y-4">
          {/* Info grid */}
          <div className="bg-card rounded-lg p-4 shadow-panel">
            <p className="text-sm font-semibold text-foreground mb-3">Plot Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{row.label}</p>
                      <p className="text-sm font-semibold text-foreground truncate">{row.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weather summary */}
          <div className="bg-card rounded-lg p-4 shadow-panel">
            <p className="text-sm font-semibold text-foreground mb-3">Weather Summary</p>
            <div className="flex items-center justify-around">
              <div className="flex flex-col items-center gap-1">
                <Sun size={28} className="text-warning-foreground" />
                <span className="text-sm font-semibold text-foreground">32°C</span>
                <span className="text-[10px] text-muted-foreground">Sunny</span>
              </div>
              <div className="w-px h-12 bg-muted" />
              <div className="flex flex-col items-center gap-1">
                <Cloud size={28} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">10%</span>
                <span className="text-[10px] text-muted-foreground">Rain chance</span>
              </div>
              <div className="w-px h-12 bg-muted" />
              <div className="flex flex-col items-center gap-1">
                <Droplets size={28} className="text-chart-3" />
                <span className="text-sm font-semibold text-foreground">45%</span>
                <span className="text-[10px] text-muted-foreground">Humidity</span>
              </div>
            </div>
          </div>

          {/* AI Recommendation button */}
          <Button
            onClick={() => navigate('recommendation')}
            className="w-full"
          >
            Get AI Recommendation
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
