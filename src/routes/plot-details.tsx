import { createFileRoute } from '@tanstack/react-router';
import { PlotDetailsScreen } from '@/screens/PlotDetailsScreen';
export const Route = createFileRoute('/plot-details')({
 head: () => ({ meta: [{ title: 'Field Details — Field & Sky' }, { name: 'description', content: 'Review soil, crop stage, and soil moisture measurements for your selected field.' }, { property: 'og:title', content: 'Field Details — Field & Sky' }, { property: 'og:description', content: 'Review soil, crop stage, and soil moisture measurements for your selected field.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: PlotDetailsScreen,
});
