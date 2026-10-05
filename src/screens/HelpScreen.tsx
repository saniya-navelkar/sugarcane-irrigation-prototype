import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Search, Radio, Droplets, ShieldCheck, BookOpen, HelpCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { faqs } from '@/data/mockData';

const guides = [
  { name: 'Sensor care', icon: Radio, title: 'Keep your readings reliable', intro: 'Good irrigation decisions start with well-maintained sensors.', steps: ['Check that the probe is firmly in contact with the soil.', 'Clean connectors and inspect battery power.', 'Verify weak or stale readings in the field before irrigating.'] },
  { name: 'Irrigation safety', icon: Droplets, title: 'Before starting irrigation', intro: 'A quick field check helps prevent unnecessary water use.', steps: ['Confirm the selected field, water source, and duration.', 'Check for leaks and signs of waterlogging.', 'Pause or stop the session if field conditions change.'] },
  { name: 'Crop guidance', icon: BookOpen, title: 'Understand your sugarcane crop', intro: 'Water needs vary with soil type and the crop’s growth stage.', steps: ['Review the crop stage and moisture trend for your plot.', 'Check local weather before following an advisory.', 'Consult an agronomist for local thresholds and nutrient treatment.'] },
];
export function HelpScreen() {
  const { navigate } = useApp();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(0);
  const [guide, setGuide] = useState(0);
  const active = guides[guide] ?? guides[0];
  const matches = faqs.map((f, i) => ({ f, i })).filter(({ f }) => (f.q + f.a).toLowerCase().includes(query.toLowerCase()));
  if (!active) return null;
  return <div className="page-wrap animate-fade-in">
    <p className="page-eyebrow">Field & Sky · Knowledge centre</p><h1 className="page-title">Help & Support</h1><p className="mt-2 text-sm text-muted-foreground">Practical answers for a healthier crop.</p>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_2fr]">
      <aside><h2 className="section-title">Field guides</h2><div className="mt-4 space-y-2" role="tablist" aria-label="Field guides">{guides.map((g, i) => <Button key={g.name} role="tab" aria-selected={guide === i} aria-controls="field-guide" id={`guide-tab-${i}`} variant={guide === i ? 'default' : 'ghost'} onClick={() => setGuide(i)} className="h-12 w-full justify-start gap-3"><g.icon size={18} />{g.name}<ArrowUpRight className="ml-auto" size={15} /></Button>)}</div>
        <section className="mt-7 border-t border-border pt-6"><div className="flex items-center gap-2"><Layers size={19} className="text-accent" /><h2 className="section-title">Check your field</h2></div><p className="mt-3 text-sm leading-6 text-muted-foreground">Review your plot’s moisture and crop stage before making an irrigation decision.</p><Button variant="outline" className="mt-4" onClick={() => navigate('plots')}>View my plots<ArrowUpRight size={15} /></Button></section>
        <div className="mt-7 flex items-start gap-3 border-t border-border pt-5"><ShieldCheck size={20} className="text-accent" /><p className="text-xs leading-6 text-muted-foreground">Prototype · Sample sensor readings and simulated irrigation. No physical valve is connected.</p></div>
      </aside>
      <div>
        <section id="field-guide" role="tabpanel" aria-labelledby={`guide-tab-${guide}`} className="border-b border-border pb-7"><p className="page-eyebrow">{active.name}</p><h2 className="mt-2 font-heading text-xl font-semibold">{active.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{active.intro}</p><ol className="mt-5 space-y-4">{active.steps.map((step, i) => <li key={step} className="flex items-start gap-3 text-sm leading-6"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-accent">{i + 1}</span>{step}</li>)}</ol></section>
        <section className="mt-7"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="section-title">Frequently asked questions</h2><label className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-card px-3 sm:w-60"><Search size={16} className="text-muted-foreground" /><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" aria-label="Search help" placeholder="Search questions…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
          <div className="divide-y divide-border border-y border-border">{matches.map(({ f, i }) => <div key={f.q}><Button variant="ghost" className="h-auto min-h-16 w-full justify-between gap-4 whitespace-normal px-2 py-4 text-left hover:bg-secondary/40" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="text-sm">{f.q}</span><ChevronDown size={18} className={`transition-transform ${open === i ? 'rotate-180' : ''}`} /></Button>{open === i && <p id={`faq-${i}`} className="animate-fade-in px-2 pb-5 pr-7 text-sm leading-7 text-muted-foreground">{f.a}</p>}</div>)}</div>
          {!matches.length && <div className="py-9 text-center"><HelpCircle size={26} className="mx-auto text-muted-foreground" /><h3 className="mt-3 font-semibold">No matching questions</h3><p className="mt-2 text-sm text-muted-foreground">Try “moisture”, “sensor”, or “irrigation”.</p><Button variant="ghost" className="mt-3" onClick={() => setQuery('')}>Clear search</Button></div>}
        </section>
      </div>
    </div>
  </div>;
}
