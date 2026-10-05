import { createFileRoute } from '@tanstack/react-router';
import { IrrigationScreen } from '@/screens/IrrigationScreen';
export const Route = createFileRoute('/irrigation')({
 head: () => ({ meta: [{ title: 'Irrigation Simulation — Field & Sky' }, { name: 'description', content: 'Run, pause, and stop a simulated irrigation session.' }, { property: 'og:title', content: 'Irrigation Simulation — Field & Sky' }, { property: 'og:description', content: 'Run, pause, and stop a simulated irrigation session.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: IrrigationScreen,
});
