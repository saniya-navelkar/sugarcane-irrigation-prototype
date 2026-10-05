import { useState } from 'react';
import { Activity, AlertTriangle, Check, ChevronRight, Clock3, CloudSun, Droplets, Gauge, MessageCircle, Radio, SlidersHorizontal, Waves } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { plots } from '@/data/mockData';
import fieldAerial from '@/assets/sugarcane-field-aerial.jpg';

const sensorStates = [
  { plot: '04', strength: 82, state: 'Live', detail: 'Signal strong · 12s ago', tone: 'bg-accent' },
  { plot: '02', strength: 76, state: 'Live', detail: 'Signal strong · 18s ago', tone: 'bg-accent' },
  { plot: '03', strength: 41, state: 'Weak', detail: 'Signal weak · 4 min ago', tone: 'bg-warning' },
  { plot: '01', strength: 22, state: 'Stale', detail: 'Last seen 22 min ago', tone: 'bg-destructive' },
];

export function DashboardScreen() {
  const { navigate, setSelectedPlotId, selectedPlotId, irrigationMinutes, setIrrigationMinutes, showToast } = useApp();
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const selected = plots.find((plot) => plot.id === selectedPlotId) ?? plots.find((plot) => plot.id === '04');
  const waterLitres = irrigationMinutes * 100;

  const openPlot = (id: string) => {
    setSelectedPlotId(id);
    navigate('plotDetails');
  };

  if (!selected) return null;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      <main className="flex-1 p-4 lg:overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <section className="rounded-lg bg-primary p-5 text-primary-foreground lg:col-span-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60"><AlertTriangle size={12} /> Urgent irrigation task</p>
                <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">Plot 04 needs water now</h1>
                <p className="mt-1 max-w-xl text-sm text-primary-foreground/70">Soil moisture 32% · critical threshold 40% · no rain expected for 6 days.</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Recommended</p>
                <p className="font-heading text-xl font-semibold">{irrigationMinutes} min · {waterLitres.toLocaleString()} L</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              {[['Soil moisture','32%'],['Water volume',`${waterLitres.toLocaleString()} L`],['Duration',`${irrigationMinutes} min`],['Confidence','92%']].map(([label,value]) => (
                <div key={label} className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/10 p-3"><p className="text-primary-foreground/60">{label}</p><p className="mt-0.5 font-heading text-lg font-semibold">{value}</p></div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => { setSelectedPlotId('04'); navigate('irrigation'); }} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Waves size={16}/>Start irrigation</Button>
              <Button onClick={() => { setSelectedPlotId('04'); navigate('recommendationWhy'); }} className="border border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">Explain recommendation</Button>
              <Button onClick={() => setShowAdjust(true)} className="bg-transparent px-2 text-primary-foreground/80 hover:bg-primary-foreground/10"><SlidersHorizontal size={15}/>Adjust duration</Button>
            </div>
          </section>

          <section className="panel lg:col-span-5">
            <div className="panel-heading"><h2>Field overview</h2><span>4 plots · 9 acres</span></div>
            <div className="relative overflow-hidden rounded-lg border border-border">
              <img src={fieldAerial} alt="Aerial view of four sugarcane plots" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
              <button onClick={() => openPlot('04')} aria-label="Open Plot 04" className="absolute bottom-[18%] right-[18%] rounded-md bg-destructive px-2 py-1 text-[10px] font-bold text-destructive-foreground shadow-panel">04 · 32%</button>
              <button onClick={() => openPlot('02')} aria-label="Open Plot 02" className="absolute right-[18%] top-[18%] rounded-md bg-warning px-2 py-1 text-[10px] font-bold text-accent-foreground shadow-panel">02 · 45%</button>
              <button onClick={() => openPlot('01')} aria-label="Open Plot 01" className="absolute bottom-[18%] left-[18%] rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground shadow-panel">01 · 68%</button>
              <button onClick={() => openPlot('03')} aria-label="Open Plot 03" className="absolute left-[18%] top-[18%] rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground shadow-panel">03 · 72%</button>
            </div>
            <div className="mt-3 flex gap-4 text-[11px] font-semibold"><span className="status-key"><i className="bg-accent"/>Healthy</span><span className="status-key"><i className="bg-warning"/>Monitor</span><span className="status-key"><i className="bg-destructive"/>Critical</span></div>
          </section>

          <section id="selected-field-status" aria-labelledby="selected-field-heading" className="panel lg:col-span-7">
            <div className="panel-heading"><h2 id="selected-field-heading">{selected.name}</h2><span aria-live="polite">{selected.moisture}% moisture · {selected.stage}</span></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {plots.map((plot) => {
                const critical = plot.status === 'required';
                const watch = plot.status === 'soon';
                return <button key={plot.id} onClick={() => openPlot(plot.id)} className={`rounded-lg border bg-card p-3 text-left transition-colors hover:bg-secondary ${critical ? 'border-destructive/30' : 'border-border'}`}>
                  <div className="flex items-center justify-between"><span className="font-heading text-sm font-semibold">Plot {plot.id}</span><span className={`text-[10px] font-bold uppercase ${critical ? 'text-destructive' : watch ? 'text-warning-foreground' : 'text-accent'}`}>{critical ? 'Critical' : watch ? 'Monitor' : 'Healthy'}</span></div>
                  <p className="mt-1 text-xs text-muted-foreground">{plot.stage} · {plot.area} acres</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"><div className={`h-full rounded-full ${critical ? 'bg-destructive' : watch ? 'bg-warning' : 'bg-accent'}`} style={{ width: `${plot.moisture}%` }}/></div>
                  <div className="mt-2 flex items-center justify-between text-[11px]"><span className="text-muted-foreground">Soil moisture</span><strong>{plot.moisture}%</strong></div>
                </button>;
              })}
            </div>
          </section>

          <section className="panel lg:col-span-4">
            <div className="panel-heading"><h2>Sensor telemetry</h2><Radio size={14}/></div>
            <div className="space-y-3">
              {sensorStates.map((sensor) => <div key={sensor.plot}>
                <div className="flex items-center justify-between text-xs"><strong>Plot {sensor.plot} soil probe</strong><span className="text-[10px] font-bold uppercase text-muted-foreground">{sensor.state}</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border"><div className={`h-full rounded-full ${sensor.tone}`} style={{width:`${sensor.strength}%`}}/></div>
                <p className="mt-1 text-[11px] text-muted-foreground">{sensor.detail}</p>
              </div>)}
            </div>
          </section>

          <section className="panel lg:col-span-4">
            <div className="panel-heading"><h2>Weather</h2><CloudSun size={15}/></div>
            <div className="flex gap-5">
              <div><p className="font-heading text-3xl font-semibold">32°</p><p className="text-[11px] text-muted-foreground">Partly cloudy</p></div>
              <dl className="flex-1 space-y-2 text-xs">{[['Humidity','45%'],['Rain chance','10%'],['Evaporation','High'],['Water source','Borewell']].map(([k,v]) => <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
            </div>
          </section>

          <section className="panel lg:col-span-4">
            <div className="panel-heading"><h2>Alerts</h2><button onClick={() => setShowAlerts(true)} className="text-[11px] font-semibold text-accent">3 open</button></div>
            <ul className="space-y-3 text-xs"><li className="alert-line"><i className="bg-destructive"/>Plot 04 moisture below critical threshold.</li><li className="alert-line"><i className="bg-warning"/>Plot 02 irrigation window approaching.</li><li className="alert-line"><i className="bg-accent"/>Plot 01 moisture level healthy.</li></ul>
            <Button variant="secondary" className="mt-4 w-full" onClick={() => setShowAlerts(true)}>Open notifications</Button>
          </section>
        </div>
      </main>

      <aside className="w-full border-t border-border bg-secondary/60 p-4 md:w-[300px] md:border-l md:border-t-0">
        <div className="space-y-3 md:sticky md:top-[4.5rem]">
          <div className="rail-card"><p className="rail-label">Field selection</p><div className="space-y-1" role="group" aria-label="Field selection">{plots.map((plot) => <Button key={plot.id} variant="ghost" aria-pressed={selected.id === plot.id} aria-controls="selected-field-status" onClick={() => setSelectedPlotId(plot.id)} className={`flex h-9 w-full items-center justify-start rounded-lg px-2.5 text-xs font-semibold ${selected.id === plot.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary'}`}><span>Plot {plot.id}</span><span className={`ml-auto ${plot.status === 'required' ? 'text-destructive' : ''}`}>{plot.moisture}%</span></Button>)}</div></div>
          <div className="rail-card"><p className="rail-label">Irrigation action</p><Button className="w-full" onClick={() => { setSelectedPlotId(selected.id); navigate('irrigation'); }}><Droplets size={15}/>Execute {irrigationMinutes} min</Button><Button variant="secondary" className="mt-2 w-full" onClick={() => showToast('Demo schedule selected: 6:00 AM — no automatic valve activation')}><Clock3 size={15}/>Schedule for later</Button></div>
          <div className="rail-card"><p className="rail-label">Support</p><Button variant="secondary" className="w-full" onClick={() => navigate('chat')}><MessageCircle size={15}/>Ask agronomist</Button><Button variant="ghost" className="mt-1 w-full" onClick={() => openPlot(selected.id)}>Open field details<ChevronRight size={15}/></Button></div>
          <div className="rail-card text-xs text-muted-foreground"><div className="flex justify-between"><span>System</span><span className="flex items-center gap-1 font-semibold text-accent"><Check size={13}/>Online</span></div><div className="mt-2 flex justify-between"><span>Last sync</span><span>4 min ago</span></div></div>
        </div>
      </aside>

      {showAdjust && <div className="modal-shell"><button className="modal-backdrop" onClick={() => setShowAdjust(false)} aria-label="Close duration settings"/><div className="modal-card"><div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Adjust irrigation</h2><Gauge size={20}/></div><p className="mt-1 text-sm text-muted-foreground">Set the run time for Plot 04.</p><div className="mt-5 flex items-end justify-between"><span className="font-heading text-4xl font-semibold">{irrigationMinutes}</span><span className="text-sm text-muted-foreground">minutes · {waterLitres.toLocaleString()} L</span></div><input aria-label="Irrigation duration" type="range" min="15" max="90" step="5" value={irrigationMinutes} onChange={(event) => setIrrigationMinutes(Number(event.target.value))} className="mt-5 w-full accent-primary"/><div className="mt-5 flex gap-2"><Button className="flex-1" onClick={() => { setShowAdjust(false); showToast(`Duration updated to ${irrigationMinutes} minutes`); }}>Save duration</Button><Button variant="secondary" onClick={() => setShowAdjust(false)}>Cancel</Button></div></div></div>}
      {showAlerts && <div className="modal-shell"><button className="modal-backdrop" onClick={() => setShowAlerts(false)} aria-label="Close alerts"/><div className="modal-card"><div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Field notifications</h2><Activity size={20}/></div><div className="mt-4 space-y-2"><button onClick={() => { setShowAlerts(false); openPlot('04'); }} className="notification-row"><AlertTriangle className="text-destructive" size={17}/><span><strong>Plot 04 needs irrigation</strong><small>Moisture fell to 32% · 2 min ago</small></span></button><button onClick={() => { setShowAlerts(false); openPlot('02'); }} className="notification-row"><Clock3 className="text-warning-foreground" size={17}/><span><strong>Plot 02 irrigation soon</strong><small>Recommended within 24 hours</small></span></button></div><Button variant="secondary" className="mt-4 w-full" onClick={() => { setShowAlerts(false); showToast('Notifications marked as read'); }}>Mark all as read</Button></div></div>}
    </div>
  );
}