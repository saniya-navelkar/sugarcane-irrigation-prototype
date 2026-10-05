import { createFileRoute } from '@tanstack/react-router';
import { DashboardScreen } from '@/screens/DashboardScreen';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [{ title: 'Sugarcane Irrigation Dashboard — Field & Sky' }, { name: 'description', content: 'Monitor sugarcane plots, moisture trends, and demonstration irrigation advisories.' }, { property: 'og:title', content: 'Sugarcane Irrigation Dashboard — Field & Sky' }, { property: 'og:description', content: 'Monitor sugarcane plots, moisture trends, and demonstration irrigation advisories.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: DashboardScreen,
});
