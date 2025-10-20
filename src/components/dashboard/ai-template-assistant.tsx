'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import type { Project, Template } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

interface AiTemplateAssistantProps {
  projects: Project[];
  onSelectTemplate: (template: Template) => void;
}

const validTemplates: Record<string, Template> = {
  'Minimal Light': 'minimal-light',
  'Modern Dark': 'modern-dark',
  'Professional Blue': 'professional-blue',
  'Retro Gamer': 'retro-gamer',
  'Brutalist Web': 'brutalist-web',
  'Cyberpunk Neon': 'cyberpunk-neon',
  'Elegant Serif': 'elegant-serif',
  'Cosmic Dream': 'cosmic-dream',
  'Hacker Terminal': 'hacker-terminal',
  'Craftsman Paper': 'craftsman-paper',
  'Photo Grid': 'photo-grid',
  'Lakeside Dawn': 'lakeside-dawn',
  'Geometric Dark': 'geometric-dark',
  'Minimal Serif': 'minimal-serif',
  'Corporate Clean': 'corporate-clean',
  'Glassmorphism': 'glassmorphism',
  'Neobrutalism': 'neobrutalism',
  'Storybook': 'storybook',
  'Two Column Image': 'two-column-image',
  'Bold and Blue': 'bold-and-blue',
  'Newspaper': 'newspaper',
  'Dark Academia': 'dark-academia',
};

async function suggestTemplates(input: { projectDescriptions: string[] }): Promise<{ suggestedTemplates: string[] }> {
  const response = await fetch('/api/genkit/suggestTemplates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch AI suggestions');
  }

  return response.json();
}

export default function AiTemplateAssistant({ projects, onSelectTemplate }: AiTemplateAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    
    if (projects.length === 0) {
      toast({
        title: 'Add Projects First',
        description: 'Please add at least one project to get template suggestions.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const projectDescriptions = projects.map(p => p.description);
      const result = await suggestTemplates({ projectDescriptions });
      setSuggestions(result.suggestedTemplates);
    } catch (error) {
      console.error('AI template suggestion failed:', error);
      toast({
        title: 'Error',
        description: 'Could not get AI suggestions. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectSuggestion = (templateName: string) => {
    const templateId = Object.entries(validTemplates).find(([key]) => templateName.toLowerCase().includes(key.toLowerCase()))?.[1];
    if (templateId) {
      onSelectTemplate(templateId);
    } else {
        toast({
            title: "Template not found",
            description: `Could not apply the suggested template: "${templateName}"`,
            variant: "destructive"
        })
    }
  }

  return (
    <div className="space-y-4 pt-4 border-t">
       <div className="flex items-center justify-between">
         <p className="text-sm font-medium">Need help choosing?</p>
        <Button variant="outline" size="sm" onClick={handleGetSuggestions} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Get AI Suggestions
        </Button>
       </div>

      {suggestions.length > 0 && (
        <Card className="bg-secondary/50">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm font-semibold">AI Recommended Templates:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button key={index} size="sm" variant="secondary" onClick={() => handleSelectSuggestion(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
