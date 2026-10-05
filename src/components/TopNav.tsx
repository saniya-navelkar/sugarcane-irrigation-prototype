import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Home, Layers, History, HelpCircle, Bell, Menu, X, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
const items = [{ path:'/', label:'Dashboard', icon:Home }, { path:'/plots', label:'My Plots', icon:Layers }, { path:'/history', label:'History', icon:History }, { path:'/help', label:'Help & Support', icon:HelpCircle }] as const;
export function TopNav() {
 const [open,setOpen]=useState(false); const {navigate,showToast}=useApp();
 return <header className="sticky top-0 z-50 border-b border-border bg-secondary/95 backdrop-blur-sm"><div className="flex h-14 items-center gap-4 px-4">
 <Link to="/" className="flex shrink-0 items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Sprout size={18}/></span><span className="font-heading text-sm font-semibold">Field &amp; Sky</span></Link>
 <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">{items.map(i=><Link key={i.path} to={i.path} activeOptions={{exact:true}} activeProps={{className:'bg-primary text-primary-foreground'}} inactiveProps={{className:'text-muted-foreground hover:bg-background'}} className="flex h-8 items-center gap-2 rounded-md px-3 text-xs font-semibold"><i.icon size={16}/>{i.label}</Link>)}</nav>
 <div className="ml-auto flex items-center gap-2"><span className="hidden text-[10px] font-semibold text-muted-foreground sm:block">KJS-AGR-01 · DEMO DATA</span><Button variant="outline" size="icon" title="Field alerts" aria-label="Open alerts" onClick={()=>{navigate('dashboard');showToast('Plot 04: critical moisture · Plot 02: irrigation soon');}}><Bell size={16}/></Button><Button className="md:hidden" variant="ghost" size="icon" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</Button></div></div>
 {open&&<nav aria-label="Mobile navigation" className="grid gap-1 border-t border-border p-3 md:hidden">{items.map(i=><Link key={i.path} to={i.path} onClick={()=>setOpen(false)} className="flex items-center gap-3 rounded-md p-3 text-sm" activeProps={{className:'bg-primary text-primary-foreground'}}><i.icon size={18}/>{i.label}</Link>)}</nav>}</header>;
}
