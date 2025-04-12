import React from 'react';

export default function ProfileNavigation() {
  const navigationItems = [
    { id: 'overview', name: 'Overview', active: true },
    { id: 'query-history', name: 'Query History', active: false },
    { id: 'saved-resources', name: 'Saved Resources', active: false },
    { id: 'appointments', name: 'Appointments', active: false },
    { id: 'settings', name: 'Settings', active: false },
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex flex-wrap -mb-px">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`inline-flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
              item.active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}