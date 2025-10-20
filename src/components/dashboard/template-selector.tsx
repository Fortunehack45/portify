
'use client';

import { Template, Project, User } from '@/types';
import AiTemplateAssistant from './ai-template-assistant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  projects: Project[];
  user: User;
}

const templateOptions: { value: Template; label: string; }[] = [
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
    { value: 'geometric-dark', label: 'Geometric Dark' },
    { value: 'minimal-serif', label: 'Minimal Serif' },
    { value: 'corporate-clean', label: 'Corporate Clean' },
    { value: 'glassmorphism', label: 'Glassmorphism' },
    { value: 'neobrutalism', label: 'Neobrutalism' },
    { value: 'storybook', label: 'Storybook' },
    { value: 'two-column-image', label: 'Two Column Image' },
    { value: 'bold-and-blue', label: 'Bold and Blue' },
    { value: 'newspaper', label: 'Newspaper' },
    { value: 'dark-academia', label: 'Dark Academia' },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange, projects, user }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Choose a Template</h3>
        <p className="text-sm text-muted-foreground">Select a template to change the look of your portfolio.</p>
      </div>

      <Select value={selectedTemplate} onValueChange={(value) => onTemplateChange(value as Template)}>
        <SelectTrigger>
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

      <AiTemplateAssistant projects={projects} onSelectTemplate={onTemplateChange} />
    </div>
  );
}
