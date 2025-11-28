'use client';

import { Calendar, AlertCircle } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  dueDate: string;
  type: string;
  urgency: string;
}

interface DeadlinesListProps {
  deadlines: Deadline[];
}

export function DeadlinesList({ deadlines }: DeadlinesListProps) {
  if (!deadlines || deadlines.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="mx-auto h-12 w-12 mb-2 opacity-50" />
        <p>No upcoming deadlines</p>
        <p className="text-sm mt-2">You're all caught up!</p>
      </div>
    );
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'text-error bg-error/10';
      case 'high':
        return 'text-warning bg-warning/10';
      case 'medium':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {deadlines.map((deadline) => (
        <div key={deadline.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <div className={`p-2 rounded-full ${getUrgencyColor(deadline.urgency)}`}>
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-none mb-1">{deadline.title}</p>
            <p className="text-xs text-muted-foreground capitalize">{deadline.type}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium">{deadline.dueDate}</p>
            <p className={`text-xs capitalize ${getUrgencyColor(deadline.urgency)}`}>
              {deadline.urgency}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
