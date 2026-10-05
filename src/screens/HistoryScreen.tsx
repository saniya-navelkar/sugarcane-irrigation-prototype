import { useState } from 'react';
import { Download, Droplets, Clock, CalendarDays, Activity, CheckCircle2, History, ArrowUpRight, Gauge, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const PLOTS = ['Plot 01', 'Plot 02', 'Plot 03', 'Plot 04'];

export function HistoryScreen() {
  const { records, navigate } = useApp();
  const [filter, setFilter] = useState('All plots');
  const filtered = records.filter(r => filter === 'All plots' || r.plotName === filter);
  const total = filtered.reduce((n, r) => n + r.waterUsed, 0);
  const minutes = filtered.reduce((n, r) => n + r.duration, 0);
  const avg = filtered.length ? Math.round(total / filtered.length) : 0;
  const fields = PLOTS.map(name => {
    const rs = records.filter(r => r.plotName === name);
    return { name, water: rs.reduce((n, r) => n + r.waterUsed, 0), sessions: rs.length };
  });
  const max = Math.max(...fields.map(f => f.water), 1);
  const grand = fields.reduce((n, f) => n + f.water, 0) || 1;

  const exportCsv = () => {
    const csv = 'Date,Plot,Duration (min),Water (L)\n' + filtered.map(r => `${r.date},${r.plotName},${r.duration},${r.waterUsed}`).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a'); a.href = url; a.download = 'irrigation-history.csv'; a.click(); URL.revokeObjectURL(url);
  };

  const stats = [
    { label: 'Total water used', value: `${total.toLocaleString()} L`, icon: Droplets },
    { label: 'Total irrigation time', value: `${Number(minutes.toFixed(2))} min`, icon: Clock },
    { label: 'Sessions recorded', value: String(filtered.length), icon: Activity },
    { label: 'Average per session', value: `${avg.toLocaleString()} L`, icon: Gauge },
  ];

  return (
    <div className="page-wrap animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="page-eyebrow">Water management · Activity log</p>
          <h1 className="page-title">Irrigation History</h1>
          <p className="mt-2 text-sm text-muted-foreground">Every irrigation session across your fields, in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('plots')}>View plots<ArrowUpRight size={15} /></Button>
          <Button disabled={!filtered.length} onClick={exportCsv}><Download size={16} />Export CSV</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <span className="grid size-8 place-items-center rounded-md bg-secondary text-accent"><s.icon size={16} /></span>
            </div>
            <p className="mt-3 font-heading text-3xl font-semibold tabular-nums">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{filter}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-[1fr_320px] gap-6">
        {/* Session log */}
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
            <div>
              <h2 className="section-title">Session log</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'session' : 'sessions'} · newest first</p>
            </div>
            <div className="flex rounded-lg bg-secondary p-1" role="group" aria-label="Filter history by plot">
              {['All plots', ...PLOTS].map(f => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${filter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {f === 'All plots' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Field</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Water used</th>
                  <th scope="col" className="px-6 py-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(r => (
                  <tr key={r.id} className="transition-colors hover:bg-secondary/40">
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-muted-foreground"><CalendarDays size={14} />{r.date}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <span className="grid size-7 place-items-center rounded-md bg-secondary text-[11px] font-bold text-accent">{r.plotName.slice(-2)}</span>
                        {r.plotName}
                      </span>
                    </td>
                    <td className="px-4 py-4 tabular-nums text-muted-foreground">{r.duration} min</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-16 font-semibold tabular-nums">{r.waterUsed.toLocaleString()} L</span>
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <span className="block h-full rounded-full bg-accent" style={{ width: `${Math.min(100, (r.waterUsed / 5000) * 100)}%` }} />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-accent"><CheckCircle2 size={12} />Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground"><History size={22} /></span>
              <h3 className="font-semibold">No sessions yet</h3>
              <p className="text-sm text-muted-foreground">No irrigation has been recorded for {filter}.</p>
              <Button variant="outline" onClick={() => setFilter('All plots')}>Show all plots</Button>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="section-title">Water by field</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Click a field to filter the log</p>
            <div className="mt-5 space-y-2">
              {fields.map(f => (
                <button
                  key={f.name}
                  type="button"
                  aria-pressed={filter === f.name}
                  onClick={() => setFilter(filter === f.name ? 'All plots' : f.name)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${filter === f.name ? 'border-accent bg-secondary' : 'border-transparent hover:bg-secondary/50'}`}
                >
                  <span className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold">{f.name}</span>
                    <span className="tabular-nums text-muted-foreground">{f.water.toLocaleString()} L</span>
                  </span>
                  <span className="mt-2 block h-2 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-accent transition-all" style={{ width: `${(f.water / max) * 100}%` }} />
                  </span>
                  <span className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                    <span>{f.sessions} {f.sessions === 1 ? 'session' : 'sessions'}</span>
                    <span>{Math.round((f.water / grand) * 100)}% of total</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-xs leading-5 text-muted-foreground">These are sample records. New demo sessions you save are added here for this visit only.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
