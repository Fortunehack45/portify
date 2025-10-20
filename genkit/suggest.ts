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
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert portfolio template advisor. Given the following project descriptions, suggest portfolio templates that would be visually suitable.

You MUST choose from the following list of available templates:
- Minimal Light
- Modern Dark
- Professional Blue
- Retro Gamer
- Brutalist Web
- Cyberpunk Neon
- Elegant Serif
- Cosmic Dream
- Hacker Terminal
- Craftsman Paper
- Photo Grid
- Lakeside Dawn
- Geometric Dark
- Minimal Serif
- Corporate Clean
- Glassmorphism
- Neobrutalism
- Storybook
- Two Column Image
- Bold and Blue
- Newspaper
- Dark Academia

Project Descriptions:
{{#each projectDescriptions}}
- {{{this}}}
{{/each}}

Output ONLY the names of the templates that you suggest from the list provided.`, 
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
