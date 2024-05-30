'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import DashboardPage from '../(dashboard)/dashboardPage';
 

const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  // If there's no currentUser, redirect to the login page
  if (!currentUser) {
    router.push('/login');
    return null; // Return null to prevent rendering anything before redirection
  }

  // Render DashboardPage if currentUser exists
  return <DashboardPage />;
}

export default Dashboard;
