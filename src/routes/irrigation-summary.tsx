import { createFileRoute } from '@tanstack/react-router';
import { IrrigationSuccessScreen } from '@/screens/IrrigationSuccessScreen';
export const Route = createFileRoute('/irrigation-summary')({
 head: () => ({ meta: [{ title: 'Irrigation Summary — Field & Sky' }, { name: 'description', content: 'Review elapsed time and estimated water use for a simulated session.' }, { property: 'og:title', content: 'Irrigation Summary — Field & Sky' }, { property: 'og:description', content: 'Review elapsed time and estimated water use for a simulated session.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: IrrigationSuccessScreen,
});
