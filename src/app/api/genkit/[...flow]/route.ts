import { createApiRoute } from '@genkit-ai/next';
import '@/ai/flows/ai-template-suggestions'; // Make sure flows are loaded

export const POST = createApiRoute();
