'use client';

import { User, Social, SocialPlatform } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '../ui/badge';
import { X, Github, Linkedin, Twitter, Link as LinkIcon, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProfileFormProps {
  user: User;
  onUserChange: (updatedUser: Partial<User>) => void;
}

const socialIcons: Record<SocialPlatform, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: LinkIcon,
};

const socialOptions: {value: SocialPlatform, label: string}[] = [
    { value: 'github', label: 'GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'website', label: 'Website' },
]

export default function ProfileForm({ user, onUserChange }: ProfileFormProps) {
  const [skillInput, setSkillInput] = useState('');
  const [newSocialPlatform, setNewSocialPlatform] = useState<SocialPlatform | ''>('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      if (!user.skills.includes(skillInput.trim())) {
        onUserChange({ skills: [...user.skills, skillInput.trim()] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUserChange({ skills: user.skills.filter(skill => skill !== skillToRemove) });
  };
  
  const handleAddSocial = () => {
    if (newSocialPlatform && newSocialUrl.trim() !== '') {
        const existingSocial = user.socials?.find(s => s.platform === newSocialPlatform);
        if (existingSocial) {
            // Update existing social link
            const updatedSocials = user.socials.map(s => 
                s.platform === newSocialPlatform ? { ...s, url: newSocialUrl } : s
            );
            onUserChange({ socials: updatedSocials });
        } else {
            // Add new social link
             const newSocial: Social = { platform: newSocialPlatform, url: newSocialUrl };
             onUserChange({ socials: [...(user.socials || []), newSocial] });
        }
        setNewSocialPlatform('');
        setNewSocialUrl('');
    }
  }

  const handleRemoveSocial = (platform: SocialPlatform) => {
    onUserChange({ socials: user.socials?.filter(s => s.platform !== platform) });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profile</CardTitle>
        <CardDescription>This information will be displayed on your public portfolio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={user.name} onChange={(e) => onUserChange({ name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={user.username} onChange={(e) => onUserChange({ username: e.target.value })} />
            </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={user.bio} onChange={(e) => onUserChange({ bio: e.target.value })} placeholder="Tell us a little bit about yourself" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input 
            id="skills" 
            placeholder="Add a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
          <div className="flex flex-wrap gap-2 mt-2 min-h-[2.25rem]">
            {user.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 text-sm">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1 p-0.5 rounded-full hover:bg-muted-foreground/20">
                  <X className="h-3 w-3"/>
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4">
            <div>
              <Label>Social Links</Label>
              <p className="text-sm text-muted-foreground">Add links to your social profiles.</p>
            </div>
            <div className="space-y-3">
                {user.socials?.map((social) => {
                    const Icon = socialIcons[social.platform];
                    return (
                        <div key={social.platform} className="flex items-center gap-2">
                           <Icon className="h-5 w-5 text-muted-foreground" />
                           <Input 
                             value={social.url}
                             onChange={(e) => {
                                const updatedSocials = user.socials.map(s => 
                                    s.platform === social.platform ? { ...s, url: e.target.value } : s
                                );
                                onUserChange({ socials: updatedSocials });
                             }}
                             className="flex-1"
                           />
                           <Button variant="ghost" size="icon" onClick={() => handleRemoveSocial(social.platform)}>
                                <X className="h-4 w-4" />
                           </Button>
                        </div>
                    )
                })}
            </div>
             <div className="flex items-center gap-2 pt-2">
                <div className="grid grid-cols-2 gap-2 flex-1">
                    <Select value={newSocialPlatform} onValueChange={(v) => setNewSocialPlatform(v as SocialPlatform)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                            {socialOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value} disabled={user.socials?.some(s => s.platform === opt.value)}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input 
                        placeholder="URL"
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                    />
                </div>
                 <Button onClick={handleAddSocial} disabled={!newSocialPlatform || !newSocialUrl}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}