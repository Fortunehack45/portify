'use client';

import { Template, Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AiTemplateAssistant from './ai-template-assistant';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  projects: Project[];
}

const templateOptions: { value: Template; label: string }[] = [
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

export default function TemplateSelector({ selectedTemplate, onTemplateChange, projects }: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Template</CardTitle>
        <CardDescription>Select a template to change the look of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Current Template</Label>
          <Select value={selectedTemplate} onValueChange={(value: Template) => onTemplateChange(value)}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templateOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AiTemplateAssistant projects={projects} onSelectTemplate={onTemplateChange} />
      </CardContent>
    </Card>
  );
}
