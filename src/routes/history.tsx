import { createFileRoute } from '@tanstack/react-router';
import { HistoryScreen } from '@/screens/HistoryScreen';
export const Route = createFileRoute('/history')({
 head: () => ({ meta: [{ title: 'Irrigation History — Field & Sky' }, { name: 'description', content: 'Review water usage and irrigation sessions, filter by field, and export records.' }, { property: 'og:title', content: 'Irrigation History — Field & Sky' }, { property: 'og:description', content: 'Review water usage and irrigation sessions, filter by field, and export records.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: HistoryScreen,
});
