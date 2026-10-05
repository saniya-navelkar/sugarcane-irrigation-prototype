import { createFileRoute } from '@tanstack/react-router';
import { RecommendationWhyScreen } from '@/screens/RecommendationWhyScreen';
export const Route = createFileRoute('/recommendation-why')({
 head: () => ({ meta: [{ title: 'Advisory Explanation — Field & Sky' }, { name: 'description', content: 'Explore the moisture, crop stage, and weather factors behind the demonstration advisory.' }, { property: 'og:title', content: 'Advisory Explanation — Field & Sky' }, { property: 'og:description', content: 'Explore the moisture, crop stage, and weather factors behind the demonstration advisory.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: RecommendationWhyScreen,
});
