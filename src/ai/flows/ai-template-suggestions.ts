'use server';

/**
 * @fileOverview A template suggestion AI agent.
 *
 * - suggestTemplates - A function that suggests templates based on project descriptions.
 * - TemplateSuggestionInput - The input type for the suggestTemplates function.
 * - TemplateSuggestionOutput - The return type for the suggestTemplates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TemplateSuggestionInputSchema = z.object({
  projectDescriptions: z
    .array(z.string())
    .describe('An array of project descriptions.'),
});
export type TemplateSuggestionInput = z.infer<typeof TemplateSuggestionInputSchema>;

const TemplateSuggestionOutputSchema = z.object({
  suggestedTemplates: z
    .array(z.string())
    .describe('An array of suggested templates based on the project descriptions.'),
});
export type TemplateSuggestionOutput = z.infer<typeof TemplateSuggestionOutputSchema>;


const prompt = ai.definePrompt({
  name: 'templateSuggestionPrompt',
  input: {schema: TemplateSuggestionInputSchema},
  output: {schema: TemplateSuggestionOutputSchema},
  prompt: `You are an expert portfolio template advisor. Given the following project descriptions, suggest portfolio templates that would be visually suitable.  You MUST pick templates that match the overall style of the projects.

Project Descriptions:
{{#each projectDescriptions}}
- {{{this}}}
{{/each}}

Output the names of the templates that you suggest.`, 
});

export const suggestTemplatesFlow = ai.defineFlow(
  {
    name: 'suggestTemplatesFlow',
    inputSchema: TemplateSuggestionInputSchema,
    outputSchema: TemplateSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


// Wrapper function for client-side invocation
export async function suggestTemplates(input: TemplateSuggestionInput): Promise<TemplateSuggestionOutput> {
  // In a real app, you might call your API endpoint here,
  // but for simplicity, we're calling the flow directly.
  // This will only work if the client and server are the same deployment.
  return suggestTemplatesFlow(input);
}
