import React from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';

interface Appointment {
  title: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export default function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <Link 
          href="/profile/appointments" 
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
        >
          View all appointments
          <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div 
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-md border border-border"
          >
            <div className="bg-primary/10 text-primary p-3 rounded-md flex-shrink-0">
              <Calendar size={18} />
            </div>
            
            <div className="flex-grow">
              <p className="font-medium">{appointment.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {appointment.date} at {appointment.time}
              </p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mr-1" /> 
                {appointment.location}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-0">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}