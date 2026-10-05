import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useNavigate, useRouter, useRouterState } from '@tanstack/react-router';
import { irrigationHistory, type IrrigationRecord, type ScreenName } from '@/data/mockData';

export const screenPaths = { login: '/', dashboard: '/', plots: '/plots', plotDetails: '/plot-details', recommendation: '/recommendation', recommendationWhy: '/recommendation-why', irrigation: '/irrigation', irrigationSuccess: '/irrigation-summary', history: '/history', help: '/help', chat: '/chat' } as const;
type AppState = { screen: ScreenName; navigate: (screen: ScreenName) => void; goBack: () => void; selectedPlotId: string | null; setSelectedPlotId: (id: string | null) => void; toast: { id: number; message: string } | null; showToast: (message: string) => void; irrigationMinutes: number; setIrrigationMinutes: (n: number) => void; records: IrrigationRecord[]; session: { seconds: number; stopped: boolean } | null; finishSession: (seconds: number, stopped: boolean) => void; saveSession: () => void; };
const AppContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
 const nav = useNavigate(); const router = useRouter();
 const pathname = useRouterState({ select: s => s.location.pathname });
 const screen = (Object.entries(screenPaths).find(([key, path]) => key !== 'login' && path === pathname)?.[0] ?? 'dashboard') as ScreenName;
 const [selectedPlotId, setSelectedPlotId] = useState<string | null>('04');
 const [toast, setToast] = useState<AppState['toast']>(null);
 const [irrigationMinutes, setDuration] = useState(45);
 const [records, setRecords] = useState(irrigationHistory);
 const [session, setSession] = useState<AppState['session']>(null);
 const [saved, setSaved] = useState(false);
 const navigate = useCallback((next: ScreenName) => { void nav({ to: screenPaths[next] }); }, [nav]);
 const goBack = () => { if (router.history.canGoBack()) router.history.back(); else navigate('dashboard'); };
 const showToast = useCallback((message: string) => { const id = Date.now(); setToast({ id, message }); setTimeout(() => setToast(t => t?.id === id ? null : t), 3500); }, []);
 const finishSession = (seconds: number, stopped: boolean) => { setSession({ seconds, stopped }); setSaved(false); navigate('irrigationSuccess'); };
 const saveSession = () => { if (session && !saved) { setRecords(r => [{ id: `demo-${Date.now()}`, date: new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}), plotName: `Plot ${selectedPlotId ?? '04'}`, duration: Number((session.seconds / 60).toFixed(2)), waterUsed: Math.round(session.seconds / 60 * 100) }, ...r]); setSaved(true); showToast('Demo session saved for this visit'); } navigate('history'); };
 return <AppContext.Provider value={{ screen, navigate, goBack, selectedPlotId, setSelectedPlotId, toast, showToast, irrigationMinutes, setIrrigationMinutes: n => setDuration(Math.min(90, Math.max(15, n))), records, session, finishSession, saveSession }}>{children}</AppContext.Provider>;
}
export function useApp() { const ctx = useContext(AppContext); if (!ctx) throw new Error('AppProvider is required'); return ctx; }
