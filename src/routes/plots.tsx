import { createFileRoute } from '@tanstack/react-router';
import { MyPlotsScreen } from '@/screens/MyPlotsScreen';
export const Route = createFileRoute('/plots')({
 head: () => ({ meta: [{ title: 'My Plots — Field & Sky' }, { name: 'description', content: 'Inspect four sugarcane fields, soil moisture trends, and irrigation priorities.' }, { property: 'og:title', content: 'My Plots — Field & Sky' }, { property: 'og:description', content: 'Inspect four sugarcane fields, soil moisture trends, and irrigation priorities.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: MyPlotsScreen,
});
