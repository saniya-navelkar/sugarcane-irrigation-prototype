import { createFileRoute } from '@tanstack/react-router';
import { ChatScreen } from '@/screens/ChatScreen';
export const Route = createFileRoute('/chat')({
 head: () => ({ meta: [{ title: 'Crop Support — Field & Sky' }, { name: 'description', content: 'A demonstration crop support conversation for sugarcane growers.' }, { property: 'og:title', content: 'Crop Support — Field & Sky' }, { property: 'og:description', content: 'A demonstration crop support conversation for sugarcane growers.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: ChatScreen,
});
