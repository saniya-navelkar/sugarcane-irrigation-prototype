import { createFileRoute } from '@tanstack/react-router';
import { HelpScreen } from '@/screens/HelpScreen';
export const Route = createFileRoute('/help')({
 head: () => ({ meta: [{ title: 'Help & Support — Field & Sky' }, { name: 'description', content: 'Find sensor care, irrigation safety, and sugarcane guidance.' }, { property: 'og:title', content: 'Help & Support — Field & Sky' }, { property: 'og:description', content: 'Find sensor care, irrigation safety, and sugarcane guidance.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: HelpScreen,
});
