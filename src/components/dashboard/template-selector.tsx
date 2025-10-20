
'use client';

import { Template, Project, User } from '@/types';
import AiTemplateAssistant from './ai-template-assistant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  projects: Project[];
  user: User;
  display?: 'grid' | 'select';
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

const TemplateGrid = ({ selectedTemplate, onTemplateChange }: Pick<TemplateSelectorProps, 'selectedTemplate' | 'onTemplateChange'>) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateOptions.map((template) => (
          <Card
            key={template.value}
            onClick={() => onTemplateChange(template.value)}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1',
              selectedTemplate === template.value && 'ring-2 ring-primary ring-offset-2'
            )}
          >
            <CardContent className="p-4 space-y-3">
              <div className="aspect-video w-full rounded-md bg-muted overflow-hidden border">
                <Image 
                    src={`/thumbnails/${template.value}.png`} 
                    alt={`${template.label} template screenshot`}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-center">{template.label}</p>
            </CardContent>
          </Card>
        ))}
    </div>
)

const TemplateDropdown = ({ selectedTemplate, onTemplateChange }: Pick<TemplateSelectorProps, 'selectedTemplate' | 'onTemplateChange'>) => (
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
)

export default function TemplateSelector({ selectedTemplate, onTemplateChange, projects, user, display = 'grid' }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
        {display === 'grid' ? (
            <TemplateGrid selectedTemplate={selectedTemplate} onTemplateChange={onTemplateChange} />
        ) : (
             <div className="space-y-2">
                <h3 className="text-lg font-semibold">Choose a Template</h3>
                <p className="text-sm text-muted-foreground">Select a template to change the look of your portfolio.</p>
                <TemplateDropdown selectedTemplate={selectedTemplate} onTemplateChange={onTemplateChange} />
            </div>
        )}
      
      <AiTemplateAssistant projects={projects} onSelectTemplate={onTemplateChange} />
    </div>
  );
}
