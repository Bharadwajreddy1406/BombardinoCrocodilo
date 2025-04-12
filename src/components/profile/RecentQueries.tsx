import React from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronRight } from 'lucide-react';

interface Query {
  question: string;
  date: string;
}

interface RecentQueriesProps {
  queries: Query[];
}

export default function RecentQueries({ queries }: RecentQueriesProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Queries</h2>
        <Link 
          href="/profile/queries" 
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
        >
          View all queries
          <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="space-y-4">
        {queries.map((query, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 rounded-md hover:bg-accent/5 transition-colors"
          >
            <div className="bg-primary/10 text-primary p-2 rounded-md">
              <MessageSquare size={18} />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{query.question}</p>
              <p className="text-sm text-muted-foreground mt-1">{query.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}