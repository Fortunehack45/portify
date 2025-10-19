'use client';

import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface ProfileFormProps {
  user: User;
  onUserChange: (updatedUser: Partial<User>) => void;
}

export default function ProfileForm({ user, onUserChange }: ProfileFormProps) {
  const [skillInput, setSkillInput] = useState('');

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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profile</CardTitle>
        <CardDescription>This information will be displayed on your public portfolio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Textarea id="bio" value={user.bio} onChange={(e) => onUserChange({ bio: e.target.value })} />
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
          <div className="flex flex-wrap gap-2 mt-2">
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
      </CardContent>
    </Card>
  );
}
