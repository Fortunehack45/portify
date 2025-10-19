'use client';

import { Template, Project } from '@/types';
import AiTemplateAssistant from './ai-template-assistant';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  projects: Project[];
}

const templateOptions: { value: Template; label: string; imageId: string }[] = [
    { value: 'minimal-light', label: 'Minimal Light', imageId: 'template-minimal-light' },
    { value: 'modern-dark', label: 'Modern Dark', imageId: 'template-modern-dark' },
    { value: 'professional-blue', label: 'Professional Blue', imageId: 'template-professional-blue' },
    { value: 'retro-gamer', label: 'Retro Gamer', imageId: 'template-retro-gamer' },
    { value: 'brutalist-web', label: 'Brutalist Web', imageId: 'template-brutalist-web' },
    { value: 'cyberpunk-neon', label: 'Cyberpunk Neon', imageId: 'template-cyberpunk-neon' },
    { value: 'elegant-serif', label: 'Elegant Serif', imageId: 'template-elegant-serif' },
    { value: 'cosmic-dream', label: 'Cosmic Dream', imageId: 'template-cosmic-dream' },
    { value: 'hacker-terminal', label: 'Hacker Terminal', imageId: 'template-hacker-terminal' },
    { value: 'craftsman-paper', label: 'Craftsman Paper', imageId: 'template-craftsman-paper' },
    { value: 'photo-grid', label: 'Photo Grid', imageId: 'template-photo-grid' },
    { value: 'lakeside-dawn', label: 'Lakeside Dawn', imageId: 'template-lakeside-dawn' },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange, projects }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Choose a Template</h3>
        <p className="text-sm text-muted-foreground">Select a template to change the look of your portfolio.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templateOptions.map(option => {
          const image = placeholderImages.find(img => img.id === option.imageId);
          return (
            <button
              key={option.value}
              className={cn(
                "relative block rounded-lg border-2 bg-card overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                selectedTemplate === option.value ? "border-primary" : "border-transparent"
              )}
              onClick={() => onTemplateChange(option.value)}
            >
              {selectedTemplate === option.value && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
              {image && (
                 <Image
                    src={image.imageUrl}
                    alt={`Preview of ${option.label} template`}
                    width={200}
                    height={250}
                    className="w-full h-auto object-cover transition-transform hover:scale-105"
                  />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                  <p className="text-white text-xs font-semibold truncate text-center">{option.label}</p>
              </div>
            </button>
          )
        })}
      </div>

      <AiTemplateAssistant projects={projects} onSelectTemplate={onTemplateChange} />
    </div>
  );
}
