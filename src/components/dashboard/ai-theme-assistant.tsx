// @/components/dashboard/ai-theme-assistant.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { suggestThemes } from '@/ai/flows/ai-theme-suggestions';
import { Project, Theme } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

interface AiThemeAssistantProps {
  projects: Project[];
  onSelectTheme: (theme: Theme) => void;
}

const validThemes: Record<string, Theme> = {
  'Minimal Light': 'minimal-light',
  'Modern Dark': 'modern-dark',
  'Professional Blue': 'professional-blue',
};

export default function AiThemeAssistant({ projects, onSelectTheme }: AiThemeAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    
    if (projects.length === 0) {
      toast({
        title: 'Add Projects First',
        description: 'Please add at least one project to get theme suggestions.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const projectDescriptions = projects.map(p => p.description);
      const result = await suggestThemes({ projectDescriptions });
      setSuggestions(result.suggestedThemes);
    } catch (error) {
      console.error('AI theme suggestion failed:', error);
      toast({
        title: 'Error',
        description: 'Could not get AI suggestions. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectSuggestion = (themeName: string) => {
    const themeId = Object.entries(validThemes).find(([key]) => themeName.toLowerCase().includes(key.toLowerCase()))?.[1];
    if (themeId) {
      onSelectTheme(themeId);
    } else {
        toast({
            title: "Theme not found",
            description: `Could not apply the suggested theme: "${themeName}"`,
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
            <p className="text-sm font-semibold">AI Recommended Themes:</p>
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
