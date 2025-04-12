import React from 'react';
import { User } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
  completeness: number;
}

export default function ProfileHeader({ name, email, completeness }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-border">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 w-full md:w-64">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Profile Completeness</span>
          <span className="text-sm font-medium">{completeness}%</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}