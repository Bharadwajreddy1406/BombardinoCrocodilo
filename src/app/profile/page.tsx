import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import PersonalInfo from '@/components/profile/PersonalInfo';
import RecentQueries from '@/components/profile/RecentQueries';
import UpcomingAppointments from '@/components/profile/UpcomingAppointments';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header with user info and profile completeness */}
      <ProfileHeader 
        name="Priya Sharma"
        email="priya.sharma@example.com"
        completeness={100}
      />
      
      {/* Navigation tabs */}
      <ProfileNavigation />
      
      {/* Main content area */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Personal information */}
        <div className="col-span-1 md:col-span-1">
          <PersonalInfo 
            name="Priya Sharma"
            email="priya.sharma@example.com"
            phone="+91 98765 43210"
            language="English"
          />
        </div>
        
        {/* Right column - Recent queries and upcoming appointments */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <RecentQueries 
            queries={[
              { question: "What are my rights as a tenant?", date: "15/6/2023" },
              { question: "How do I file a consumer complaint?", date: "10/6/2023" }
            ]}
          />
          
          <UpcomingAppointments 
            appointments={[
              { 
                title: "Legal Aid Consultation", 
                date: "20/6/2023", 
                time: "10:00 AM",
                status: "upcoming", 
                location: "Delhi Legal Services Authority"
              },
              { 
                title: "Legal Workshop", 
                date: "25/6/2023", 
                time: "11:00 AM",
                status: "upcoming", 
                location: "Community Center"
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}