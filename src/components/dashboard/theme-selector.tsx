'use client';

import { Theme, Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AiThemeAssistant from './ai-theme-assistant';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  projects: Project[];
}

const themeOptions: { value: Theme; label: string }[] = [
    { value: 'minimal-light', label: 'Minimal Light' },
    { value: 'modern-dark', label: 'Modern Dark' },
    { value: 'professional-blue', label: 'Professional Blue' },
    { value: 'retro-gamer', label: 'Retro Gamer' },
    { value: 'brutalist-web', label: 'Brutalist Web' },
    { value: 'cyberpunk-neon', label: 'Cyberpunk Neon' },
    { value: 'elegant-serif', label: 'Elegant Serif' },
    { value: 'cosmic-dream', label: 'Cosmic Dream' },
    { value: 'hacker-terminal', label: 'Hacker Terminal' },
    { value: 'craftsman-paper', label: 'Craftsman Paper' },
    { value: 'photo-grid', label: 'Photo Grid' },
    { value: 'lakeside-dawn', label: 'Lakeside Dawn' },
];

export default function ThemeSelector({ selectedTheme, onThemeChange, projects }: ThemeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Theme</CardTitle>
        <CardDescription>Select a theme to change the look of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Current Theme</Label>
          <Select value={selectedTheme} onValueChange={(value: Theme) => onThemeChange(value)}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AiThemeAssistant projects={projects} onSelectTheme={onThemeChange} />
      </CardContent>
    </Card>
  );
}
