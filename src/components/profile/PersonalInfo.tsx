import React from 'react';
import { Pencil } from 'lucide-react';

interface PersonalInfoProps {
  name: string;
  email: string;
  phone: string;
  language: string;
}

export default function PersonalInfo({ name, email, phone, language }: PersonalInfoProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <button className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80">
          <Pencil size={16} />
          Edit
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-muted-foreground">Full Name</h3>
          <p className="mt-1">{name}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-muted-foreground">Email</h3>
          <p className="mt-1">{email}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-muted-foreground">Phone Number</h3>
          <p className="mt-1">{phone}</p>
        </div>
        
        <div>
          <h3 className="text-sm text-muted-foreground">Preferred Language</h3>
          <p className="mt-1">{language}</p>
        </div>
      </div>
    </div>
  );
}