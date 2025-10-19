'use server';

/**
 * @fileOverview A theme suggestion AI agent.
 *
 * - suggestThemes - A function that suggests themes based on project descriptions.
 * - ThemeSuggestionInput - The input type for the suggestThemes function.
 * - ThemeSuggestionOutput - The return type for the suggestThemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThemeSuggestionInputSchema = z.object({
  projectDescriptions: z
    .array(z.string())
    .describe('An array of project descriptions.'),
});
export type ThemeSuggestionInput = z.infer<typeof ThemeSuggestionInputSchema>;

const ThemeSuggestionOutputSchema = z.object({
  suggestedThemes: z
    .array(z.string())
    .describe('An array of suggested themes based on the project descriptions.'),
});
export type ThemeSuggestionOutput = z.infer<typeof ThemeSuggestionOutputSchema>;

export async function suggestThemes(input: ThemeSuggestionInput): Promise<ThemeSuggestionOutput> {
  return suggestThemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'themeSuggestionPrompt',
  input: {schema: ThemeSuggestionInputSchema},
  output: {schema: ThemeSuggestionOutputSchema},
  prompt: `You are an expert portfolio theme advisor. Given the following project descriptions, suggest portfolio themes that would be visually suitable.  You MUST pick themes that match the overall style of the projects.

Project Descriptions:
{{#each projectDescriptions}}
- {{{this}}}
{{/each}}

Output the names of the themes that you suggest.`, 
});

const suggestThemesFlow = ai.defineFlow(
  {
    name: 'suggestThemesFlow',
    inputSchema: ThemeSuggestionInputSchema,
    outputSchema: ThemeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
