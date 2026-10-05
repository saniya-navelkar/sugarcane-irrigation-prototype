import { createFileRoute } from '@tanstack/react-router';
import { RecommendationScreen } from '@/screens/RecommendationScreen';
export const Route = createFileRoute('/recommendation')({
 head: () => ({ meta: [{ title: 'Irrigation Recommendation — Field & Sky' }, { name: 'description', content: 'Review an illustrative irrigation recommendation for your selected sugarcane field.' }, { property: 'og:title', content: 'Irrigation Recommendation — Field & Sky' }, { property: 'og:description', content: 'Review an illustrative irrigation recommendation for your selected sugarcane field.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: RecommendationScreen,
});
